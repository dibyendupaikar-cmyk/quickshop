import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types/index";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { StarRating } from "./StarRating";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  const discountPct =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success("Added to cart", {
      description: product.name,
      duration: 2500,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      description: product.name,
      duration: 2000,
    });
  };

  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className={cn(
        "group block bg-card rounded-xl overflow-hidden border border-border",
        "card-hover shadow-product",
        className,
      )}
      data-ocid="product-card"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
        />
        {/* Discount badge */}
        {discountPct && (
          <Badge
            className="absolute top-2 left-2 bg-accent text-accent-foreground font-semibold text-xs px-2 py-0.5"
            data-ocid="discount-badge"
          >
            -{discountPct}%
          </Badge>
        )}
        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          data-ocid="wishlist-toggle"
          className={cn(
            "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center",
            "bg-card/80 backdrop-blur-sm border border-border transition-smooth",
            "hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isWishlisted ? "text-destructive" : "text-muted-foreground",
          )}
        >
          <Heart
            className="w-4 h-4"
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
            <Badge variant="secondary" className="text-sm font-semibold">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-xs text-muted-foreground capitalize mb-1">
          {product.category}
        </p>
        <h3 className="font-display font-semibold text-sm text-foreground line-clamp-2 leading-snug mb-1.5">
          {product.name}
        </h3>
        <StarRating
          rating={product.rating}
          reviewCount={product.reviewCount}
          size="sm"
          className="mb-2"
        />
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-foreground">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <Button
            size="sm"
            variant="default"
            className="shrink-0 h-8 px-3 text-xs"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
            data-ocid="add-to-cart-btn"
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
}
