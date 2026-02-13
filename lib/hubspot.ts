/**
 * HubSpot API utilities for fetching deal data
 * 
 * Set NEXT_PUBLIC_HUBSPOT_ACCESS_TOKEN in your .env.local file:
 * NEXT_PUBLIC_HUBSPOT_ACCESS_TOKEN=pat-na2-f4573b16-5109-4169-b830-e475574c1ab1
 * 
 * API Version Options:
 * - v3 (default): Modern API, no date/record limits, uses cursor-based pagination
 * - v1 (legacy): Simpler API, but limited to last 30 days or 10k most recent records
 */

const HUBSPOT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_HUBSPOT_ACCESS_TOKEN || 'pat-na2-f4573b16-5109-4169-b830-e475574c1ab1';
const USE_V1_API = process.env.NEXT_PUBLIC_HUBSPOT_USE_V1_API === 'true';

export interface HubSpotDeal {
  id: string;
  properties: {
    dealname?: string;
    dealstage?: string;
    hs_deal_amount?: string;
    closedate?: string;
    hubspot_owner_id?: string;
    [key: string]: any;
  };
}

export interface HubSpotDealsResponse {
  results: HubSpotDeal[];
  paging?: {
    next?: {
      after: string;
    };
  };
}

export interface HubSpotV1DealsResponse {
  deals: HubSpotDeal[];
  hasMore: boolean;
  offset?: number;
}

/**
 * Fetch all deals from HubSpot using v3 API (modern, no limits)
 */
async function fetchHubSpotDealsV3(accessToken: string): Promise<HubSpotDeal[]> {
  const allDeals: HubSpotDeal[] = [];
  let after: string | undefined;

  try {
    console.log('HubSpot v3: Starting to fetch deals...');
    do {
      const url = new URL('https://api.hubapi.com/crm/v3/objects/deals');
      url.searchParams.append('properties', 'dealname,dealstage,hs_deal_amount,closedate,hubspot_owner_id');
      url.searchParams.append('associations', 'companies,contacts');
      url.searchParams.append('limit', '100');
      if (after) {
        url.searchParams.append('after', after);
      }

      console.log(`HubSpot v3: Fetching page (after: ${after || 'none'})...`);
      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HubSpot v3 API error:', response.status, errorText);
        throw new Error(`HubSpot v3 API error: ${response.status}: ${errorText}`);
      }

      const data: HubSpotDealsResponse = await response.json();
      const dealsInPage = data.results || [];
      console.log(`HubSpot v3: Fetched ${dealsInPage.length} deals in this page`);
      allDeals.push(...dealsInPage);
      
      after = data.paging?.next?.after;
    } while (after);

    console.log(`HubSpot v3: Total deals fetched: ${allDeals.length}`);
    return allDeals;
  } catch (error) {
    console.error('Error fetching HubSpot deals (v3):', error);
    throw error;
  }
}

/**
 * Fetch all deals from HubSpot using v1 API (legacy, limited to last 30 days or 10k records)
 */
