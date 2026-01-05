# Algebrik Vault - Login Setup Guide

This guide explains how to set up the login system with Google OAuth for the Algebrik Vault.

## Features

- Google OAuth Sign-In
- User verification against Strapi (any email domain)
- Client-side session management (compatible with static export)
- Protected routes with client-side authentication
- Works with `output: export` (static site generation)

## Setup Instructions

### 1. Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Configure the OAuth consent screen:
   - User Type: Internal or External (depending on your needs)
   - Application name: Algebrik Vault
   - Authorized domains: your-domain.com
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
7. Copy the Client ID

### 2. Environment Variables

Add the following to your `.env.local` file:

```env
# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here

# Strapi (if not already set)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your-strapi-api-token
```

### 3. Strapi User Collection Setup

You need to set up a users collection in Strapi to store authorized users.

#### Option A: Use Strapi's Built-in Users (Recommended)

Strapi has a built-in `users` collection. You can:

1. Access Strapi Admin Panel
2. Go to Settings → Users & Permissions Plugin
3. Create users with any email addresses
4. The API will automatically check against these users

#### Option B: Create Custom Collection Type

If you want a separate collection for vault users:

1. In Strapi Admin, go to Content-Type Builder
2. Create a new collection type called "VaultUser"
3. Add fields:
   - `email` (Email, required, unique)
   - `name` (Text, required)
   - `googleId` (Text, optional)
   - `picture` (Media, optional)
   - `active` (Boolean, default: true)
4. Update the login page to query your custom collection instead of "users"

### 4. Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Test Google Sign-In:
   - Click "Continue with Google"
   - Sign in with any Google account
   - If the user exists in Strapi, you'll be redirected to `/vault`
   - If not, you'll see an access denied message

4. Test Email Validation:
   - Enter any email address
   - The system will check if the user exists in Strapi

## File Structure

```
app/
├── login/
│   └── page.tsx              # Login page component (calls Strapi directly)
├── vault/
│   ├── page.tsx              # Protected vault page (client-side auth check)
│   └── LogoutButton.tsx      # Logout button component

lib/
├── auth-client.ts            # Client-side authentication utilities
└── auth.ts                   # Server-side auth utilities (not used with static export)
```

**Note**: This setup uses client-side authentication to work with `output: export`. No API routes or middleware are used.

## Security Notes

1. **Session Storage**: Sessions are stored in localStorage and cookies (client-side)
   - **Important**: For production, consider implementing server-side session validation
   - Current implementation is suitable for internal tools with static export
2. **User Verification**: Users must exist in Strapi before they can log in
3. **HTTPS**: In production, ensure HTTPS is enabled for secure data transmission
4. **Access Control**: Only users that exist in your Strapi users collection can access the portal
5. **Static Export**: This setup works with `output: export` but requires client-side authentication
6. **Strapi API Token**: The `NEXT_PUBLIC_STRAPI_API_TOKEN` is exposed to the client. Ensure your Strapi instance has proper CORS and rate limiting configured.

## Troubleshooting

### Google Sign-In not working
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set correctly
- Check that authorized origins match your domain
- Ensure Google Identity Services script loads (check browser console)

### User not found errors
- Verify the user exists in Strapi's users collection
- Check that the email matches exactly (case-sensitive)
- Ensure Strapi API token has read permissions for users

### Session not persisting
- Check browser localStorage and cookie settings
- Verify cookie domain is set correctly
- In development, ensure you're using `http://localhost:3000` consistently
- Clear browser cache and try again

### Static Export Errors
- Ensure `output: "export"` is set in `next.config.ts`
- No API routes should exist (they're incompatible with static export)
- Middleware is not used (replaced with client-side auth checks)

## Next Steps

1. Set up Google OAuth credentials
2. Add users to Strapi
3. Test the login flow
4. Customize the vault page with your actual content
5. Add additional protected routes as needed

