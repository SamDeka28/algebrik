import type { RawNCUARecord } from '@/types/signal-radar';
import path from 'path';
import fs from 'fs';

const CACHE_FILE = path.join(process.cwd(), '.ncua-cache', 'data.json');
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// NCUA publishes call report financial data in FOICU.txt inside their ZIP files.
// The "call-report-data-YYYY-MM.zip" URLs contain branch/site data (not financials).
// The actual financial data is in different ZIP patterns. Try all known working formats.
function getNCUAUrls(): string[] {
  // These are the formats that contain FOICU.txt with ACCT_010 financial data
  const financialUrls = [
    // FFIEC / NCUA financial performance report format
    'https://ncua.gov/files/publications/analysis/call-report-data-financial-2024-12.zip',
    'https://ncua.gov/files/publications/analysis/call-report-data-financial-2024-09.zip',
    // Quarterly financial data direct format
    'https://ncua.gov/files/publications/analysis/financial-performance-data-2024-12.zip',
    'https://ncua.gov/files/publications/analysis/financial-performance-data-2024-09.zip',
    // Original call report format (contains site data but also FOICU.txt in some quarters)
    'https://ncua.gov/files/publications/analysis/call-report-data-2024-12.zip',
    'https://ncua.gov/files/publications/analysis/call-report-data-2024-09.zip',
    'https://ncua.gov/files/publications/analysis/call-report-data-2025-03.zip',
  ];
  return financialUrls;
}

async function downloadAndParse(): Promise<RawNCUARecord[]> {
  const JSZip = (await import('jszip')).default;
  const Papa = await import('papaparse');
  const urls = getNCUAUrls();

  for (const url of urls) {
    try {
      console.log(`[NCUA] Trying ${url}...`);
      const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
      if (!res.ok) continue;

      const arrayBuffer = await res.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      // Log all files in ZIP for debugging
      const fileNames = Object.keys(zip.files);
      console.log(`[NCUA] ZIP contains: ${fileNames.join(', ')}`);

      // Priority 1: Find the file that contains ACCT_010 (total assets = call report data)
      // The ZIP can contain multiple CSVs — branch directory, member data, financials.
      // We need the one with financial fields (FOICU.txt or similar).
      let csvContent = '';
      let fallbackContent = '';
      let fallbackSize = 0;

      for (const [name, file] of Object.entries(zip.files)) {
        const lname = name.toLowerCase();
        if (!lname.endsWith('.txt') && !lname.endsWith('.csv')) continue;

        const content = await file.async('string');
        const firstLine = content.slice(0, 500).toUpperCase();

        // Check if this file has financial/call-report headers
        if (firstLine.includes('ACCT_010') || firstLine.includes('ACCT010') ||
            firstLine.includes('CU_NUMBER') && firstLine.includes('TOTAL_ASSETS')) {
          console.log(`[NCUA] Found financial data file: ${name}`);
          csvContent = content;
          break;
        }

        // Also check if it matches known NCUA call report filenames
        if (lname.includes('foicu') || lname.includes('call_report') ||
            lname.includes('callreport') || lname.includes('fs220')) {
          console.log(`[NCUA] Found call report file by name: ${name}`);
          csvContent = content;
          break;
        }

        // Keep track of largest file as last-resort fallback
        if (content.length > fallbackSize) {
          fallbackSize = content.length;
          fallbackContent = content;
        }
      }

      // Last resort: use the largest file
      if (!csvContent) {
        console.warn('[NCUA] Could not identify financial data file by headers — using largest file');
        csvContent = fallbackContent;
      }

      if (!csvContent) continue;

      const result = Papa.default.parse<RawNCUARecord>(csvContent, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim().toUpperCase(),
      });

      // Validate this is actually call report data (must have assets field)
      const firstRecord = result.data[0] as Record<string, string> | undefined;
      const hasFinancials = firstRecord && (
        'ACCT_010' in firstRecord || 'ACCT010' in firstRecord || 'TOTAL_ASSETS' in firstRecord
      );

      if (!hasFinancials) {
        console.warn(`[NCUA] Parsed file does not contain financial data (ACCT_010 missing). Fields: ${Object.keys(firstRecord ?? {}).slice(0, 10).join(', ')}`);
        console.warn('[NCUA] This URL may contain branch/location data, not call reports. Trying next URL...');
        continue;
      }

      if (result.data.length > 100) {
        console.log(`[NCUA] Parsed ${result.data.length} records from ${url}`);
        return result.data;
      }
    } catch (e) {
      console.warn(`[NCUA] Failed to fetch ${url}:`, (e as Error).message);
    }
  }

  throw new Error('All NCUA download attempts failed');
}