async function fetchHubSpotDealsV1(accessToken: string): Promise<HubSpotDeal[]> {
  const allDeals: HubSpotDeal[] = [];
  let offset: number | undefined;
  let hasMore = true;

  try {
    console.log('HubSpot v1: Starting to fetch deals (limited to last 30 days or 10k records)...');
    do {
      const url = new URL('https://api.hubapi.com/deals/v1/deal/paged');
      url.searchParams.append('properties', 'dealname');
      url.searchParams.append('properties', 'dealstage');
      url.searchParams.append('properties', 'amount');
      url.searchParams.append('properties', 'closedate');
      url.searchParams.append('properties', 'hubspot_owner_id');
      url.searchParams.append('includeAssociations', 'true');
      url.searchParams.append('limit', '250'); // Max limit for v1
      if (offset !== undefined) {
        url.searchParams.append('offset', offset.toString());
      }

      console.log(`HubSpot v1: Fetching page (offset: ${offset || 'none'})...`);
      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HubSpot v1 API error:', response.status, errorText);
        throw new Error(`HubSpot v1 API error: ${response.status}: ${errorText}`);
      }

      const data: HubSpotV1DealsResponse = await response.json();
      const dealsInPage = data.deals || [];
      console.log(`HubSpot v1: Fetched ${dealsInPage.length} deals in this page`);
      
      // Transform v1 format to match our interface
      const transformedDeals: HubSpotDeal[] = dealsInPage.map((deal: any) => ({
        id: deal.dealId || deal.objectId || String(deal.id),
        properties: {
          dealname: deal.properties?.dealname?.value || deal.properties?.dealname,
          dealstage: deal.properties?.dealstage?.value || deal.properties?.dealstage,
          hs_deal_amount: deal.properties?.amount?.value || deal.properties?.amount,
          closedate: deal.properties?.closedate?.value || deal.properties?.closedate,
          hubspot_owner_id: deal.properties?.hubspot_owner_id?.value || deal.properties?.hubspot_owner_id,
          // Include associations if available
          associations: deal.associations,
        },
      }));
      
      allDeals.push(...transformedDeals);
      hasMore = data.hasMore || false;
      offset = data.offset;
    } while (hasMore);

    console.log(`HubSpot v1: Total deals fetched: ${allDeals.length}`);
    return allDeals;
  } catch (error) {
    console.error('Error fetching HubSpot deals (v1):', error);
    throw error;
  }
}

/**
 * Fetch all deals from HubSpot with associations
 * Uses v3 by default (no limits), falls back to v1 if USE_V1_API is set
 */
export async function fetchHubSpotDeals(accessToken?: string): Promise<HubSpotDeal[]> {
  const token = accessToken || HUBSPOT_ACCESS_TOKEN;
  
  if (USE_V1_API) {
    return fetchHubSpotDealsV1(token);
  } else {
    return fetchHubSpotDealsV3(token);
  }
}

/**
 * Fetch company properties including state
 */
export async function fetchCompanyState(companyId: string, accessToken?: string): Promise<string> {
  const token = accessToken || HUBSPOT_ACCESS_TOKEN;
  
  try {
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/companies/${companyId}?properties=state,address`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const state = data.properties?.state || 
                   (data.properties?.address ? extractStateFromAddress(data.properties.address) : '');
      return normalizeStateCode(state);
    }
  } catch (error) {
    console.error(`Error fetching company ${companyId}:`, error);
  }
  
  return '';
}

/**
 * Fetch contact properties including state
 */
export async function fetchContactState(contactId: string, accessToken?: string): Promise<string> {
  const token = accessToken || HUBSPOT_ACCESS_TOKEN;
  
  try {
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}?properties=state,address`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const state = data.properties?.state || 
                   (data.properties?.address ? extractStateFromAddress(data.properties.address) : '');
      return normalizeStateCode(state);
    }
  } catch (error) {
    console.error(`Error fetching contact ${contactId}:`, error);
  }
  
  return '';
}

/**
 * Extract state from address string
 */
function extractStateFromAddress(address: string): string {
  if (!address) return '';
  // Try to extract state from address (usually last part before zip)
  const parts = address.split(',').map(p => p.trim());
  if (parts.length >= 2) {
    // State is usually second to last (before zip code)
    const statePart = parts[parts.length - 2];
    return statePart;
  }
  return '';
}

/**
 * Get state from deal associations (companies or contacts)
 * This function extracts state from the deal's associated records
 */
