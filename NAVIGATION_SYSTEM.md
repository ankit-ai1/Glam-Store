# E-Commerce Navigation System Documentation

## Overview

This is a scalable, configuration-driven navigation system for the Glam Store e-commerce platform supporting:
- Dynamic category routing
- Desktop hover menus
- Mobile accordion menus
- Automatic breadcrumbs
- SEO-friendly URLs
- Lazy-loaded category pages

## Architecture

### 1. Configuration File: `lib/categories.ts`

**Single Source of Truth** containing all navigation data:

```typescript
CATEGORIES: CategoryItem[] // Main navigation items
SUBCATEGORIES: Record<string, CategoryItem[]> // Sub-category mappings
getCategoryMetadata(slug) // Get title, description, banner, keywords
getBreadcrumbs(pathname) // Generate breadcrumbs
flattenCategories(categories) // Flatten for easy lookup
```

**Adding a New Category:**

```typescript
{
  id: "skincare",
  label: "Skincare",
  slug: "skincare",
  icon: "🧴",
  children: [
    { 
      id: "skincare-cleanser", 
      label: "Cleanser", 
      slug: "cleanser",
      description: "Face cleansers & washes"
    },
    // ... more subcategories
  ]
}
```

### 2. Navigation Component: `components/Navigation.tsx`

**Features:**
- Desktop hover menus with smooth animations
- Mobile accordion with toggle buttons
- Responsive design (hidden on desktop when < 1024px)
- Keyboard accessible
- Touch-friendly on mobile

**Usage:**
```jsx
<Navigation />
```

**Props:** None (reads from CATEGORIES config)

### 3. Category Pages

#### Dynamic Routing
- **Pattern:** `app/[[...slug]]/page.tsx` (catch-all route)
- **Handles:** `/makeup`, `/makeup/face`, `/makeup/face/foundation`, etc.
- **Benefits:** No need to create individual page files for each category

#### Individual Category Pages
- **Markup:** `app/{category}/page.tsx`
- **Examples:** `app/makeup/page.tsx`, `app/skincare/page.tsx`
- **Purpose:** SEO optimization, metadata control

#### Sub-Category Pages
- **Pattern:** Dynamic via catch-all route
- **URL:** `/makeup/face`, `/skincare/cleanser`, etc.
- **Auto-generated:** No manual page creation needed

### 4. Breadcrumbs Component: `components/Breadcrumbs.tsx`

**Features:**
- Auto-generated from URL pathname
- Hierarchical navigation display
- Hidden on home page
- Interactive links

**Usage:**
```jsx
<Breadcrumbs />
```

### 5. Category Landing Page: `components/CategoryPage.tsx`

**Sections per Page:**
1. **Breadcrumbs** - Automatic hierarchy
2. **Hero Banner** - Customizable background image
3. **Sub-category Tabs** - Quick navigation
4. **Filter Sidebar** 
   - Price range filter
   - Rating filter
   - Discount filter
5. **Main Products Grid**
   - Sort dropdown (Popular, Newest, Price, Rating)
   - Responsive grid layout
   - Product cards with badges

## File Structure

```
app/
├── [[...slug]]/
│   └── page.tsx              # Catch-all dynamic route
├── makeup/
│   └── page.tsx              # Makeup category (example)
├── skincare/
│   └── page.tsx              # Skincare category (example)
├── haircare/
│   └── page.tsx              # Haircare category (example)
├── layout.tsx                # Includes Navigation & Breadcrumbs

components/
├── Navigation.tsx            # Main navigation component
├── Breadcrumbs.tsx          # Breadcrumb navigation
├── CategoryPage.tsx         # Category landing page template
└── layout/
    └── Header.tsx           # Header with auth integration

lib/
├── categories.ts            # Navigation config & helpers
└── data.ts                  # Product data

styles/
├── navigation.css           # Navigation styles
└── pages.css                # Category page styles
```

## All Available Routes

### Makeup Routes
- `/makeup`
- `/makeup/face` → `/makeup/face/primer`, `/makeup/face/foundation`, etc.
- `/makeup/eyes` → `/makeup/eyes/kajal`, `/makeup/eyes/mascara`, etc.
- `/makeup/lips` → `/makeup/lips/lipstick`, etc.
- `/makeup/nails` → Nail products
- `/makeup/tools-brushes`
- `/makeup/kits-combos`

### Skincare Routes
- `/skincare`
- `/skincare/cleanser` → Face wash, cleansing milk, oil, micellar water
- `/skincare/moisturizer`
- `/skincare/serum` → Vitamin C, Hyaluronic acid, Niacinamide, Retinol
- `/skincare/sunscreen`
- `/skincare/masks`
- `/skincare/toner`
- `/skincare/exfoliator`
- `/skincare/eye-care`
- `/skincare/lip-care`
- `/skincare/acne-care`

### Haircare Routes
- `/haircare`
- `/haircare/shampoo`
- `/haircare/conditioner`
- `/haircare/hair-oil`
- `/haircare/hair-serum`
- `/haircare/hair-mask`
- `/haircare/hair-color`
- `/haircare/styling`

