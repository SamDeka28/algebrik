/**
 * Client-side authentication utilities
 * For use with static export (output: export)
 */

export interface User {
  email: string;
  name: string;
  picture?: string | null;
  googleId?: string | null;
  loggedInAt: string;
  isInternal?: boolean;
}

export function getSession(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    // Try localStorage first
    const sessionStr = localStorage.getItem('vault_session');
    if (sessionStr) {
      return JSON.parse(sessionStr) as User;
    }

    // Fallback to cookie
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(cookie => 
      cookie.trim().startsWith('vault_session=')
    );
    
    if (sessionCookie) {
      const value = sessionCookie.split('=').slice(1).join('=');
      return JSON.parse(decodeURIComponent(value)) as User;
    }

    return null;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export function setSession(user: User): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Store in localStorage
  localStorage.setItem('vault_session', JSON.stringify(user));
  
  // Also set cookie for compatibility
  const expires = new Date();
  expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
  document.cookie = `vault_session=${JSON.stringify(user)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

export function clearSession(): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Clear localStorage
  localStorage.removeItem('vault_session');
  
  // Clear cookie
  document.cookie = 'vault_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

