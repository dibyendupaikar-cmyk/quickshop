import { j as jsxRuntimeExports, b as useWishlistStore, u as useCartStore, H as Heart, d as Button, L as Link, B as Badge, e as ShoppingCart } from "./index-BcEEdqxz.js";
import { P as ProtectedRoute } from "./ProtectedRoute-D9C9-ghI.js";
import { S as StarRating } from "./StarRating-KPMqp45i.js";
import { u as ue } from "./index-BCkbE-xZ.js";
import { m as motion } from "./proxy-B7DDjsQP.js";
import { A as AnimatePresence } from "./index-D5os95nZ.js";
import { T as Trash2 } from "./trash-2-LeF-WNHH.js";
function WishlistCard({ product, onRemove, onAddToCart }) {
  const discountPct = product.originalPrice && product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: { duration: 0.22, ease: "easeOut" },
      className: "bg-card border border-border rounded-xl overflow-hidden card-hover shadow-product group",
      "data-ocid": "wishlist-item",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/products/$id",
            params: { id: product.id },
            className: "block relative aspect-square overflow-hidden bg-muted",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.imageUrl,
                  alt: product.name,
                  className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
                  loading: "lazy"
                }
              ),
              discountPct && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-2 left-2 bg-accent text-accent-foreground font-semibold text-xs px-2 py-0.5", children: [
                "-",
                discountPct,
                "%"
              ] }),
              !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs font-semibold", children: "Out of Stock" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground capitalize mb-0.5", children: product.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products/$id",
              params: { id: product.id },
              className: "block font-display font-semibold text-sm text-foreground line-clamp-2 leading-snug mb-1.5 hover:text-primary transition-smooth",
              children: product.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StarRating,
            {
              rating: product.rating,
              reviewCount: product.reviewCount,
              size: "sm",
              className: "mb-2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-foreground", children: [
              "₹",
              product.price.toLocaleString()
            ] }),
            product.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
              "₹",
              product.originalPrice.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "flex-1 h-8 text-xs",
                onClick: () => onAddToCart(product),
                disabled: !product.inStock,
                "data-ocid": "wishlist-add-to-cart-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3.5 h-3.5 mr-1.5", "aria-hidden": "true" }),
                  "Add to Cart"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onRemove(product.id),
                "aria-label": `Remove ${product.name} from wishlist`,
                className: "w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-smooth",
                "data-ocid": "wishlist-item-remove",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function WishlistContents() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);
  const handleAddToCart = (product) => {
    addToCart(product);
    ue.success("Added to cart", {
      description: product.name,
      duration: 2500
    });
  };
  const handleRemove = (productId) => {
    removeItem(productId);
    ue("Removed from wishlist");
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "container py-20 flex flex-col items-center gap-6 text-center",
        "data-ocid": "empty-wishlist",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-12 h-12 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Your wishlist is empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-xs", children: "Save items you love so you can easily find and purchase them later." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", "data-ocid": "wishlist-browse-cta", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Browse Products" }) })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl md:text-3xl text-foreground", children: [
      "Wishlist",
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-3 text-sm font-medium", children: [
        items.length,
        " ",
        items.length === 1 ? "item" : "items"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4",
        layout: true,
        children: items.map(({ product }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          WishlistCard,
          {
            product,
            onRemove: handleRemove,
            onAddToCart: handleAddToCart
          },
          product.id
        ))
      }
    ) })
  ] });
}
function WishlistPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(WishlistContents, {}) });
}
export {
  WishlistPage as default
};