export type DataSource = 'ncua_live' | 'ncua_cache' | 'ncua_custom' | 'sample';

const CUSTOM_NCUA_FILE = path.join(process.cwd(), '.custom-data', 'ncua-custom.json');

function isValidCache(records: RawNCUARecord[]): boolean {
  if (!Array.isArray(records) || records.length < 100) return false;
  // Must have financial data — ACCT_010 is total assets
  const first = records[0] as Record<string, string | undefined>;
  return 'ACCT_010' in first || 'ACCT010' in first;
}

export async function loadNCUAData(): Promise<{ records: RawNCUARecord[]; source: DataSource }> {
  // Check for user-uploaded custom NCUA data first (highest priority)
  try {
    if (fs.existsSync(CUSTOM_NCUA_FILE)) {
      const custom = JSON.parse(fs.readFileSync(CUSTOM_NCUA_FILE, 'utf8')) as RawNCUARecord[];
      if (isValidCache(custom)) {
        console.log(`[NCUA] Using custom uploaded data: ${custom.length} records`);
        return { records: custom, source: 'ncua_custom' };
      }
    }
  } catch { /* ignore */ }

  // Check cache — validate it actually has financial data
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const stat = fs.statSync(CACHE_FILE);
      if (Date.now() - stat.mtimeMs < CACHE_TTL_MS) {
        const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) as RawNCUARecord[];
        if (isValidCache(cached)) {
          console.log(`[NCUA] Loaded ${cached.length} validated records from cache`);
          return { records: cached, source: 'ncua_cache' };
        }
        console.warn('[NCUA] Cache exists but has no financial data (ACCT_010 missing) — deleting');
        try { fs.unlinkSync(CACHE_FILE); } catch { /* ignore */ }
      }
    }
  } catch { /* ignore cache errors */ }

  // Try live download with a global timeout so we don't wait forever
  try {
    const records = await Promise.race([
      downloadAndParse(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('NCUA download total timeout (60s)')), 60_000)
      ),
    ]);
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(records));
    return { records, source: 'ncua_live' };
  } catch (e) {
    console.warn('[NCUA] Live download failed, using generated sample data:', (e as Error).message);
    return { records: generateSampleData(), source: 'sample' };
  }
}

// ─── Sample Data Generator ──────────────────────────────────────────────────

const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
];

