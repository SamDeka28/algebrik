import { CITY_COORDS, STATE_CENTROIDS } from './cities';

export function getCoordinates(city: string, state: string): [number, number] {
  const normalizedCity = city.toUpperCase().trim();
  const normalizedState = state.toUpperCase().trim();

  // Direct lookup
  const key = `${normalizedCity}|${normalizedState}`;
  if (CITY_COORDS[key]) return CITY_COORDS[key];

  // Strip common suffixes and retry (e.g. "ST." → "SAINT", "FT." → "FORT")
  const aliases: Record<string, string> = {
    'ST.': 'SAINT', 'FT.': 'FORT', 'MT.': 'MOUNT',
    'N.': 'NORTH', 'S.': 'SOUTH', 'E.': 'EAST', 'W.': 'WEST',
  };
  let adjusted = normalizedCity;
  for (const [abbr, full] of Object.entries(aliases)) {
    if (adjusted.startsWith(abbr + ' ')) {
      adjusted = full + ' ' + adjusted.slice(abbr.length + 1);
      const altKey = `${adjusted}|${normalizedState}`;
      if (CITY_COORDS[altKey]) return CITY_COORDS[altKey];
    }
  }

  // Partial match: find city that starts with the same prefix
  for (const [k, coords] of Object.entries(CITY_COORDS)) {
    const [kCity, kState] = k.split('|');
    if (kState === normalizedState && kCity.startsWith(normalizedCity.slice(0, 5))) {
      return coords;
    }
  }

  // Fallback: state centroid with small jitter to avoid exact overlaps
  const centroid = STATE_CENTROIDS[normalizedState];
  if (centroid) {
    const jitter = () => (Math.random() - 0.5) * 2;
    return [centroid[0] + jitter(), centroid[1] + jitter()];
  }

  return [39.5, -98.35]; // US geographic center
}
