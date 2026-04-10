import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useAddReview,
  useProduct,
  useProductReviews,
} from "@/hooks/useBackend";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Interactive Star Picker ─────────────────────────────────────────────────

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <fieldset className="flex gap-1 border-0 p-0 m-0">
      <legend className="sr-only">Star rating picker</legend>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n !== 1 ? "s" : ""}`}
          className="p-0.5 transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
        >
          <Star
            className={`w-6 h-6 transition-colors duration-150 ${
              n <= active
                ? "text-accent fill-accent"
                : "text-muted-foreground/30 fill-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </fieldset>
  );
}

// ─── Review Card ─────────────────────────────────────────────────────────────

function ReviewCard({
  author,
  rating,
  comment,
  date,
  index,
}: {
  author: string;
  rating: number;
  comment: string;
  date: number;
  index: number;
}) {
  const truncated =
    author.length > 20 ? `${author.slice(0, 8)}…${author.slice(-6)}` : author;
  const formatted = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="bg-card border border-border rounded-xl p-4 space-y-2"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary uppercase">
              {truncated[0]}
            </span>
          </div>
          <span
            className="text-sm font-medium text-foreground truncate font-mono"
            title={author}
          >
            {truncated}
          </span>
        </div>
        <span className="text-xs text-muted-foreground shrink-0">
          {formatted}
        </span>
      </div>
      <StarRating rating={rating} size="sm" />
      <p className="text-sm text-muted-foreground leading-relaxed">{comment}</p>
    </motion.div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function ProductSkeleton() {
  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <Skeleton className="h-5 w-48 mb-8" />
      <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
        <Skeleton className="aspect-square rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-5 w-28" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>
        </div>
      </div>
      <div className="mt-12 space-y-4">
        <Skeleton className="h-7 w-40" />
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductDetail() {
  const { id } = useParams({ from: "/products/$id" });
  const { data: product, isLoading } = useProduct(id);
  const { data: reviews = [], isLoading: reviewsLoading } =
    useProductReviews(id);
  const addReviewMutation = useAddReview();

  const addToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(id));

  const { identity, isAuthenticated, login } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  if (isLoading) return <ProductSkeleton />;

  if (!product) {
    return (
      <div
        className="container py-24 text-center max-w-md mx-auto"
        data-ocid="pdp-not-found"
      >
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          Product Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          This product may have been removed or the link is incorrect.
        </p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const discountPct =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success("Added to cart", {
      description: `${quantity}× ${product.name}`,
    });
  };

  const handleSubmitReview = async () => {
    if (!reviewRating) {
      toast.error("Please select a star rating");
      return;
    }
    if (!reviewComment.trim()) {
      toast.error("Please write a comment");
      return;
    }
    setSubmittingReview(true);
    try {
      await addReviewMutation.mutateAsync({
        productId: id,
        rating: reviewRating,
        comment: reviewComment.trim(),
        userName: identity?.getPrincipal().toText() ?? "Anonymous",
      });
      toast.success("Review submitted!");
      setReviewRating(0);
      setReviewComment("");
    } catch {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const categoryLabel =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div className="container py-6 md:py-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap"
        aria-label="Breadcrumb"
      >
        <Link
          to="/"
          className="hover:text-foreground transition-colors duration-200 flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="hover:text-foreground transition-colors duration-200 capitalize">
          {categoryLabel}
        </span>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </motion.nav>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full aspect-square object-cover rounded-2xl shadow-product border border-border"
          />
          {discountPct && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground font-bold text-sm px-3 py-1 shadow-sm">
              -{discountPct}%
            </Badge>
          )}
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
          className="flex flex-col gap-5"
        >
          {/* Category + Name */}
          <div>
            <Badge
              variant="secondary"
              className="mb-2 capitalize"
              data-ocid="pdp-category-badge"
            >
              {categoryLabel}
            </Badge>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground text-balance leading-tight mb-3">
              {product.name}
            </h1>
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="md"
            />
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-display font-extrabold text-3xl text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            {discountPct && (
              <span className="text-sm font-semibold text-accent">
                {discountPct}% off
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="flex items-center gap-2" data-ocid="pdp-stock-status">
            {product.inStock ? (
              <span className="flex items-center gap-1.5 text-sm font-medium text-green-600 dark:text-green-400">
                <CheckCircle className="w-4 h-4" />
                In Stock
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-medium text-destructive">
                <XCircle className="w-4 h-4" />
                Out of Stock
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">Qty:</span>
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                type="button"
                className="px-3 py-2 hover:bg-muted transition-colors duration-150 disabled:opacity-40"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                data-ocid="pdp-qty-decrease"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span
                className="px-4 py-2 text-sm font-semibold min-w-[2.5rem] text-center"
                data-ocid="pdp-qty-value"
              >
                {quantity}
              </span>
              <button
                type="button"
                className="px-3 py-2 hover:bg-muted transition-colors duration-150 disabled:opacity-40"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                disabled={quantity >= 10}
                aria-label="Increase quantity"
                data-ocid="pdp-qty-increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button
              size="lg"
              className="flex-1 transition-smooth"
              disabled={!product.inStock}
              onClick={handleAddToCart}
              data-ocid="pdp-add-to-cart"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="transition-smooth"
              onClick={() => {
                toggleWishlist(product);
                toast(
                  isWishlisted ? "Removed from wishlist" : "Saved to wishlist",
                );
              }}
              aria-label="Toggle wishlist"
              data-ocid="pdp-wishlist-btn"
            >
              <Heart
                className="w-4 h-4"
                fill={isWishlisted ? "currentColor" : "none"}
                color={isWishlisted ? "var(--destructive)" : undefined}
              />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-14"
        aria-labelledby="reviews-heading"
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            id="reviews-heading"
            className="font-display font-bold text-xl text-foreground"
          >
            Reviews
            {reviews.length > 0 && (
              <span className="ml-2 text-base font-normal text-muted-foreground">
                ({reviews.length})
              </span>
            )}
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRating
                rating={product.rating}
                size="md"
                reviewCount={product.reviewCount}
              />
            </div>
          )}
        </div>

        {/* Review List */}
        {reviewsLoading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-muted/40 border border-border rounded-xl py-12 text-center"
            data-ocid="reviews-empty-state"
          >
            <div className="text-3xl mb-3">⭐</div>
            <p className="font-medium text-foreground mb-1">No reviews yet</p>
            <p className="text-sm text-muted-foreground">
              Be the first to share your experience!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {reviews.map((review, i) => (
              <ReviewCard
                key={review.id}
                author={review.userId}
                rating={review.rating}
                comment={review.comment}
                date={review.createdAt}
                index={i}
              />
            ))}
          </div>
        )}

        {/* Submit Review */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-8 bg-card border border-border rounded-2xl p-6"
          data-ocid="pdp-review-form-section"
        >
          <h3 className="font-display font-semibold text-lg text-foreground mb-4">
            Write a Review
          </h3>

          {isAuthenticated ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Your Rating
                </p>
                <StarPicker value={reviewRating} onChange={setReviewRating} />
              </div>
              <div>
                <label
                  htmlFor="review-comment"
                  className="text-sm font-medium text-foreground block mb-2"
                >
                  Your Comment
                </label>
                <Textarea
                  id="review-comment"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your thoughts about this product…"
                  rows={4}
                  maxLength={500}
                  className="resize-none"
                  data-ocid="pdp-review-comment"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {reviewComment.length}/500
                </p>
              </div>
              <Button
                onClick={handleSubmitReview}
                disabled={
                  submittingReview || !reviewRating || !reviewComment.trim()
                }
                data-ocid="pdp-review-submit"
              >
                {submittingReview ? "Submitting…" : "Submit Review"}
              </Button>
            </div>
          ) : (
            <div
              className="text-center py-6 space-y-3"
              data-ocid="pdp-review-auth-prompt"
            >
              <p className="text-sm text-muted-foreground">
                Sign in to share your review and help others decide.
              </p>
              <Button
                variant="outline"
                onClick={() => login()}
                data-ocid="pdp-review-login-btn"
              >
                Sign In to Review
              </Button>
            </div>
          )}
        </motion.div>
      </motion.section>
    </div>
  );
}
