# Bundle Katching - Metafields Setup Guide

This guide explains how to set up the metafields required for the Bundle Katching section to work properly. **This section now uses the SAME metafields as your existing custom-bundle-kaching-snippet implementation.**

## Overview

The Bundle Katching section uses Shopify metafields to control:
- Variant-specific text and labels
- Prices and savings information
- Per-serving text
- Product-specific settings

All metafields should be created in the **`custom`** namespace.

## Required Metafields

### Variant-Level Metafields (Per Variant)

These metafields are set on each product variant and control variant-specific behavior:

#### 1. Variant Subtext (Displayed under variant name)
- **Namespace:** `custom`
- **Key:** `variant_subtext_onetime` and `variant_subtext_subscribe`
- **Type:** Single line text
- **Description:** Text displayed under the variant name, different for one-time vs subscription
- **Example:**
  - `variant_subtext_onetime`: "Best for first-time buyers"
  - `variant_subtext_subscribe`: "Save 15% with subscription"

#### 2. Saving Badges (Displayed on variant cards)
- **Namespace:** `custom`
- **Keys:** 
  - `save_onetime` (or `bundle_saving_onetime` or `saving_onetime`)
  - `save_subscribe` (or `bundle_saving_subscribe` or `saving_subscribe`)
- **Type:** Single line text
- **Description:** Badge text showing savings amount (e.g., "Save $20")
- **Note:** The section checks all three possible keys and uses the first one found

#### 3. Per-Serving Text (Displayed in plan section)
- **Namespace:** `custom`
- **Keys:**
  - `per_serving_text_onetime` and `per_serving_text_subscribe`
  - `per_serving_text2_onetime` and `per_serving_text2_subscribe`
- **Type:** Single line text
- **Description:** Text showing price per serving (e.g., "$1.96 Per serving")
- **Note:** Two text fields allow for primary and secondary per-serving information

### Product-Level Metafields

#### 1. Subscription Subtitle
- **Namespace:** `custom`
- **Key:** `bundle_louis_sous_titre_abonnement`
- **Type:** Single line text
- **Description:** Subtitle text displayed under "Subscribe & Save" option
- **Example:** "Delivered every 4 weeks."

#### 2. Offer Images
- **Namespace:** `custom`
- **Keys:** 
  - `offer_image_subscribe` - Image shown for subscription plan
  - `offer_image_onetime` - Image shown for one-time purchase plan
- **Type:** File reference (image)
- **Description:** Images displayed in the free offer section

## How to Create Metafields in Shopify

### Method 1: Using Shopify Admin (Recommended)

1. Go to **Settings** → **Custom data**
2. Click on **Products** (for product-level) or **Variants** (for variant-level)
3. Click **Add definition**
4. Fill in:
   - **Name:** (e.g., "Variant Subtext Onetime")
   - **Namespace and key:** `custom.variant_subtext_onetime`
   - **Type:** Select appropriate type (Text, File reference, etc.)
   - **Validation:** Set if needed
5. Click **Save**
6. Repeat for all metafields

### Method 2: Using Metafields App

If you have a metafields management app, you can bulk create these metafields.

## Setting Metafield Values

### For Variants:

1. Go to **Products** → Select your product
2. Click on a variant
3. Scroll to **Metafields** section
4. Fill in the values for each metafield
5. Click **Save**

### For Products:

1. Go to **Products** → Select your product
2. Scroll down to **Metafields** section
3. Fill in the values for each metafield
4. Click **Save**

## Example Configuration

For a product with 3 variants (1, 2, 3 jars):

### Variant 1 Metafields:
```
custom.variant_subtext_onetime = "Perfect starter size"
custom.variant_subtext_subscribe = "Best value starter"
custom.save_onetime = "Save $10"
custom.save_subscribe = "Save $15"
custom.per_serving_text_onetime = "$2.50 per serving"
custom.per_serving_text_subscribe = "$1.96 per serving"
```

### Variant 2 Metafields:
```
custom.variant_subtext_onetime = "Most popular choice"
custom.variant_subtext_subscribe = "Most popular subscription"
custom.save_onetime = "Save $25"
custom.save_subscribe = "Save $35"
custom.per_serving_text_onetime = "$2.25 per serving"
custom.per_serving_text_subscribe = "$1.75 per serving"
```

### Variant 3 Metafields:
```
custom.variant_subtext_onetime = "Best value bulk size"
custom.variant_subtext_subscribe = "Maximum savings"
custom.save_onetime = "Save $40"
custom.save_subscribe = "Save $60"
custom.per_serving_text_onetime = "$2.00 per serving"
custom.per_serving_text_subscribe = "$1.50 per serving"
```

### Product Metafields:
```
custom.bundle_louis_sous_titre_abonnement = "Delivered every 4 weeks."
custom.offer_image_subscribe = [image file]
custom.offer_image_onetime = [image file]
```

## Notes

- **Variant Selection:** The section automatically uses the first 3 variants of your product
- **Fallbacks:** If metafields are not set, the section will:
  - Use variant title or option name for display
  - Hide saving badges and subtext if not available
  - Use product default price
- **Multiple Key Support:** For saving badges, the section checks multiple possible keys:
  - `save_onetime` → `bundle_saving_onetime` → `saving_onetime`
  - `save_subscribe` → `bundle_saving_subscribe` → `saving_subscribe`
- **Optional Fields:** All metafields are optional. The section will work with minimal configuration

## Compatibility

This section is **fully compatible** with your existing `custom-bundle-kaching-snippet` implementation and uses the **exact same metafield structure**. You can use the same metafields for both implementations.

## Testing

After setting up metafields:

1. Add the "Bundle Katching" section to a product page in Theme Editor
2. Select the product in section settings
3. Verify that:
   - Variant options display correctly with images
   - Variant subtext appears when switching between plans
   - Saving badges display on variant cards
   - Per-serving text shows in plan sections
   - Add to cart uses the correct variant ID
   - Free product offer displays (if configured)
   - Benefits list shows (if configured in section settings)

## Troubleshooting

**Variant subtext not showing:**
- Check that variant metafields are set correctly
- Verify the keys match exactly: `variant_subtext_onetime` and `variant_subtext_subscribe`
- Ensure you're setting them on the variant, not the product

**Saving badges not displaying:**
- Verify at least one of the saving metafield keys is set
- Check that the text is not empty
- Ensure metafields are set on the correct variant

**Per-serving text not showing:**
- Check that `per_serving_text_onetime` or `per_serving_text_subscribe` is set
- Verify the metafield is on the variant, not the product

**Benefits not displaying:**
- Check that benefit settings are configured in Theme Editor
- Verify section setting "Show Subscription Benefits" is enabled
- Ensure at least one benefit text is filled in
