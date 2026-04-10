import { ProtectedRoute } from "@/components/ProtectedRoute";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types/index";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

interface WishlistCardProps {
  product: Product;
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

function WishlistCard({ product, onRemove, onAddToCart }: WishlistCardProps) {
  const discountPct =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="bg-card border border-border rounded-xl overflow-hidden card-hover shadow-product group"
      data-ocid="wishlist-item"
    >
      {/* Image */}
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="block relative aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
        />
        {discountPct && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground font-semibold text-xs px-2 py-0.5">
            -{discountPct}%
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
            <Badge variant="secondary" className="text-xs font-semibold">
              Out of Stock
            </Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3">
        <p className="text-xs text-muted-foreground capitalize mb-0.5">
          {product.category}
        </p>
        <Link
          to="/products/$id"
          params={{ id: product.id }}
          className="block font-display font-semibold text-sm text-foreground line-clamp-2 leading-snug mb-1.5 hover:text-primary transition-smooth"
        >
          {product.name}
        </Link>
        <StarRating
          rating={product.rating}
          reviewCount={product.reviewCount}
          size="sm"
          className="mb-2"
        />

        {/* Price row */}
        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="font-display font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 h-8 text-xs"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            data-ocid="wishlist-add-to-cart-btn"
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
            Add to Cart
          </Button>
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label={`Remove ${product.name} from wishlist`}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-smooth"
            data-ocid="wishlist-item-remove"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function WishlistContents() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success("Added to cart", {
      description: product.name,
      duration: 2500,
    });
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
    toast("Removed from wishlist");
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-20 flex flex-col items-center gap-6 text-center"
        data-ocid="empty-wishlist"
      >
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
          <Heart className="w-12 h-12 text-muted-foreground" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xs">
            Save items you love so you can easily find and purchase them later.
          </p>
          <Button asChild size="lg" data-ocid="wishlist-browse-cta">
            <Link to="/">Browse Products</Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">
          Wishlist
          <Badge variant="secondary" className="ml-3 text-sm font-medium">
            {items.length} {items.length === 1 ? "item" : "items"}
          </Badge>
        </h1>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          layout
        >
          {items.map(({ product }) => (
            <WishlistCard
              key={product.id}
              product={product}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function WishlistPage() {
  return (
    <ProtectedRoute>
      <WishlistContents />
    </ProtectedRoute>
  );
}