const STATE_CITIES: Record<string, string[]> = {
  AL:['BIRMINGHAM','MONTGOMERY','HUNTSVILLE','MOBILE','TUSCALOOSA'],
  AK:['ANCHORAGE','FAIRBANKS','JUNEAU'],
  AZ:['PHOENIX','TUCSON','MESA','CHANDLER','SCOTTSDALE','GLENDALE','TEMPE'],
  AR:['LITTLE ROCK','FORT SMITH','FAYETTEVILLE','SPRINGDALE','JONESBORO'],
  CA:['LOS ANGELES','SAN DIEGO','SAN JOSE','SAN FRANCISCO','FRESNO','SACRAMENTO','LONG BEACH','OAKLAND','BAKERSFIELD','ANAHEIM','RIVERSIDE','STOCKTON','IRVINE'],
  CO:['DENVER','COLORADO SPRINGS','AURORA','FORT COLLINS','LAKEWOOD','THORNTON','PUEBLO','BOULDER'],
  CT:['BRIDGEPORT','NEW HAVEN','STAMFORD','HARTFORD','WATERBURY','NORWALK'],
  DE:['WILMINGTON','DOVER','NEWARK'],
  FL:['JACKSONVILLE','MIAMI','TAMPA','ORLANDO','ST. PETERSBURG','HIALEAH','TALLAHASSEE','FORT LAUDERDALE','CAPE CORAL','CLEARWATER','DAYTONA BEACH','OCALA','PENSACOLA'],
  GA:['ATLANTA','COLUMBUS','AUGUSTA','SAVANNAH','ATHENS','SANDY SPRINGS','ROSWELL','MACON'],
  HI:['HONOLULU','HILO','KAILUA'],
  ID:['BOISE','MERIDIAN','NAMPA','POCATELLO','IDAHO FALLS'],
  IL:['CHICAGO','AURORA','ROCKFORD','JOLIET','NAPERVILLE','SPRINGFIELD','PEORIA','ELGIN','WAUKEGAN','CHAMPAIGN'],
  IN:['INDIANAPOLIS','FORT WAYNE','EVANSVILLE','SOUTH BEND','CARMEL','BLOOMINGTON','HAMMOND'],
  IA:['DES MOINES','CEDAR RAPIDS','DAVENPORT','SIOUX CITY','IOWA CITY','WATERLOO'],
  KS:['WICHITA','OVERLAND PARK','KANSAS CITY','TOPEKA','OLATHE','LAWRENCE'],
  KY:['LOUISVILLE','LEXINGTON','BOWLING GREEN','OWENSBORO','COVINGTON','RICHMOND'],
  LA:['NEW ORLEANS','BATON ROUGE','SHREVEPORT','METAIRIE','LAFAYETTE','LAKE CHARLES'],
  ME:['PORTLAND','LEWISTON','BANGOR','SOUTH PORTLAND'],
  MD:['BALTIMORE','COLUMBIA','GERMANTOWN','SILVER SPRING','ANNAPOLIS','ROCKVILLE','FREDERICK'],
  MA:['BOSTON','WORCESTER','SPRINGFIELD','LOWELL','CAMBRIDGE','NEW BEDFORD','BROCKTON','QUINCY'],
  MI:['DETROIT','GRAND RAPIDS','WARREN','STERLING HEIGHTS','ANN ARBOR','LANSING','FLINT','DEARBORN'],
  MN:['MINNEAPOLIS','SAINT PAUL','ROCHESTER','BLOOMINGTON','DULUTH','BROOKLYN PARK'],
  MS:['JACKSON','GULFPORT','SOUTHAVEN','HATTIESBURG','BILOXI'],
  MO:['KANSAS CITY','ST. LOUIS','SPRINGFIELD','COLUMBIA','INDEPENDENCE','JOPLIN','JEFFERSON CITY'],
  MT:['BILLINGS','MISSOULA','GREAT FALLS','BOZEMAN','HELENA'],
  NE:['OMAHA','LINCOLN','BELLEVUE','GRAND ISLAND','KEARNEY'],
  NV:['LAS VEGAS','HENDERSON','RENO','NORTH LAS VEGAS','SPARKS','CARSON CITY'],
  NH:['MANCHESTER','NASHUA','CONCORD','DOVER','ROCHESTER'],
  NJ:['NEWARK','JERSEY CITY','PATERSON','ELIZABETH','EDISON','TRENTON','CLIFTON','CAMDEN'],
  NM:['ALBUQUERQUE','LAS CRUCES','RIO RANCHO','SANTA FE','ROSWELL'],
  NY:['NEW YORK','BUFFALO','ROCHESTER','YONKERS','SYRACUSE','ALBANY','BROOKLYN','BRONX','QUEENS'],
  NC:['CHARLOTTE','RALEIGH','GREENSBORO','DURHAM','WINSTON-SALEM','FAYETTEVILLE','CARY','WILMINGTON','ASHEVILLE'],
  ND:['FARGO','BISMARCK','GRAND FORKS','MINOT'],
  OH:['COLUMBUS','CLEVELAND','CINCINNATI','TOLEDO','AKRON','DAYTON','PARMA','CANTON','YOUNGSTOWN'],
  OK:['OKLAHOMA CITY','TULSA','NORMAN','BROKEN ARROW','LAWTON','EDMOND'],
  OR:['PORTLAND','EUGENE','SALEM','GRESHAM','HILLSBORO','BEAVERTON','BEND'],
  PA:['PHILADELPHIA','PITTSBURGH','ALLENTOWN','ERIE','READING','SCRANTON','BETHLEHEM','LANCASTER','HARRISBURG'],
  RI:['PROVIDENCE','CRANSTON','WARWICK','PAWTUCKET'],
  SC:['COLUMBIA','CHARLESTON','NORTH CHARLESTON','MOUNT PLEASANT','ROCK HILL','GREENVILLE'],
  SD:['SIOUX FALLS','RAPID CITY','ABERDEEN'],
  TN:['NASHVILLE','MEMPHIS','KNOXVILLE','CHATTANOOGA','CLARKSVILLE','MURFREESBORO','FRANKLIN'],
  TX:['HOUSTON','SAN ANTONIO','DALLAS','AUSTIN','FORT WORTH','EL PASO','ARLINGTON','CORPUS CHRISTI','PLANO','LUBBOCK','AMARILLO','WACO','DENTON','ABILENE','TYLER','WICHITA FALLS'],
  UT:['SALT LAKE CITY','WEST VALLEY CITY','PROVO','WEST JORDAN','OREM','SANDY','OGDEN','ST. GEORGE'],
  VT:['BURLINGTON','SOUTH BURLINGTON','RUTLAND','MONTPELIER'],
  VA:['VIRGINIA BEACH','NORFOLK','CHESAPEAKE','RICHMOND','NEWPORT NEWS','ALEXANDRIA','HAMPTON','ROANOKE','LYNCHBURG'],
  WA:['SEATTLE','SPOKANE','TACOMA','VANCOUVER','BELLEVUE','KENT','EVERETT','RENTON','FEDERAL WAY'],
  WV:['CHARLESTON','HUNTINGTON','PARKERSBURG','MORGANTOWN','WHEELING'],
  WI:['MILWAUKEE','MADISON','GREEN BAY','KENOSHA','RACINE','APPLETON','WAUKESHA','EAU CLAIRE'],
  WY:['CHEYENNE','CASPER','LARAMIE','GILLETTE'],
  DC:['WASHINGTON'],
};

