# Navigation System - Visual Architecture

## How Everything Connects

```
┌─────────────────────────────────────────────────────────────┐
│                        GLAM STORE APP                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    HEADER                             │   │
│  │  Logo  |  Search  |  ❤️ Wishlist  |  🛍️ Cart  |  👤 │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         NAVIGATION (Desktop Hover Menu)              │   │
│  │  💄Makeup | 🧴Skincare | 💇Haircare | 🌸Fragrance   │   │
│  │  ┌────────────────┐                                  │   │
│  │  │ Face           │ ← Hover reveals submenu          │   │
│  │  │  • Primer      │                                  │   │
│  │  │  • Foundation  │                                  │   │
│  │  │  • Concealer   │                                  │   │
│  │  └────────────────┘                                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Home / Makeup / Face                                │   │ ← BREADCRUMBS
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  CATEGORY PAGE: Face Makeup                          │   │
│  │  [Banner Image - Face Products]                      │   │
│  │                                                       │   │
│  │  ┌─────────┬──────────────────────────┐              │   │
│  │  │FILTERS  │ Primer | Concealer | ... │ ← TABS      │   │
│  │  │         ├──────────────────────────┤              │   │
│  │  │ Price   │ [Product Grid]           │              │   │
│  │  │ Rating  │ ┌──────┐ ┌──────┐       │              │   │
│  │  │ Discount│ │  P1  │ │  P2  │ ...  │              │   │
│  │  │         │ └──────┘ └──────┘       │              │   │
│  │  │ [Sort]  │                         │              │   │
│  │  └─────────┴──────────────────────────┘              │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    FOOTER                             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌─────────────────────────┐
│  lib/categories.ts      │
│  ─────────────────────  │
│  CATEGORIES array       │ ◄─── Single Source of Truth
│  SUBCATEGORIES object   │
│  getCategoryMetadata()  │
│  getBreadcrumbs()       │
└────────────┬────────────┘
             │
             ├─────────────────────┐
             │                     │
             ▼                     ▼
      ┌──────────────┐      ┌──────────────┐
      │ Navigation   │      │ CategoryPage │
      │ Component    │      │ Component    │
      │              │      │              │
      │ • Desktop    │      │ • Banner     │
      │   hover menu │      │ • Tabs       │
      │ • Mobile     │      │ • Filters    │
      │   accordion  │      │ • Sort       │
      │ • Links to   │      │ • Products   │
      │   categories │      │ • Responsive │
      └──────────────┘      └──────────────┘
             │                     │
             │                     │
             └─────────────┬───────┘
                           │
                  ┌────────▼─────────┐
                  │  Breadcrumbs     │
                  │  Component       │
                  │  • Auto-gener    │
                  │  • Hierarchy     │
                  │  • SEO schema    │
                  └──────────────────┘
```

## Route Resolution Flow

```
User visits: /makeup/face/foundation
                    │
                    ▼
┌──────────────────────────────────────┐
│ Next.js Route Matching               │
├──────────────────────────────────────┤
│ Tries specific routes first:         │
│ 1. /pages/makeup/face/foundation     ✗ Not found
│ 2. /pages/[category]/[...sub]        ★ MATCHED!
│ 3. /pages/[[...slug]]                (fallback)
└──────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────┐
│ Component Receives Params:           │
│ slug = ["makeup", "face", "foundation"]
└──────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────┐
│ CategoryPage Component:              │
│ • Joins slug: "makeup/face/foundation"
│ • Looks in CATEGORIES config         │
│ • Finds matching category            │
│ • Gets metadata & products           │
│ • Renders page with all sections     │
└──────────────────────────────────────┘
```

## Component Hierarchy

```
app/layout.tsx (Root)
├── AuthProvider
├── CartProvider
├── Header (Auth + Search + Icons)
├── Navigation ◄──────────────────────┐
│   └── Uses CATEGORIES from config   │
│       • Desktop: Hover menus        │
│       • Mobile: Accordion toggle    │
│                                     │
├── Breadcrumbs ◄────────────────────┤ Reads from
│   └── Auto-generated from URL       │ lib/categories.ts
│                                     │
├── main                              │
│   └── CategoryPage ◄────────────────┤
│       ├── Banner                    │
│       ├── Sub-category Tabs         │
│       ├── Filters Sidebar           │
│       ├── Sort Dropdown             │
│       └── Product Grid              │
│                                     │
└── Footer
```

