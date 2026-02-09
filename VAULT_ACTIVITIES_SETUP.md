# Vault Activities - Strapi Collection Setup

This guide explains how to set up the Strapi collection for tracking team-wide vault activities.

## Collection Type: `vault-activities`

### Required Fields

Create a collection type called `vault-activities` in Strapi with the following fields:

#### Basic Fields

1. **userId** (Text, required)
   - Email or unique identifier of the user who performed the action
   - Example: "user@example.com"

2. **userName** (Text, required)
   - Display name of the user
   - Example: "Samudra Deka"

3. **userEmail** (Text, required)
   - Email address of the user
   - Example: "samudra@algebrik.ai"

4. **action** (Enumeration, required)
   - Type of action performed
   - Options: `downloaded`, `viewed`, `opened`
   - Example: "downloaded"

5. **assetTitle** (Text, required)
   - Title of the asset that was accessed
   - Example: "Q4 Campaign Assets Bundle"

6. **assetId** (Number, required)
   - ID of the asset from the vault-assets collection
   - Example: 123

7. **timestamp** (DateTime, required)
   - When the activity occurred
   - Automatically set to current time when created
   - Example: "2024-12-20T10:30:00.000Z"

### Permissions

Make sure the `vault-activities` collection has:
- **Public** role: `find` and `create` permissions enabled
- Or use API token authentication (already configured via `NEXT_PUBLIC_STRAPI_API_TOKEN`)

### API Endpoints

The app uses:
- **POST** `/api/vault-activities` - Create new activity (when user downloads/opens asset)
- **GET** `/api/vault-activities?sort[0]=timestamp:desc&pagination[limit]=20` - Fetch recent activities

### Example Entry

```json
{
  "userId": "samudra@algebrik.ai",
  "userName": "Samudra Deka",
  "userEmail": "samudra@algebrik.ai",
  "action": "downloaded",
  "assetTitle": "Q4 Campaign Assets Bundle",
  "assetId": 123,
  "timestamp": "2024-12-20T10:30:00.000Z"
}
```

### Notes

- Activities are automatically sorted by timestamp (newest first)
- The dashboard displays the 10 most recent activities
- Activities refresh every 10 seconds on the dashboard
- If Strapi is unavailable, activities fall back to localStorage (user-specific only)