export async function getDealState(deal: HubSpotDeal, accessToken?: string): Promise<string> {
  const token = accessToken || HUBSPOT_ACCESS_TOKEN;
  
  try {
    // Check if deal has associations in the response
    const associations = (deal as any).associations;
    
    // Try companies first
    if (associations?.companies?.results && associations.companies.results.length > 0) {
      const companyId = associations.companies.results[0].id;
      const state = await fetchCompanyState(companyId, token);
      if (state) return state;
    }

    // Fallback to contacts
    if (associations?.contacts?.results && associations.contacts.results.length > 0) {
      const contactId = associations.contacts.results[0].id;
      const state = await fetchContactState(contactId, token);
      if (state) return state;
    }

    // If associations weren't in the response, fetch them
    const companiesResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/deals/${deal.id}/associations/companies?limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (companiesResponse.ok) {
      const companiesData = await companiesResponse.json();
      if (companiesData.results && companiesData.results.length > 0) {
        const companyId = companiesData.results[0].id;
        const state = await fetchCompanyState(companyId, token);
        if (state) return state;
      }
    }

    // Try contacts
    const contactsResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/deals/${deal.id}/associations/contacts?limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (contactsResponse.ok) {
      const contactsData = await contactsResponse.json();
      if (contactsData.results && contactsData.results.length > 0) {
        const contactId = contactsData.results[0].id;
        const state = await fetchContactState(contactId, token);
        if (state) return state;
      }
    }

    return '';
  } catch (error) {
    console.error(`Error getting state for deal ${deal.id}:`, error);
    return '';
  }
}

/**
 * Normalize state name or code to 2-letter state code
 */
function normalizeStateCode(state: string): string {
  if (!state) return '';
  
  const upperState = state.toUpperCase().trim();
  
  // If already a 2-letter code, return it
  if (upperState.length === 2 && /^[A-Z]{2}$/.test(upperState)) {
    return upperState;
  }

  // Map full state names to codes
  const stateMap: { [key: string]: string } = {
    'ALABAMA': 'AL', 'ALASKA': 'AK', 'ARIZONA': 'AZ', 'ARKANSAS': 'AR',
    'CALIFORNIA': 'CA', 'COLORADO': 'CO', 'CONNECTICUT': 'CT', 'DELAWARE': 'DE',
    'FLORIDA': 'FL', 'GEORGIA': 'GA', 'HAWAII': 'HI', 'IDAHO': 'ID',
    'ILLINOIS': 'IL', 'INDIANA': 'IN', 'IOWA': 'IA', 'KANSAS': 'KS',
    'KENTUCKY': 'KY', 'LOUISIANA': 'LA', 'MAINE': 'ME', 'MARYLAND': 'MD',
    'MASSACHUSETTS': 'MA', 'MICHIGAN': 'MI', 'MINNESOTA': 'MN', 'MISSISSIPPI': 'MS',
    'MISSOURI': 'MO', 'MONTANA': 'MT', 'NEBRASKA': 'NE', 'NEVADA': 'NV',
    'NEW HAMPSHIRE': 'NH', 'NEW JERSEY': 'NJ', 'NEW MEXICO': 'NM', 'NEW YORK': 'NY',
    'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND', 'OHIO': 'OH', 'OKLAHOMA': 'OK',
    'OREGON': 'OR', 'PENNSYLVANIA': 'PA', 'RHODE ISLAND': 'RI', 'SOUTH CAROLINA': 'SC',
    'SOUTH DAKOTA': 'SD', 'TENNESSEE': 'TN', 'TEXAS': 'TX', 'UTAH': 'UT',
    'VERMONT': 'VT', 'VIRGINIA': 'VA', 'WASHINGTON': 'WA', 'WEST VIRGINIA': 'WV',
    'WISCONSIN': 'WI', 'WYOMING': 'WY',
  };

  return stateMap[upperState] || '';
}

/**
 * Normalize HubSpot deal stage to our stage format
 */
export function normalizeDealStage(hubspotStage: string): string {
  if (!hubspotStage) return 'demo';
  
  const stage = hubspotStage.toLowerCase();
  
  // Map HubSpot stages to our stages
  if (stage.includes('demo') || stage.includes('discovery') || stage.includes('qualification')) {
    return 'demo';
  }
  if (stage.includes('proposal') || stage.includes('evaluation') || stage.includes('presentation')) {
    return 'proposal';
  }
  if (stage.includes('negotiation') || stage.includes('late') || stage.includes('decision')) {
    return 'late stage';
  }
  if (stage.includes('won') || stage.includes('closed-won')) {
    return 'closed won';
  }
  if (stage.includes('lost') || stage.includes('closed-lost')) {
    return 'closed lost';
  }
  
  return 'demo'; // Default
}
