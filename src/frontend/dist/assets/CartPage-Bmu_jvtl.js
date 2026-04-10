import { j as jsxRuntimeExports, u as useCartStore, r as reactExports, d as Button, L as Link, B as Badge, X } from "./index-BcEEdqxz.js";
import { P as ProtectedRoute } from "./ProtectedRoute-D9C9-ghI.js";
import { I as Input } from "./input-BuzKrnlF.js";
import { S as Separator } from "./separator-BvfAzWk8.js";
import { d as useValidateCoupon } from "./useBackend-5NC4LJso.js";
import { u as ue } from "./index-BCkbE-xZ.js";
import { m as motion } from "./proxy-B7DDjsQP.js";
import { S as ShoppingBag } from "./shopping-bag-CQzdUjou.js";
import { A as AnimatePresence } from "./index-D5os95nZ.js";
import { M as Minus } from "./minus-DxD6iStV.js";
import { P as Plus } from "./plus-BhGbtoFf.js";
import { T as Trash2 } from "./trash-2-LeF-WNHH.js";
import { T as Tag } from "./tag-DRXBsinr.js";
import "./index-CSz3IhE1.js";
function CartContents() {
  const { items, removeItem, updateQuantity, total, clearCart, itemCount } = useCartStore();
  const [couponCode, setCouponCode] = reactExports.useState("");
  const [appliedCoupon, setAppliedCoupon] = reactExports.useState(null);
  const validateCoupon = useValidateCoupon();
  const subtotal = total();
  const discount = appliedCoupon ? appliedCoupon.discountType === "percentage" ? Math.round(subtotal * appliedCoupon.discountValue / 100) : appliedCoupon.discountValue : 0;
  const finalTotal = Math.max(0, subtotal - discount);
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const coupon = await validateCoupon.mutateAsync(
        couponCode.trim().toUpperCase()
      );
      if (coupon == null ? void 0 : coupon.isActive) {
        if (subtotal < coupon.minOrderAmount) {
          ue.error("Coupon not applicable", {
            description: `Minimum order amount is ₹${coupon.minOrderAmount.toLocaleString()}`
          });
          return;
        }
        setAppliedCoupon(coupon);
        ue.success("Coupon applied!", {
          description: `You saved ₹${coupon.discountType === "percentage" ? Math.round(subtotal * coupon.discountValue / 100) : coupon.discountValue}`
        });
      } else {
        ue.error("Invalid coupon", {
          description: "This coupon code is not valid or has expired."
        });
      }
    } catch {
      ue.error("Failed to validate coupon");
    }
  };
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    ue("Coupon removed");
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "container py-20 flex flex-col items-center gap-6 text-center",
        "data-ocid": "empty-cart",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-12 h-12 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Your cart is empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-xs", children: "Looks like you haven't added anything yet. Discover amazing products and fill your cart!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", "data-ocid": "cart-shop-cta", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Start Shopping" }) })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl md:text-3xl text-foreground", children: [
        "Shopping Cart",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-3 text-sm font-medium", children: [
          itemCount(),
          " ",
          itemCount() === 1 ? "item" : "items"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: clearCart,
          className: "text-sm text-muted-foreground hover:text-destructive transition-smooth hidden md:block",
          "data-ocid": "clear-cart-btn",
          children: "Clear all"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: items.map(({ product, quantity }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            layout: true,
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 20, height: 0 },
            transition: { duration: 0.25, ease: "easeOut" },
            className: "flex gap-4 bg-card border border-border rounded-xl p-4",
            "data-ocid": "cart-item",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/products/$id",
                  params: { id: product.id },
                  className: "shrink-0",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: product.imageUrl,
                      alt: product.name,
                      className: "w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-border transition-smooth hover:opacity-80"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground capitalize mb-0.5", children: product.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/products/$id",
                    params: { id: product.id },
                    className: "font-semibold text-foreground hover:text-primary transition-smooth line-clamp-2 text-sm leading-snug block",
                    children: product.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground mt-1.5 text-base", children: [
                  "₹",
                  product.price.toLocaleString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3 md:hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-lg overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updateQuantity(product.id, quantity - 1),
                        className: "p-2 hover:bg-muted transition-smooth",
                        "aria-label": "Decrease quantity",
                        "data-ocid": "cart-qty-decrease",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-8 text-center text-sm font-semibold",
                        "data-ocid": "cart-qty-value",
                        children: quantity
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updateQuantity(product.id, quantity + 1),
                        className: "p-2 hover:bg-muted transition-smooth",
                        "aria-label": "Increase quantity",
                        "data-ocid": "cart-qty-increase",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeItem(product.id),
                      className: "text-muted-foreground hover:text-destructive transition-smooth p-1",
                      "aria-label": `Remove ${product.name}`,
                      "data-ocid": "cart-item-remove",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex flex-col items-end gap-3 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeItem(product.id),
                    className: "text-muted-foreground hover:text-destructive transition-smooth",
                    "aria-label": `Remove ${product.name} from cart`,
                    "data-ocid": "cart-item-remove",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-lg overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(product.id, quantity - 1),
                      className: "p-2 hover:bg-muted transition-smooth",
                      "aria-label": "Decrease quantity",
                      "data-ocid": "cart-qty-decrease",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-8 text-center text-sm font-semibold",
                      "data-ocid": "cart-qty-value",
                      children: quantity
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(product.id, quantity + 1),
                      className: "p-2 hover:bg-muted transition-smooth",
                      "aria-label": "Increase quantity",
                      "data-ocid": "cart-qty-increase",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                  "₹",
                  (product.price * quantity).toLocaleString()
                ] })
              ] })
            ]
          },
          product.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: clearCart,
            className: "text-sm text-muted-foreground hover:text-destructive transition-smooth mt-1 md:hidden",
            "data-ocid": "clear-cart-btn-mobile",
            children: "Clear all items"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "bg-card border border-border rounded-xl p-6 h-fit sticky top-24",
          "data-ocid": "cart-summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-4", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", "data-ocid": "coupon-section", children: appliedCoupon ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 bg-accent/10 border border-accent/30 rounded-lg px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-accent shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground truncate", children: appliedCoupon.code })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleRemoveCoupon,
                  "aria-label": "Remove coupon",
                  className: "text-muted-foreground hover:text-destructive transition-smooth shrink-0",
                  "data-ocid": "remove-coupon-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Coupon code",
                  value: couponCode,
                  onChange: (e) => setCouponCode(e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && handleApplyCoupon(),
                  className: "text-sm h-9",
                  "data-ocid": "coupon-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "shrink-0 h-9 px-4",
                  onClick: handleApplyCoupon,
                  disabled: !couponCode.trim() || validateCoupon.isPending,
                  "data-ocid": "apply-coupon-btn",
                  children: "Apply"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Subtotal (",
                  itemCount(),
                  " ",
                  itemCount() === 1 ? "item" : "items",
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "₹",
                  subtotal.toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600 dark:text-emerald-400 font-medium", children: "Free" })
              ] }),
              appliedCoupon && discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  className: "flex justify-between text-emerald-600 dark:text-emerald-400 font-medium",
                  "data-ocid": "discount-row",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5" }),
                      "Discount (",
                      appliedCoupon.code,
                      ")"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "−₹",
                      discount.toLocaleString()
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground text-base mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                finalTotal.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                size: "lg",
                className: "w-full",
                "data-ocid": "proceed-to-checkout-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", children: "Proceed to Checkout" })
              }
            )
          ]
        }
      )
    ] })
  ] });
}
function CartPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartContents, {}) });
}
export {
  CartPage as default
};
