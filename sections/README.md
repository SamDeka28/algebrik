# Bundle Katching Section

A custom Shopify section that provides a bundle selection interface similar to the design shown in the reference image.

## Features

- **Quantity Selection**: Choose between 1, 2, or 3 jars with visual cards
- **Plan Selection**: Toggle between Monthly Delivery (subscription) and One-time Purchase
- **Dynamic Pricing**: Prices update based on selections
- **Subscription Benefits**: Display benefits for subscription plans
- **Free Product Offer**: Show free product offers with subscription
- **Fully Customizable**: All content managed through Theme Editor and metafields
- **No External Apps**: Fully integrated into your theme

## Installation

1. Copy `bundle-katching.liquid` to your theme's `sections/` folder
2. The section will appear in Theme Editor as "Bundle Katching"

## Usage

### Adding to a Product Page

1. Go to **Online Store** → **Themes** → **Customize**
2. Navigate to a product page
3. Click **Add section**
4. Select **Bundle Katching**
5. Configure the section settings:
   - Select the product (or leave blank to use current product)
   - Customize button text
   - Toggle features (banners, benefits, free offer)
   - Adjust colors and padding

### Setting Up Metafields

See `BUNDLE_METAFIELDS_GUIDE.md` for detailed instructions on setting up product metafields.

**Quick Setup:**
1. Go to **Settings** → **Custom data** → **Products**
2. Create metafields for:
   - Variant IDs (`bundle_variant_1`, `bundle_subscription_variant`, etc.)
   - Prices (`bundle_subscription_price`, `bundle_onetime_price`, etc.)
   - Benefits (`bundle_subscription_benefit_1`, etc.)
3. Set values on your products

## Section Settings

### Product
- **Product**: Select a product (optional - uses current product if not set)

### Button
- **Add to Cart Button Text**: Customize button text
- **Redirect to Cart After Adding**: Toggle redirect behavior

### Display Options
- **Show 'Most Popular' Banner**: Display banner on 2 jars option
- **Show 'Best Value' Banner**: Display banner on 3 jars option
- **Show Free Product Offer**: Display free product offer section
- **Show Subscription Benefits**: Display benefits list

### Styling
- **Primary Color**: Color for selected states and buttons (default: #4caf50)
- **Text Color**: Main text color (default: #333333)
- **Padding**: Top and bottom padding for the section

## Design Features

- Green accent color for selected options (customizable)
- Responsive design for mobile and desktop
- Smooth transitions and hover effects
- Visual feedback for selections
- Payment information display (Shop Pay integration ready)

## Customization

### Colors
All colors can be customized through Theme Editor settings. The primary color affects:
- Selected quantity option borders
- Selected plan option borders
- Radio button fill
- "Save more" tag background
- Add to cart button
- Benefit checkmarks

### Content
All text content can be managed through:
- Section settings (button text, banners)
- Product metafields (prices, benefits, descriptions)
- Theme Editor (when editing the section)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Works with Shopify's cart system

## Notes

- The section requires product metafields to be set up for full functionality
- If metafields are not set, it will use product defaults
- Variant IDs must be valid Shopify variant IDs
- Prices should be in cents if using number type metafields

## Support

For metafield setup instructions, see `BUNDLE_METAFIELDS_GUIDE.md`.