### Fragrance Routes
- `/fragrance`
- `/fragrance/perfume`
- `/fragrance/body-mist`
- `/fragrance/deodorant`
- `/fragrance/attar`
- `/fragrance/gift-set`

### Bath & Body Routes
- `/bath-body`
- `/bath-body/body-wash`
- `/bath-body/body-lotion`
- `/bath-body/body-butter`
- `/bath-body/body-scrub`
- `/bath-body/hand-care`
- `/bath-body/foot-care`
- `/bath-body/shower-gel`

### Men Routes
- `/men`
- `/men/beard-care`
- `/men/shaving`
- `/men/face-care`
- `/men/hair-care`
- `/men/fragrance`
- `/men/body-care`

### Mom & Baby Routes
- `/mom-baby/baby-care`
- `/mom-baby/baby-lotion`
- `/mom-baby/baby-wash`
- `/mom-baby/maternity-care`
- `/mom-baby/baby-powder`

### Beauty Tools Routes
- `/beauty-tools`
- `/beauty-tools/makeup-brushes`
- `/beauty-tools/sponges`
- `/beauty-tools/hair-tools`
- `/beauty-tools/trimmers`
- `/beauty-tools/mirrors`
- `/beauty-tools/accessories`

### Brands Routes
- `/brands`
- `/brands/loreal`
- `/brands/maybelline`
- `/brands/mac`
- `/brands/lakme`
- `/brands/huda-beauty`
- `/brands/colorbar`
- `/brands/plum`
- `/brands/mamaearth`
- `/brands/minimalist`
- `/brands/dot-key`

### Offers Routes
- `/offers`
- `/offers/flash-sale`
- `/offers/buy-1-get-1`
- `/offers/combo-deals`
- `/offers/under-499`
- `/offers/under-999`
- `/offers/new-launches`

## Styling & Responsive Design

### Breakpoints
- **Desktop:** ≥ 1024px - Hover menus visible
- **Tablet:** 769px - 1023px - Navigation optimized
- **Mobile:** ≤ 768px - Accordion menus, full width

### Desktop Navigation Features
- Hover reveals submenu
- Smooth transitions (0.2s ease)
- Icon + label display
- Multi-level submenu support

### Mobile Navigation Features
- Accordion collapse/expand
- Full-screen overlay on open
- Touch-friendly buttons
- Back-scroll prevention when open

## SEO Optimization

### Features
- SEO-friendly URL slugs (kebab-case)
- Dynamic metadata per category
- Structured breadcrumbs (for schema.org)
- Meta descriptions & keywords
- Open Graph tags for social sharing

### Metadata Configuration
Located in `getCategoryMetadata()`:
```typescript
{
  title: "Makeup | Glam Store",
  description: "Shop premium makeup...",
  banner: "URL to banner image",
  keywords: "makeup, cosmetics, lipstick..."
}
```

## Adding New Categories

### Step 1: Add to Configuration
Edit `lib/categories.ts`:
```typescript
{
  id: "new-category",
  label: "New Category",
  slug: "new-category",
  icon: "🎯",
  children: [
    { id: "sub-1", label: "Sub 1", slug: "sub-1" },
    // ...
  ]
}
```

### Step 2: Add Metadata (Optional)
Edit `getCategoryMetadata()` to add title, description, banner

### Step 3: Create Page File (Optional)
Create `app/new-category/page.tsx` for better SEO control

**That's it!** The catch-all route handles everything automatically.

## Performance Optimizations

1. **Lazy Loading**
   - Category pages load on demand
   - Components code-split automatically

2. **Image Optimization**
   - Banner images are URLs (load on demand)
   - Product images cached by CDN

3. **CSS Optimization**
   - Navigation CSS is minimal (~2KB)
   - Animations use CSS (no JS overhead)
   - Media queries for responsive design

## Common Tasks

### Change Navigation Position
Edit `app/layout.tsx`:
```jsx
<Header />
<Navigation />  {/* Position here */}
<Breadcrumbs />
<main>{children}</main>
```

### Customize Banner Image
Edit `lib/categories.ts` → `getCategoryMetadata()`:
```typescript
banner: "https://your-image-url.jpg"
```

### Add New Filter Option
Edit `components/CategoryPage.tsx` → Filter Sidebar section

### Modify Sort Options
Edit `components/CategoryPage.tsx` → Sort Dropdown options

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML (nav, button, link)
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Color contrast compliance

## Troubleshooting

### Routes Not Showing
- Check capitalization in `CATEGORIES` config
- Verify slug matches URL path

### Navigation Not Appearing
- Ensure `Navigation` component is in `layout.tsx`
- Check CSS file is imported

### Breadcrumbs Wrong
- Verify URL structure matches config
- Check `getBreadcrumbs()` logic

### Mobile Menu Not Closing
- Check for z-index conflicts with other overlays
- Verify click handlers in Navigation component

## Future Enhancements

- [ ] Category analytics tracking
- [ ] Dynamic category creation from CMS
- [ ] Personalized category recommendations
- [ ] Search within categories
- [ ] Category-specific promotions
- [ ] Comparison feature
- [ ] Save favorite categories