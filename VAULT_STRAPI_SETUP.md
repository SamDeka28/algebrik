# Vault Assets - Strapi Collection Setup

This guide explains how to set up the Strapi collection for vault assets.

## Collection Type: `vault-assets`

### Required Fields

Create a collection type called `vault-assets` in Strapi with the following fields:

#### Basic Fields

1. **title** (Text, required)
   - The title of the asset
   - Example: "Algebrik AI Master Pitch Deck"

2. **description** (Text, required)
   - Description of the asset
   - Example: "Complete overview of Algebrik AI platform capabilities"

3. **type** (Enumeration, required)
   - Options: `DECK`, `DOC`, `LINK`, `VIDEO`, `ONE-PAGER`
   - Determines the asset type badge color

4. **category** (Enumeration, required)
   - Options: `pitch-decks`, `demos`, `one-pagers`, `proof-credibility`, `campaigns-content`, `objection-handling`, `chatbots`, `internal-only`
   - Used to filter assets by section

5. **tags** (Text or JSON, optional)
   - Comma-separated tags or array
   - Example: "CEO,CFO,CTO,Discovery" or ["CEO", "CFO", "CTO", "Discovery"]

6. **isInternal** (Boolean, optional)
   - Marks asset as internal-only
   - If `true`: Shows "Internal only" with lock icon
   - If `false` or not set: Shows "External OK" with shield icon
   - Can also be determined by category (if category is "internal-only")

7. **date** (Date, optional)
   - Publication or update date
   - Falls back to `updatedAt` or `publishedAt` if not set

8. **actionType** (Enumeration, optional)
   - Options: `download`, `open`
   - Default: `download` (or `open` for LINK type)
   - Determines button text and icon
   - **Important**: 
     - If `download`: The app looks for the `file` (Media) field
     - If `open`: The app looks for the `fileUrl` (Text) field

#### Optional Fields

9. **badge** (Text, optional)
   - Product/module badge (e.g., "LOS", "BRE", "POS", "DAO")
   - Displayed in top-right of card

10. **badgeColor** (Text, optional)
    - Custom badge color class
    - Default colors: LOS (blue), BRE (orange), POS (green), DAO (purple)

11. **trend** (Text, optional)
    - Trend indicator (e.g., "+23%")
    - Displayed as green badge in top-right

12. **file** (Media, optional)
    - File upload field for downloadable assets
    - Used when `actionType` is "download"
    - Upload PDFs, documents, presentations, etc.

13. **fileUrl** (Text, optional)
    - External URL for assets that should open in a new tab
    - Used when `actionType` is "open"
    - Example: "https://example.com/presentation" or "/path/to/resource"

## Example Entry

```json
{
  "title": "Algebrik AI Master Pitch Deck",
  "description": "Complete overview of Algebrik AI platform capabilities for executive presentations",
  "type": "DECK",
  "category": "pitch-decks",
  "tags": ["CEO", "CFO", "CTO", "Discovery"],
  "date": "2024-12-15",
  "actionType": "download",
  "badge": "LOS",
  "isInternal": false
}
```

## Category Mapping

- `pitch-decks` → `/vault/pitch-decks`
- `demos` → `/vault/demos`
- `one-pagers` → `/vault/one-pagers`
- `proof-credibility` → `/vault/proof-credibility`
- `campaigns-content` → `/vault/campaigns-content`
- `objection-handling` → `/vault/objection-handling`
- `chatbots` → `/vault/chatbots`
- `internal-only` → `/vault/internal-only`

## API Endpoint

The pages fetch assets from:
```
GET /api/vault-assets?filters[category][$eq]=pitch-decks&populate=*&sort[0]=createdAt:desc
```

## Permissions

Make sure the `vault-assets` collection has:
- **Public** role: `find` and `findOne` permissions enabled
- Or use API token authentication (already configured via `NEXT_PUBLIC_STRAPI_API_TOKEN`)

## Notes

- Assets are automatically sorted by date (newest first)
- Empty sections show a helpful message
- Loading states are handled automatically
- Error states display user-friendly messages

