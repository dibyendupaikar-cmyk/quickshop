import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useBackend";
import type { Category, Product } from "@/types/index";
import {
  ArrowRight,
  Headphones,
  PackageSearch,
  Search,
  ShieldCheck,
  Tag,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";

// ─── Static data ─────────────────────────────────────────────────────────────

const FEATURED_CATEGORIES = [
  {
    id: "clothing" as Category,
    label: "Fashion",
    desc: "Trendy styles for every occasion",
    img: "/assets/generated/cat-clothing.dim_600x450.jpg",
  },
  {
    id: "electronics" as Category,
    label: "Electronics",
    desc: "Latest gadgets & tech",
    img: "/assets/generated/cat-electronics.dim_600x450.jpg",
  },
  {
    id: "food" as Category,
    label: "Fresh Food",
    desc: "Organic, farm-fresh produce",
    img: "/assets/generated/cat-food.dim_600x450.jpg",
  },
];

const PERKS = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above ₹499" },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "100% safe transactions",
  },
  { icon: Tag, title: "Best Prices", desc: "Lowest price guarantee" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
];

const SKELETON_KEYS = [
  "sk-a",
  "sk-b",
  "sk-c",
  "sk-d",
  "sk-e",
  "sk-f",
  "sk-g",
  "sk-h",
];

const SAMPLE_PRODUCTS: Product[] = [
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
    inStock: true,
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
    inStock: true,
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
    inStock: true,
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
    inStock: true,
  },
  {
    id: "p5",
    name: '4K Ultra-Wide Monitor 34"',
    description: "IPS panel, 144Hz refresh, USB-C power delivery",
    price: 28999,
    originalPrice: 38000,
    category: "electronics",
    imageUrl: "/assets/generated/prod-monitor.dim_400x400.jpg",
    rating: 4.6,
    reviewCount: 876,
    inStock: false,
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
    inStock: true,
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
    inStock: true,
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
    inStock: true,
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
    inStock: true,
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
    inStock: true,
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
    inStock: true,
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
    inStock: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full max-w-xl" data-ocid="search-bar">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        placeholder="Search products…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-9 h-10 bg-card border-border focus:border-primary/50"
        aria-label="Search products"
        data-ocid="search-input"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="search-clear"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

function EmptyState({
  search,
  category,
  onReset,
}: {
  search: string;
  category: Category;
  onReset: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center"
      data-ocid="products-empty-state"
    >
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <PackageSearch className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-display font-semibold text-foreground text-lg mb-1">
        No products found
      </h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-6">
        {search
          ? `No results for "${search}"${category !== "all" ? ` in ${category}` : ""}.`
          : `No products available in ${category}.`}{" "}
        Try adjusting your search or filters.
      </p>
      <Button variant="outline" onClick={onReset} data-ocid="empty-state-reset">
        Clear filters
      </Button>
    </div>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      data-ocid="products-grid"
    >
      {products.map((product, i) => (
        <div
          key={product.id}
          className="animate-fade-in"
          style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {SKELETON_KEYS.map((k) => (
        <div
          key={k}
          className="rounded-xl overflow-hidden border border-border bg-card"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <div className="flex items-center justify-between pt-1">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: backendProducts, isLoading } = useProducts();

  const allProducts = backendProducts?.length
    ? backendProducts
    : SAMPLE_PRODUCTS;

  const filtered = allProducts
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter((p) =>
      searchQuery.trim() === ""
        ? true
        : p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          p.description
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()),
    );

  const handleCategoryFromCard = (cat: Category) => {
    setActiveCategory(cat);
    setSearchQuery("");
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReset = () => {
    setActiveCategory("all");
    setSearchQuery("");
  };

  return (
    <div className="animate-fade-in">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-card border-b border-border overflow-hidden"
        id="hero"
      >
        <div className="container py-14 md:py-22 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 min-w-0">
            <Badge className="mb-4 bg-accent/15 text-accent-foreground border-accent/30 font-medium">
              🎉 New Season Sale — Up to 60% off
            </Badge>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight text-balance mb-4">
              Shop Smarter,
              <br />
              <span className="text-primary">Live Better</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6 max-w-md">
              Discover thousands of products across fashion, electronics, and
              fresh food — all in one place.
            </p>

            {/* Search bar inside hero for prominent placement */}
            <div className="mb-6 max-w-md">
              <SearchBar
                value={searchQuery}
                onChange={(v) => {
                  setSearchQuery(v);
                  if (v) {
                    setTimeout(() => {
                      document
                        .getElementById("products")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild data-ocid="hero-shop-cta">
                <a href="#products">
                  Shop Now <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                data-ocid="hero-categories-cta"
              >
                <a href="#categories">Browse Categories</a>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-80 lg:w-96 shrink-0">
            <img
              src="/assets/generated/hero-quickshop.dim_800x600.jpg"
              alt="QuickShop — shop the best products"
              className="w-full rounded-2xl shadow-elevated object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* ── Perks ────────────────────────────────────────────────────────── */}
      <section className="bg-muted/30 border-b border-border">
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 py-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section
        id="categories"
        className="bg-background py-12 border-b border-border"
      >
        <div className="container">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-1">
            Shop by Category
          </h2>
          <p className="text-muted-foreground mb-8">
            Find exactly what you need
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURED_CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => handleCategoryFromCard(cat.id)}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border card-hover shadow-product aspect-[4/3] text-left w-full"
                data-ocid={`category-card-${cat.id}`}
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover transition-smooth group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-smooth" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display font-bold text-xl text-white drop-shadow">
                    {cat.label}
                  </p>
                  <p className="text-white/80 text-sm">{cat.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────────── */}
      <section id="products" className="bg-muted/20 py-12">
        <div className="container">
          {/* Header row */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-0.5">
                  Featured Products
                </h2>
                <p className="text-muted-foreground text-sm">
                  {filtered.length > 0
                    ? `${filtered.length} product${filtered.length === 1 ? "" : "s"} found`
                    : "Handpicked deals just for you"}
                </p>
              </div>
              <CategoryFilter
                selected={activeCategory}
                onChange={setActiveCategory}
              />
            </div>

            {/* Search bar — secondary position below header on mobile */}
            <div className="sm:hidden">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          {/* Active filter chips */}
          {(searchQuery || activeCategory !== "all") && (
            <div
              className="flex flex-wrap items-center gap-2 mb-5"
              data-ocid="active-filters"
            >
              {searchQuery && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 pl-3 pr-2 py-1 text-xs font-medium"
                >
                  Search: "{searchQuery}"
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Remove search filter"
                    className="ml-0.5 rounded-full hover:bg-border transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {activeCategory !== "all" && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 pl-3 pr-2 py-1 text-xs font-medium capitalize"
                >
                  {activeCategory}
                  <button
                    type="button"
                    onClick={() => setActiveCategory("all")}
                    aria-label="Remove category filter"
                    className="ml-0.5 rounded-full hover:bg-border transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors"
                data-ocid="clear-all-filters"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Grid / Skeleton / Empty */}
          {isLoading ? (
            <SkeletonGrid />
          ) : filtered.length === 0 ? (
            <EmptyState
              search={searchQuery}
              category={activeCategory}
              onReset={handleReset}
            />
          ) : (
            <ProductGrid products={filtered} />
          )}
        </div>
      </section>
    </div>
  );
}
