"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const redirectTo = searchParams.get("redirect") || "/vault";

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("Google Identity Services loaded");
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleGoogleSignIn = () => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      setError("Google OAuth is not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID.");
      return;
    }

    setGoogleLoading(true);
    setError("");

    if (window.google?.accounts?.oauth2) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "email profile",
        callback: async (response) => {
          try {
            // Get user info from Google
            const userInfoResponse = await fetch(
              `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`
            );
            const userInfo = await userInfoResponse.json();

            // Check if user exists in Strapi directly
            const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
            const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';
            
            // Build query string for email filter
            const queryParams = new URLSearchParams();
            queryParams.append('filters[email]', userInfo.email);
            queryParams.append('populate', '*');
            
            const checkUserResponse = await fetch(
              `${strapiUrl}/api/users?${queryParams.toString()}`,
              {
                headers: {
                  'Authorization': strapiToken ? `Bearer ${strapiToken}` : '',
                  'Content-Type': 'application/json',
                },
              }
            );

            if (!checkUserResponse.ok) {
              setError("Failed to verify user. Please try again.");
              setGoogleLoading(false);
              return;
            }

            const userData = await checkUserResponse.json();
            const users = userData?.data || userData || [];
            const userExists = Array.isArray(users) ? users.length > 0 : !!users;

            if (!userExists) {
              setError("Access denied. Only existing users can access this portal.");
              setGoogleLoading(false);
              return;
            }

            // Extract user data from Strapi response
            const strapiUser = Array.isArray(users) ? users[0] : users;
            const userAttributes = strapiUser.attributes || strapiUser;

            // Store session in localStorage (client-side)
            const sessionData = {
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
              googleId: userInfo.id,
              loggedInAt: new Date().toISOString(),
              isInternal: userAttributes.isInternal || false,
            };
            
            localStorage.setItem('vault_session', JSON.stringify(sessionData));
            
            // Also set a cookie for compatibility (client-side)
            document.cookie = `vault_session=${JSON.stringify(sessionData)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

            // Redirect to intended destination or vault
            router.push(redirectTo);
          } catch (err) {
            console.error("Error during Google sign in:", err);
            setError("An error occurred during sign in. Please try again.");
            setGoogleLoading(false);
          }
        },
      });

      client.requestAccessToken();
    } else {
      setError("Google Identity Services failed to load. Please refresh the page.");
      setGoogleLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Check if user exists in Strapi directly
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';
      
      // Build query string for email filter
      const queryParams = new URLSearchParams();
      queryParams.append('filters[email]', email);
      queryParams.append('populate', '*');
      
      const checkUserResponse = await fetch(
        `${strapiUrl}/api/users?${queryParams.toString()}`,
        {
          headers: {
            'Authorization': strapiToken ? `Bearer ${strapiToken}` : '',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!checkUserResponse.ok) {
        setError("Failed to verify user. Please try again.");
        setLoading(false);
        return;
      }

      const userData = await checkUserResponse.json();
      const users = userData?.data || userData || [];
      const userExists = Array.isArray(users) ? users.length > 0 : !!users;

      if (!userExists) {
        setError("Access denied. Only existing users can access this portal.");
        setLoading(false);
        return;
      }

      // For email, we'll need to implement email verification or password
      // For now, we'll just show an error that Google is required
      setError("Please use Google Sign-In to access this portal.");
      setLoading(false);
    } catch (err) {
      console.error("Error checking user:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Algebrik Vault</h1>
          </div>
          <p className="text-sm text-gray-600">Internal Asset Hub</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-sm text-gray-600">Sign in to access your sales assets</p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {googleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700 font-medium">Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Work Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                "Continue with Email"
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-sm text-red-600">{error}</p>
            </motion.div>
          )}

        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-500">
            Internal use only • Not for public distribution
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

