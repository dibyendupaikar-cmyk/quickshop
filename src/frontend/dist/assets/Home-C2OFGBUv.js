import { c as createLucideIcon, j as jsxRuntimeExports, S as Shirt, C as Cpu, U as UtensilsCrossed, a as cn, u as useCartStore, b as useWishlistStore, L as Link, B as Badge, H as Heart, d as Button, e as ShoppingCart, r as reactExports, X } from "./index-BcEEdqxz.js";
import { u as ue } from "./index-BCkbE-xZ.js";
import { S as StarRating } from "./StarRating-KPMqp45i.js";
import { I as Input } from "./input-BuzKrnlF.js";
import { S as Skeleton } from "./skeleton-CwPIWZmi.js";
import { u as useProducts } from "./useBackend-5NC4LJso.js";
import { A as ArrowRight } from "./arrow-right-Dn7ScuNv.js";
import { T as Truck } from "./truck-D7xdKpR1.js";
import { T as Tag } from "./tag-DRXBsinr.js";
import { S as Search } from "./search-CjA6Wj5V.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
      key: "1xhozi"
    }
  ]
];
const Headphones = createLucideIcon("headphones", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["circle", { cx: "18.5", cy: "15.5", r: "2.5", key: "b5zd12" }],
  ["path", { d: "M20.27 17.27 22 19", key: "1l4muz" }]
];
const PackageSearch = createLucideIcon("package-search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
const categories = [
  { value: "all", label: "All", icon: LayoutGrid },
  { value: "clothing", label: "Clothing", icon: Shirt },
  { value: "electronics", label: "Electronics", icon: Cpu },
  { value: "food", label: "Food", icon: UtensilsCrossed }
];
function CategoryFilter({
  selected,
  onChange,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex flex-wrap gap-2", className),
      "aria-label": "Filter by category",
      children: categories.map(({ value, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onChange(value),
          "data-ocid": `category-filter-${value}`,
          className: cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-smooth",
            "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            selected === value ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-primary/5"
          ),
          "aria-pressed": selected === value,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
            label
          ]
        },
        value
      ))
    }
  );
}
function ProductCard({ product, className }) {
  const addToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const discountPct = product.originalPrice && product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    ue.success("Added to cart", {
      description: product.name,
      duration: 2500
    });
  };
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    ue(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      description: product.name,
      duration: 2e3
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/products/$id",
      params: { id: product.id },
      className: cn(
        "group block bg-card rounded-xl overflow-hidden border border-border",
        "card-hover shadow-product",
        className
      ),
      "data-ocid": "product-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
              loading: "lazy"
            }
          ),
          discountPct && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              className: "absolute top-2 left-2 bg-accent text-accent-foreground font-semibold text-xs px-2 py-0.5",
              "data-ocid": "discount-badge",
              children: [
                "-",
                discountPct,
                "%"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleToggleWishlist,
              "aria-label": isWishlisted ? "Remove from wishlist" : "Add to wishlist",
              "data-ocid": "wishlist-toggle",
              className: cn(
                "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center",
                "bg-card/80 backdrop-blur-sm border border-border transition-smooth",
                "hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isWishlisted ? "text-destructive" : "text-muted-foreground"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Heart,
                {
                  className: "w-4 h-4",
                  fill: isWishlisted ? "currentColor" : "none"
                }
              )
            }
          ),
          !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-sm font-semibold", children: "Out of Stock" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground capitalize mb-1", children: product.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-2 leading-snug mb-1.5", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StarRating,
            {
              rating: product.rating,
              reviewCount: product.reviewCount,
              size: "sm",
              className: "mb-2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-foreground", children: [
                "₹",
                product.price.toLocaleString()
              ] }),
              product.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
                "₹",
                product.originalPrice.toLocaleString()
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "default",
                className: "shrink-0 h-8 px-3 text-xs",
                onClick: handleAddToCart,
                disabled: !product.inStock,
                "aria-label": `Add ${product.name} to cart`,
                "data-ocid": "add-to-cart-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3.5 h-3.5 mr-1", "aria-hidden": "true" }),
                  "Add"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const FEATURED_CATEGORIES = [
  {
    id: "clothing",
    label: "Fashion",
    desc: "Trendy styles for every occasion",
    img: "/assets/generated/cat-clothing.dim_600x450.jpg"
  },
  {
    id: "electronics",
    label: "Electronics",
    desc: "Latest gadgets & tech",
    img: "/assets/generated/cat-electronics.dim_600x450.jpg"
  },
  {
    id: "food",
    label: "Fresh Food",
    desc: "Organic, farm-fresh produce",
    img: "/assets/generated/cat-food.dim_600x450.jpg"
  }
];
const PERKS = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above ₹499" },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "100% safe transactions"
  },
  { icon: Tag, title: "Best Prices", desc: "Lowest price guarantee" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help" }
];
const SKELETON_KEYS = [
  "sk-a",
  "sk-b",
  "sk-c",
  "sk-d",
  "sk-e",
  "sk-f",
  "sk-g",
  "sk-h"
];
const SAMPLE_PRODUCTS = [
  {
    id: "p1",
    name: "Premium Wireless Noise-Cancelling Headphones",
    description: "Studio-quality audio with 40-hour battery life",
    price: 4999,
    originalPrice: 7499,
    category: "electronics",
    imageUrl: "/assets/generated/prod-headphones.dim_400x400.jpg",
    rating: 4.5,
    reviewCount: 1243,
    inStock: true
  },
  {
    id: "p2",
    name: "Organic Cotton Oversized Tee",
    description: "Breathable, sustainable everyday essential",
    price: 799,
    originalPrice: 1299,
    category: "clothing",
    imageUrl: "/assets/generated/prod-tee.dim_400x400.jpg",
    rating: 4.3,
    reviewCount: 587,
    inStock: true
  },
  {
    id: "p3",
    name: "Cold-Press Mixed Berry Juice Pack",
    description: "6-pack of 250ml freshly pressed berry blends",
    price: 349,
    originalPrice: 420,
    category: "food",
    imageUrl: "/assets/generated/prod-juice.dim_400x400.jpg",
    rating: 4.7,
    reviewCount: 328,
    inStock: true
  },
  {
    id: "p4",
    name: "Slim-Fit Stretch Chinos",
    description: "Performance fabric with modern cut",
    price: 1299,
    originalPrice: 2199,
    category: "clothing",
    imageUrl: "/assets/generated/prod-chinos.dim_400x400.jpg",
    rating: 4.1,
    reviewCount: 412,
    inStock: true
  },
  {
    id: "p5",
    name: '4K Ultra-Wide Monitor 34"',
    description: "IPS panel, 144Hz refresh, USB-C power delivery",
    price: 28999,
    originalPrice: 38e3,
    category: "electronics",
    imageUrl: "/assets/generated/prod-monitor.dim_400x400.jpg",
    rating: 4.6,
    reviewCount: 876,
    inStock: false
  },
  {
    id: "p6",
    name: "Artisan Dark Roast Coffee Beans 500g",
    description: "Single-origin Ethiopian Yirgacheffe, freshly roasted",
    price: 649,
    category: "food",
    imageUrl: "/assets/generated/prod-coffee.dim_400x400.jpg",
    rating: 4.8,
    reviewCount: 1024,
    inStock: true
  },
  {
    id: "p7",
    name: "RGB Mechanical Gaming Keyboard",
    description: "Wireless, hot-swap switches, per-key lighting",
    price: 5499,
    originalPrice: 7999,
    category: "electronics",
    imageUrl: "/assets/generated/prod-keyboard.dim_400x400.jpg",
    rating: 4.4,
    reviewCount: 634,
    inStock: true
  },
  {
    id: "p8",
    name: "Floral Print Summer Dress",
    description: "Lightweight pastel fabric, perfect for warm days",
    price: 1199,
    originalPrice: 1999,
    category: "clothing",
    imageUrl: "/assets/generated/prod-dress.dim_400x400.jpg",
    rating: 4.2,
    reviewCount: 291,
    inStock: true
  },
  {
    id: "p9",
    name: "Artisan Granola Bars Variety Pack",
    description: "12-count assorted flavors, no artificial sugars",
    price: 499,
    originalPrice: 649,
    category: "food",
    imageUrl: "/assets/generated/prod-granola.dim_400x400.jpg",
    rating: 4.5,
    reviewCount: 482,
    inStock: true
  },
  {
    id: "p10",
    name: "Portable Bluetooth Speaker 360°",
    description: "Waterproof, 20-hour playtime, deep bass",
    price: 2299,
    originalPrice: 3499,
    category: "electronics",
    imageUrl: "/assets/generated/prod-speaker.dim_400x400.jpg",
    rating: 4.3,
    reviewCount: 719,
    inStock: true
  },
  {
    id: "p11",
    name: "Premium Leather Sneakers",
    description: "Handcrafted white leather with cushioned sole",
    price: 3499,
    originalPrice: 5499,
    category: "clothing",
    imageUrl: "/assets/generated/prod-sneakers.dim_400x400.jpg",
    rating: 4.6,
    reviewCount: 355,
    inStock: true
  },
  {
    id: "p12",
    name: "Fresh Tropical Fruit Bowl",
    description: "Hand-picked seasonal fruits, delivered fresh daily",
    price: 299,
    category: "food",
    imageUrl: "/assets/generated/prod-fruit-bowl.dim_400x400.jpg",
    rating: 4.9,
    reviewCount: 208,
    inStock: true
  }
];
function SearchBar({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-xl", "data-ocid": "search-bar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        type: "search",
        placeholder: "Search products…",
        value,
        onChange: (e) => onChange(e.target.value),
        className: "pl-9 pr-9 h-10 bg-card border-border focus:border-primary/50",
        "aria-label": "Search products",
        "data-ocid": "search-input"
      }
    ),
    value && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(""),
        "aria-label": "Clear search",
        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
        "data-ocid": "search-clear",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
      }
    )
  ] });
}
function EmptyState({
  search,
  category,
  onReset
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 text-center",
      "data-ocid": "products-empty-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg mb-1", children: "No products found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm max-w-xs mb-6", children: [
          search ? `No results for "${search}"${category !== "all" ? ` in ${category}` : ""}.` : `No products available in ${category}.`,
          " ",
          "Try adjusting your search or filters."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onReset, "data-ocid": "empty-state-reset", children: "Clear filters" })
      ]
    }
  );
}
function ProductGrid({ products }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
      "data-ocid": "products-grid",
      children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "animate-fade-in",
          style: { animationDelay: `${i * 60}ms`, animationFillMode: "both" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product })
        },
        product.id
      ))
    }
  );
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl overflow-hidden border border-border bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16 rounded-md" })
          ] })
        ] })
      ]
    },
    k
  )) });
}
function Home() {
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const { data: backendProducts, isLoading } = useProducts();
  const allProducts = (backendProducts == null ? void 0 : backendProducts.length) ? backendProducts : SAMPLE_PRODUCTS;
  const filtered = allProducts.filter((p) => activeCategory === "all" || p.category === activeCategory).filter(
    (p) => searchQuery.trim() === "" ? true : p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) || p.description.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const handleCategoryFromCard = (cat) => {
    var _a;
    setActiveCategory(cat);
    setSearchQuery("");
    (_a = document.getElementById("products")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  const handleReset = () => {
    setActiveCategory("all");
    setSearchQuery("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative bg-card border-b border-border overflow-hidden",
        id: "hero",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-14 md:py-22 flex flex-col md:flex-row items-center gap-10 md:gap-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-accent/15 text-accent-foreground border-accent/30 font-medium", children: "🎉 New Season Sale — Up to 60% off" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight text-balance mb-4", children: [
              "Shop Smarter,",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Live Better" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-6 max-w-md", children: "Discover thousands of products across fashion, electronics, and fresh food — all in one place." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SearchBar,
              {
                value: searchQuery,
                onChange: (v) => {
                  setSearchQuery(v);
                  if (v) {
                    setTimeout(() => {
                      var _a;
                      (_a = document.getElementById("products")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", asChild: true, "data-ocid": "hero-shop-cta", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#products", children: [
                "Shop Now ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-1.5" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  asChild: true,
                  "data-ocid": "hero-categories-cta",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#categories", children: "Browse Categories" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full md:w-80 lg:w-96 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-quickshop.dim_800x600.jpg",
              alt: "QuickShop — shop the best products",
              className: "w-full rounded-2xl shadow-elevated object-cover aspect-[4/3]"
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: PERKS.map(({ icon: Icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: desc })
      ] })
    ] }, title)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "categories",
        className: "bg-background py-12 border-b border-border",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-1", children: "Shop by Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Find exactly what you need" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: FEATURED_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleCategoryFromCard(cat.id),
              className: "group relative overflow-hidden rounded-2xl bg-card border border-border card-hover shadow-product aspect-[4/3] text-left w-full",
              "data-ocid": `category-card-${cat.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: cat.img,
                    alt: cat.label,
                    className: "absolute inset-0 w-full h-full object-cover transition-smooth group-hover:scale-105",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-smooth" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-white drop-shadow", children: cat.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm", children: cat.desc })
                ] })
              ]
            },
            cat.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "products", className: "bg-muted/20 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-0.5", children: "Featured Products" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: filtered.length > 0 ? `${filtered.length} product${filtered.length === 1 ? "" : "s"} found` : "Handpicked deals just for you" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CategoryFilter,
            {
              selected: activeCategory,
              onChange: setActiveCategory
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, { value: searchQuery, onChange: setSearchQuery }) })
      ] }),
      (searchQuery || activeCategory !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-wrap items-center gap-2 mb-5",
          "data-ocid": "active-filters",
          children: [
            searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "flex items-center gap-1.5 pl-3 pr-2 py-1 text-xs font-medium",
                children: [
                  'Search: "',
                  searchQuery,
                  '"',
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSearchQuery(""),
                      "aria-label": "Remove search filter",
                      className: "ml-0.5 rounded-full hover:bg-border transition-colors",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                    }
                  )
                ]
              }
            ),
            activeCategory !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "flex items-center gap-1.5 pl-3 pr-2 py-1 text-xs font-medium capitalize",
                children: [
                  activeCategory,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveCategory("all"),
                      "aria-label": "Remove category filter",
                      className: "ml-0.5 rounded-full hover:bg-border transition-colors",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleReset,
                className: "text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors",
                "data-ocid": "clear-all-filters",
                children: "Clear all"
              }
            )
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          search: searchQuery,
          category: activeCategory,
          onReset: handleReset
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGrid, { products: filtered })
    ] }) })
  ] });
}
export {
  Home as default
};
