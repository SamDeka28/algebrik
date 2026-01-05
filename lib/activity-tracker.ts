/**
 * Team-wide activity tracking for vault assets
 * Stores activities in Strapi for team-wide visibility
 */

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: 'downloaded' | 'viewed' | 'opened';
  assetTitle: string;
  assetId: number;
  timestamp: string;
}

const ACTIVITY_KEY = 'vault_activities';
const MAX_ACTIVITIES = 50; // Keep last 50 activities in localStorage as fallback

/**
 * Track activity and store in Strapi (team-wide)
 */
export async function trackActivity(
  userId: string,
  userName: string,
  userEmail: string,
  action: 'downloaded' | 'viewed' | 'opened',
  assetTitle: string,
  assetId: number
): Promise<void> {
  if (typeof window === 'undefined') return;

  const activity = {
    userId,
    userName,
    userEmail,
    action,
    assetTitle,
    assetId,
    timestamp: new Date().toISOString(),
  };

  // Store in Strapi for team-wide visibility
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';

    const response = await fetch(`${strapiUrl}/api/vault-activities`, {
      method: 'POST',
      headers: {
        'Authorization': strapiToken ? `Bearer ${strapiToken}` : '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: activity,
      }),
    });

    if (!response.ok) {
      console.error('Failed to save activity to Strapi:', await response.text());
      // Fallback to localStorage if Strapi fails
      saveActivityToLocalStorage(activity);
    }
  } catch (error) {
    console.error('Error tracking activity in Strapi:', error);
    // Fallback to localStorage if Strapi fails
    saveActivityToLocalStorage(activity);
  }
}

/**
 * Fallback: Save activity to localStorage
 */
function saveActivityToLocalStorage(activity: Activity): void {
  try {
    const activities: Activity[] = getActivitiesFromLocalStorage();
    activities.unshift({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...activity,
    });
    const trimmedActivities = activities.slice(0, MAX_ACTIVITIES);
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(trimmedActivities));
  } catch (error) {
    console.error('Error saving activity to localStorage:', error);
  }
}

/**
 * Get activities from localStorage (fallback)
 */
function getActivitiesFromLocalStorage(): Activity[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(ACTIVITY_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as Activity[];
  } catch (error) {
    console.error('Error reading activities from localStorage:', error);
    return [];
  }
}

/**
 * Fetch activities from Strapi (team-wide)
 */
export async function fetchActivities(limit: number = 20): Promise<Activity[]> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';

    const queryParams = new URLSearchParams({
      'sort[0]': 'timestamp:desc',
      'pagination[limit]': limit.toString(),
      'populate': '*',
    });

    const response = await fetch(
      `${strapiUrl}/api/vault-activities?${queryParams.toString()}`,
      {
        headers: {
          'Authorization': strapiToken ? `Bearer ${strapiToken}` : '',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch activities from Strapi:', await response.text());
      // Fallback to localStorage
      return getActivitiesFromLocalStorage().slice(0, limit);
    }

    const data = await response.json();
    const items = data?.data || [];

    // Transform Strapi data to Activity format
    return items.map((item: any) => {
      const attributes = item.attributes || item;
      return {
        id: item.id?.toString() || item.documentId?.toString() || '',
        userId: attributes.userId || '',
        userName: attributes.userName || '',
        userEmail: attributes.userEmail || '',
        action: attributes.action || 'downloaded',
        assetTitle: attributes.assetTitle || '',
        assetId: attributes.assetId || 0,
        timestamp: attributes.timestamp || attributes.createdAt || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Error fetching activities from Strapi:', error);
    // Fallback to localStorage
    return getActivitiesFromLocalStorage().slice(0, limit);
  }
}

/**
 * Format timestamp to relative time
 */
export function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
}
