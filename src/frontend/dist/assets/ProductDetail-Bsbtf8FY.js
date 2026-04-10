import { c as createLucideIcon, f as useParams, u as useCartStore, b as useWishlistStore, g as useAuth, r as reactExports, j as jsxRuntimeExports, d as Button, L as Link, B as Badge, e as ShoppingCart, H as Heart } from "./index-BcEEdqxz.js";
import { S as StarRating, a as Star } from "./StarRating-KPMqp45i.js";
import { S as Skeleton } from "./skeleton-CwPIWZmi.js";
import { T as Textarea } from "./textarea-Ib6gRL0p.js";
import { a as useProduct, b as useProductReviews, c as useAddReview } from "./useBackend-5NC4LJso.js";
import { u as ue } from "./index-BCkbE-xZ.js";
import { m as motion } from "./proxy-B7DDjsQP.js";
import { A as ArrowLeft } from "./arrow-left-B_3SztlY.js";
import { C as ChevronRight } from "./chevron-right-y2NMtARk.js";
import { M as Minus } from "./minus-DxD6iStV.js";
import { P as Plus } from "./plus-BhGbtoFf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function StarPicker({
  value,
  onChange
}) {
  const [hovered, setHovered] = reactExports.useState(0);
  const active = hovered || value;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "flex gap-1 border-0 p-0 m-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Star rating picker" }),
    [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": `${n} star${n !== 1 ? "s" : ""}`,
        className: "p-0.5 transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
        onMouseEnter: () => setHovered(n),
        onMouseLeave: () => setHovered(0),
        onClick: () => onChange(n),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            className: `w-6 h-6 transition-colors duration-150 ${n <= active ? "text-accent fill-accent" : "text-muted-foreground/30 fill-muted-foreground/30"}`
          }
        )
      },
      n
    ))
  ] });
}
function ReviewCard({
  author,
  rating,
  comment,
  date,
  index
}) {
  const truncated = author.length > 20 ? `${author.slice(0, 8)}…${author.slice(-6)}` : author;
  const formatted = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: index * 0.07 },
      className: "bg-card border border-border rounded-xl p-4 space-y-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary uppercase", children: truncated[0] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-sm font-medium text-foreground truncate font-mono",
                title: author,
                children: truncated
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: formatted })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating, size: "sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: comment })
      ]
    }
  );
}
function ProductSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48 mb-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 lg:gap-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-40" }),
      [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }, i))
    ] })
  ] });
}
function ProductDetail() {
  const { id } = useParams({ from: "/products/$id" });
  const { data: product, isLoading } = useProduct(id);
  const { data: reviews = [], isLoading: reviewsLoading } = useProductReviews(id);
  const addReviewMutation = useAddReview();
  const addToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(id));
  const { identity, isAuthenticated, login } = useAuth();
  const [quantity, setQuantity] = reactExports.useState(1);
  const [reviewRating, setReviewRating] = reactExports.useState(0);
  const [reviewComment, setReviewComment] = reactExports.useState("");
  const [submittingReview, setSubmittingReview] = reactExports.useState(false);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSkeleton, {});
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container py-24 text-center max-w-md mx-auto",
        "data-ocid": "pdp-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Product Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This product may have been removed or the link is incorrect." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Back to Home" }) })
        ]
      }
    );
  }
  const discountPct = product.originalPrice && product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    ue.success("Added to cart", {
      description: `${quantity}× ${product.name}`
    });
  };
  const handleSubmitReview = async () => {
    if (!reviewRating) {
      ue.error("Please select a star rating");
      return;
    }
    if (!reviewComment.trim()) {
      ue.error("Please write a comment");
      return;
    }
    setSubmittingReview(true);
    try {
      await addReviewMutation.mutateAsync({
        productId: id,
        rating: reviewRating,
        comment: reviewComment.trim(),
        userName: (identity == null ? void 0 : identity.getPrincipal().toText()) ?? "Anonymous"
      });
      ue.success("Review submitted!");
      setReviewRating(0);
      setReviewComment("");
    } catch {
      ue.error("Failed to submit review. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };
  const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-6 md:py-10 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.nav,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        className: "flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap",
        "aria-label": "Breadcrumb",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "hover:text-foreground transition-colors duration-200 flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                "Home"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hover:text-foreground transition-colors duration-200 capitalize", children: categoryLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[200px]", children: product.name })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 lg:gap-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.45, ease: "easeOut" },
          className: "relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: product.imageUrl,
                alt: product.name,
                className: "w-full aspect-square object-cover rounded-2xl shadow-product border border-border"
              }
            ),
            discountPct && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-4 left-4 bg-accent text-accent-foreground font-bold text-sm px-3 py-1 shadow-sm", children: [
              "-",
              discountPct,
              "%"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.45, ease: "easeOut", delay: 0.08 },
          className: "flex flex-col gap-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "mb-2 capitalize",
                  "data-ocid": "pdp-category-badge",
                  children: categoryLabel
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl text-foreground text-balance leading-tight mb-3", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StarRating,
                {
                  rating: product.rating,
                  reviewCount: product.reviewCount,
                  size: "md"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-extrabold text-3xl text-foreground", children: [
                "₹",
                product.price.toLocaleString()
              ] }),
              product.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg text-muted-foreground line-through", children: [
                "₹",
                product.originalPrice.toLocaleString()
              ] }),
              discountPct && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-accent", children: [
                discountPct,
                "% off"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm md:text-base", children: product.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", "data-ocid": "pdp-stock-status", children: product.inStock ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm font-medium text-green-600 dark:text-green-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
              "In Stock"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm font-medium text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
              "Out of Stock"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Qty:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-lg overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "px-3 py-2 hover:bg-muted transition-colors duration-150 disabled:opacity-40",
                    onClick: () => setQuantity((q) => Math.max(1, q - 1)),
                    disabled: quantity <= 1,
                    "aria-label": "Decrease quantity",
                    "data-ocid": "pdp-qty-decrease",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "px-4 py-2 text-sm font-semibold min-w-[2.5rem] text-center",
                    "data-ocid": "pdp-qty-value",
                    children: quantity
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "px-3 py-2 hover:bg-muted transition-colors duration-150 disabled:opacity-40",
                    onClick: () => setQuantity((q) => Math.min(10, q + 1)),
                    disabled: quantity >= 10,
                    "aria-label": "Increase quantity",
                    "data-ocid": "pdp-qty-increase",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "flex-1 transition-smooth",
                  disabled: !product.inStock,
                  onClick: handleAddToCart,
                  "data-ocid": "pdp-add-to-cart",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 mr-2" }),
                    "Add to Cart"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "transition-smooth",
                  onClick: () => {
                    toggleWishlist(product);
                    ue(
                      isWishlisted ? "Removed from wishlist" : "Saved to wishlist"
                    );
                  },
                  "aria-label": "Toggle wishlist",
                  "data-ocid": "pdp-wishlist-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Heart,
                    {
                      className: "w-4 h-4",
                      fill: isWishlisted ? "currentColor" : "none",
                      color: isWishlisted ? "var(--destructive)" : void 0
                    }
                  )
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.25 },
        className: "mt-14",
        "aria-labelledby": "reviews-heading",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h2",
              {
                id: "reviews-heading",
                className: "font-display font-bold text-xl text-foreground",
                children: [
                  "Reviews",
                  reviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-base font-normal text-muted-foreground", children: [
                    "(",
                    reviews.length,
                    ")"
                  ] })
                ]
              }
            ),
            reviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              StarRating,
              {
                rating: product.rating,
                size: "md",
                reviewCount: product.reviewCount
              }
            ) })
          ] }),
          reviewsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }, i)) }) : reviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.3 },
              className: "bg-muted/40 border border-border rounded-xl py-12 text-center",
              "data-ocid": "reviews-empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-3", children: "⭐" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No reviews yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Be the first to share your experience!" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: reviews.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReviewCard,
            {
              author: review.userId,
              rating: review.rating,
              comment: review.comment,
              date: review.createdAt,
              index: i
            },
            review.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.35 },
              className: "mt-8 bg-card border border-border rounded-2xl p-6",
              "data-ocid": "pdp-review-form-section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-4", children: "Write a Review" }),
                isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-2", children: "Your Rating" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StarPicker, { value: reviewRating, onChange: setReviewRating })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "review-comment",
                        className: "text-sm font-medium text-foreground block mb-2",
                        children: "Your Comment"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "review-comment",
                        value: reviewComment,
                        onChange: (e) => setReviewComment(e.target.value),
                        placeholder: "Share your thoughts about this product…",
                        rows: 4,
                        maxLength: 500,
                        className: "resize-none",
                        "data-ocid": "pdp-review-comment"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 text-right", children: [
                      reviewComment.length,
                      "/500"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: handleSubmitReview,
                      disabled: submittingReview || !reviewRating || !reviewComment.trim(),
                      "data-ocid": "pdp-review-submit",
                      children: submittingReview ? "Submitting…" : "Submit Review"
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "text-center py-6 space-y-3",
                    "data-ocid": "pdp-review-auth-prompt",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign in to share your review and help others decide." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "outline",
                          onClick: () => login(),
                          "data-ocid": "pdp-review-login-btn",
                          children: "Sign In to Review"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  ProductDetail as default
};
