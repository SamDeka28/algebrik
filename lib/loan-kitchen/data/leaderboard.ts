export interface LeaderboardEntry {
  name: string;
  score: number;
  loans: number;
  health: number;
  brandEquity: number;
  date: string;
}

const STORAGE_KEY = 'algebrik_leaderboard';
const MAX_ENTRIES = 10;

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LeaderboardEntry[];
  } catch {
    return [];
  }
}

export function addLeaderboardEntry(
entry: Omit<LeaderboardEntry, 'date'>)
: LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  const existing = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  };
  const updated = [...existing, newEntry].
  sort((a, b) => b.score - a.score).
  slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function isHighScore(score: number): boolean {
  if (typeof window === 'undefined') return false;
  const board = getLeaderboard();
  if (board.length < MAX_ENTRIES) return true;
  return score > (board[board.length - 1]?.score ?? 0);
}
