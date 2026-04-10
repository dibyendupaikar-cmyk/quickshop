# Design Brief — QuickShop

## Purpose & Emotion
Product-centric e-commerce platform. Users feel confident, inspired, and ready to purchase. Clean grid with trust through premium aesthetic.

## Tone
Modern, premium, trustworthy commerce. Not playful—refined. Smooth, intentional interactions.

## Differentiation
**Product card hover lift** — cards rise on hover with subtle shadow. **Unified checkout flow** — minimal friction from cart to payment. **Discount badges** — amber accent highlights sales/coupons. **Image-first** — product photography is the hero; UI recedes. **Dark mode native** — not an afterthought.

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Usage |
|-------|---|---|---|
| **Primary** | `0.28 0.15 262` (deep navy) | `0.72 0.18 262` | Trust, headers, CTA backgrounds |
| **Accent** | `0.68 0.22 62` (amber) | `0.78 0.24 62` | Discount badges, sale indicators, secondary CTAs |
| **Destructive** | `0.54 0.24 25` (red) | `0.62 0.24 25` | Remove from cart, cancel actions |
| **Foreground** | `0.12 0 0` (near-black) | `0.95 0 0` (near-white) | Body text, labels |
| **Muted** | `0.92 0 0` (light grey) | `0.20 0 0` (dark grey) | Secondary text, dividers, inactive states |
| **Border** | `0.88 0 0` | `0.24 0 0` | Card edges, input borders, visual separation |

## Typography

| Layer | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| **Display** | Bricolage Grotesque | 32px / 28px (mobile) | 700 | Page titles, section headers |
| **Title** | Bricolage Grotesque | 20px / 18px (mobile) | 600 | Product names, modal titles |
| **Body** | DM Sans | 16px / 14px (mobile) | 400 | Product descriptions, cart items, UI copy |
| **Caption** | DM Sans | 12px | 400 | Prices, ratings, timestamps |
| **Mono** | Geist Mono | 12px | 400 | Discount codes, order IDs, payment amounts |

## Elevation & Depth

| Level | Shadow | Usage |
|-------|--------|-------|
| **Surface** | None | Backgrounds, sections |
| **Product Card** | `shadow-product` (4px 12px rgba) | Default product grid |
| **Elevated** | `shadow-elevated` (12px 24px rgba) | Modals, sticky headers, popovers |
| **Hover** | shadow-lg + -2px lift | Interactive card states |

## Structural Zones

| Zone | Surface | Border | Usage |
|------|---------|--------|-------|
| **Header** | `bg-card` | `border-b border-border` | Logo, search, cart icon—sticky on scroll |
| **Main** | `bg-background` | None | Product grid, category filters |
| **Product Card** | `bg-card` | Subtle `border-border` | 12px radius, image + price + rating + add-to-cart |
| **Sidebar (Mobile)** | `bg-popover` | `border-l border-border` | Category navigation, filters |
| **Footer** | `bg-muted/20` | `border-t border-border` | Order tracking, help, policies |

## Spacing & Rhythm

- **Container**: 2rem padding, 1400px max-width at `2xl`
- **Gap**: 16px between product cards (grid), 24px between sections
- **Product Card**: 16px internal padding, 8px space between image and details
- **Mobile-first**: 8px gap on `sm`, 16px on `md`, 24px on `lg`

## Component Patterns

- **Product Grid**: Responsive 2 cols (mobile), 3 cols (tablet), 4 cols (desktop). Lazy-load images.
- **Add to Cart**: Amber accent, animated button with loading state. Feedback toast on success.
- **Cart Badge**: Navy background, white text, position absolute on header cart icon.
- **Discount Badge**: Amber background, top-right corner on product card. Text: "% OFF" or fixed amount.
- **Rating Stars**: Muted text, 5-star display with count (`4.5 (128 reviews)`).
- **Input Fields**: `border border-input bg-background`, 8px focus ring on primary.
- **Buttons**: Navy primary default, no border. Amber secondary. Red destructive. Smooth 0.3s transitions.

## Motion & Choreography

| Element | Animation | Timing |
|---------|-----------|--------|
| **Page Load** | `fade-in` | 0.4s ease-out |
| **Product Cards** | Staggered `slide-up` | 0.3s ease-out, 50ms stagger |
| **Button Hover** | Scale 1.02, shadow-lg | 0.2s via transition-smooth |
| **Modal Enter** | `fade-in` overlay + `slide-up` content | 0.3s ease-out |
| **Toast** | `slide-up` from bottom | 0.3s ease-out |
| **Cart Item Add** | Bounce to cart icon (visual destination) | 0.6s cubic-bezier |

## Constraints

- No full-page gradients; depth via layers and shadows.
- No neon or glow effects; shadows are soft, naturalistic.
- Product images are square (1:1 aspect ratio) for grid consistency.
- Dark mode: navy primary → cyan/light blue-ish for better contrast. Backgrounds stay near-black.
- Mobile cards: single column with full-width layout, maintained 12px radius and hover lift.

## Signature Detail

**Hover lift with shadow expansion** — every interactive card gains a 2-pixel vertical translation and increased shadow depth on hover. This subtle movement signals interactivity and reinforces the product-browsing experience as premium and responsive.