## File Organization

```
app/
├── layout.tsx ─────────────► Includes Navigation & Breadcrumbs
├── page.tsx ────────────────► Home page
├── [[...slug]]/
│   ├── page.tsx ────────────► Catch-all dynamic routes
│   └── (Handles: /makeup, /makeup/face, /makeup/face/primer)
│
├── [category]/
│   └── [...subcategory]/
│       └── page.tsx ────────► Specific category handler
│
├── makeup/
│   └── page.tsx ────────────► Category: /makeup
├── skincare/
│   └── page.tsx ────────────► Category: /skincare
├── haircare/
│   └── page.tsx ────────────► Category: /haircare
├── fragrance/
│   └── page.tsx ────────────► Category: /fragrance
│
├── (existing routes)
├── cart/ ─────────────────────► Not affected
├── checkout/ ─────────────────► Not affected
├── profile/ ──────────────────► Not affected
└── login/ ────────────────────► Not affected

components/
├── Navigation.tsx ────────────► Main navigation
├── Breadcrumbs.tsx ─────────────► Auto breadcrumbs
├── CategoryPage.tsx ────────────► Category template
└── layout/
    └── Header.tsx

lib/
├── categories.ts ───────────────► CONFIG + HELPERS
│   ├── CATEGORIES array
│   ├── SUBCATEGORIES object
│   ├── getCategoryMetadata()
│   ├── getBreadcrumbs()
│   └── flattenCategories()
└── data.ts ─────────────────────► Product data

styles/
├── navigation.css ───────────────► Navigation styles
└── pages.css ────────────────────► Category page styles
```

## Configuration Example

```typescript
// lib/categories.ts
export const CATEGORIES: CategoryItem[] = [
  {
    id: "makeup",                    // Unique ID
    label: "Makeup",                 // Display label
    slug: "makeup",                  // URL slug
    icon: "💄",                       // Optional icon
    description: "All makeup products",
    children: [                      // Sub-categories
      {
        id: "makeup-face",
        label: "Face",
        slug: "face",
        description: "Face makeup & foundation"
      },
      {
        id: "makeup-eyes",
        label: "Eyes",
        slug: "eyes",
        description: "Eye makeup & eyeshadow"
      },
      // ... more sub-categories
    ]
  },
  // ... more categories
]

// Link mapping for third-level items
export const SUBCATEGORIES = {
  "makeup/face": [
    { id: "...", label: "Primer", slug: "primer" },
    { id: "...", label: "Foundation", slug: "foundation" },
    // ...
  ],
  // ... more sub-category mappings
}
```

## URL Pattern Examples

```
/makeup                      → CategoryPage with slug=["makeup"]
/makeup/face                 → CategoryPage with slug=["makeup", "face"]
/makeup/face/primer          → CategoryPage with slug=["makeup", "face", "primer"]
/skincare/cleanser           → CategoryPage with slug=["skincare", "cleanser"]
/skincare/cleanser/face-wash → CategoryPage with slug=["skincare", "cleanser", "face-wash"]

All rendered by:
1. CategoryPage component
2. Which reads parameter slug
3. Looks in CATEGORIES config
4. Generates page dynamically
```

## Feature Highlights

✅ **Scalable:**
- Add new category = just update CATEGORIES array
- 72+ routes from ~500 lines of config
- No need to create individual page files

✅ **Responsive:**
- Desktop: Hover menus
- Mobile: Accordion (toggles)
- Touch-friendly, keyboard accessible

✅ **SEO Friendly:**
- Dynamic meta titles & descriptions
- Breadcrumbs for hierarchy
- Open Graph tags
- Semantic HTML

✅ **Performance:**
- Lazy-loaded components
- CSS animations (no JavaScript)
- Image URLs (CDN cached)
- ~2KB CSS total

✅ **Maintainable:**
- Single source of truth (CATEGORIES)
- DRY principle
- Easy to extend
- Clear component separation