/**
 * Authentication utilities
 */

import { cookies } from "next/headers";

export interface User {
  email: string;
  name: string;
  picture?: string | null;
  googleId?: string | null;
  loggedInAt: string;
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("vault_session");

    if (!sessionCookie) {
      return null;
    }

    const sessionData = JSON.parse(sessionCookie.value) as User;
    return sessionData;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getSession();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

