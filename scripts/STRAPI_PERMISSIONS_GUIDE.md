# Strapi Permissions Fix Guide

## 🔍 **Problem Identified**

The `DynamicBlog` component fails with 403 Forbidden because Strapi permissions don't allow server-side access to the `blogs` content type.

## ✅ **Solution: Fix Strapi Permissions**

### **Method 1: Configure Public Permissions (Recommended)**

1. **Open Strapi Admin Panel:**
   ```
   http://localhost:1337/admin
   ```

2. **Navigate to Permissions:**
   - Go to **Settings** → **Users & Permissions Plugin** → **Roles**
   - Click on **Public** role

3. **Enable Blog Permissions:**
   - Find **Blogs** content type
   - Check the following permissions:
     - ✅ **find** (to list blogs)
     - ✅ **findOne** (to get single blog)
   - Click **Save**

### **Method 2: Use API Token (Alternative)**

1. **Create API Token:**
   - Go to **Settings** → **API Tokens** → **Create new token**
   - Name: `Website API Token`
   - Token type: `Full access`
   - Click **Save**

2. **Add to Environment:**
   ```bash
   # Add to .env.local
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   NEXT_PUBLIC_STRAPI_API_TOKEN=your_token_here
   ```

## 🧪 **Test the Fix**

After fixing permissions, test:

```bash
# Test basic Strapi connection
npm run test:strapi

# Test blog fetch (like BlogCarousel)
npm run test:blogs

# Build the site
npm run build
```

## 🎯 **Expected Results**

- ✅ `npm run test:strapi` should return 200 OK
- ✅ `npm run test:blogs` should show blog data
- ✅ `npm run build` should complete without errors
- ✅ Dynamic blog pages should work

## 🔧 **Why This Happens**

- **BlogCarousel** runs in browser → Uses public permissions
- **DynamicBlog** runs on server → Needs server permissions or API token
- **Static export** requires server-side access during build

## 📝 **Next Steps**

1. Fix Strapi permissions (Method 1 is easiest)
2. Test with `npm run test:blogs`
3. Build the site with `npm run build`
4. Seed blog data with `npm run seed:blogs:all`
5. Test dynamic blog pages