const CU_NAME_PREFIXES = [
  'Horizon','Summit','Pioneer','Heritage','Community','Patriot','Unity','Alliance',
  'Landmark','Keystone','Pinnacle','Cornerstone','First Choice','American','National',
  'Central','Midwest','Pacific','Atlantic','Gulf Coast','Mountain','Valley','River',
  'Bay Area','Coastal','Prairie','Heartland','Blue Ridge','Silver State','Lone Star',
  'Sunshine','Empire','Cardinal','Liberty','Freedom','Eagle','Beacon','Charter',
  'Citizens','People\'s','University','Teachers','Municipal','Healthcare','Educators',
  'Firefighters','Police','Teamsters','Boeing','General Electric','State Employees',
];

const CU_NAME_SUFFIXES = [
  'Federal Credit Union','Credit Union','FCU','Community Credit Union',
  'Federal Employees Credit Union','Employees Credit Union','Members Credit Union',
];

function rand(min: number, max: number) { return Math.random() * (max - min) + min; }
function randInt(min: number, max: number) { return Math.floor(rand(min, max + 1)); }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function generateAssets(): number {
  const tier = Math.random();
  if (tier < 0.35) return randInt(5_000_000, 50_000_000);
  if (tier < 0.60) return randInt(50_000_000, 200_000_000);
  if (tier < 0.78) return randInt(200_000_000, 750_000_000);
  if (tier < 0.90) return randInt(750_000_000, 3_000_000_000);
  if (tier < 0.97) return randInt(3_000_000_000, 15_000_000_000);
  return randInt(15_000_000_000, 180_000_000_000);
}

export function generateSampleData(): RawNCUARecord[] {
  const records: RawNCUARecord[] = [];
  let charterNum = 1000;

  const cuPerState = Math.ceil(4800 / STATES.length);

  for (const state of STATES) {
    const cities = STATE_CITIES[state] || ['UNKNOWN'];
    const count = state === 'CA' ? cuPerState * 3 : state === 'TX' ? cuPerState * 2 :
                  state === 'NY' || state === 'FL' || state === 'IL' ? Math.round(cuPerState * 1.5) :
                  ['AK','HI','ND','SD','VT','WY','DE'].includes(state) ? Math.max(3, Math.floor(cuPerState * 0.4)) :
                  cuPerState;

    for (let i = 0; i < count; i++) {
      const assets = generateAssets();
      const growthRate = rand(-0.05, 0.25);
      const memberGrowth = rand(-0.03, 0.18);
      const loanRatio = rand(0.35, 1.05);

      const assets_prev = Math.max(1_000_000, assets / (1 + growthRate));
      const members = Math.round(assets / rand(1500, 12000));
      const members_prev = Math.max(100, Math.round(members / (1 + memberGrowth)));
      const shares = Math.round(assets * rand(0.70, 0.90));
      const loans = Math.round(shares * loanRatio);
      const loans_prev = Math.round(loans * rand(0.88, 1.12));
      const chartered = randInt(1935, 2015);

      const prefix = pick(CU_NAME_PREFIXES);
      const suffix = pick(CU_NAME_SUFFIXES);
      const city = pick(cities);

      // Operating expenses: typically 2.5–6% of assets (higher for smaller CUs)
      const opexRatio = rand(0.025, 0.065);
      const operating_expenses = Math.round(assets * opexRatio);

      // Delinquency: 0.3–4% of loans (0 if no loans)
      const delinqRate = loans > 0 ? rand(0.003, 0.04) : 0;
      const delinquent_loans = Math.round(loans * delinqRate);

      records.push({
        CU_NUMBER: String(charterNum++),
        CU_NAME: `${prefix} ${suffix}`,
        CITY: city,
        STATE_CODE: state,
        CYCLE_DATE: '12/31/2024',
        ACCT_010: String(assets),
        ACCT_083: String(members),
        ACCT_025A: String(loans),
        ACCT_018: String(shares),
        ACCT_010_PREV: String(Math.round(assets_prev)),
        ACCT_083_PREV: String(members_prev),
        ACCT_025A_PREV: String(loans_prev),
        ACCT_031: String(operating_expenses),
        ACCT_748: String(delinquent_loans),
        JOIN_DATE: `01/01/${chartered}`,
      });
    }
  }

  return records;
}
