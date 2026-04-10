import { c as createLucideIcon, u as useCartStore, r as reactExports, j as jsxRuntimeExports, d as Button, P as Package, B as Badge } from "./index-BcEEdqxz.js";
import { P as ProtectedRoute } from "./ProtectedRoute-D9C9-ghI.js";
import { I as Input } from "./input-BuzKrnlF.js";
import { L as Label } from "./label-BjMx4jys.js";
import { S as Separator } from "./separator-BvfAzWk8.js";
import { d as useValidateCoupon, e as useCreateOrder, f as useCreateCheckoutSession } from "./useBackend-5NC4LJso.js";
import { u as useForm } from "./index.esm-CsoE6wew.js";
import { u as ue } from "./index-BCkbE-xZ.js";
import { A as AnimatePresence } from "./index-D5os95nZ.js";
import { m as motion } from "./proxy-B7DDjsQP.js";
import { M as MapPin } from "./map-pin-C39B-re0.js";
import { A as ArrowRight } from "./arrow-right-Dn7ScuNv.js";
import { T as Tag } from "./tag-DRXBsinr.js";
import { A as ArrowLeft } from "./arrow-left-B_3SztlY.js";
import { C as CircleCheck } from "./circle-check-BU3rqfVp.js";
import "./index-CSz3IhE1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
const STEPS = [
  { id: "shipping", label: "Shipping", icon: MapPin },
  { id: "review", label: "Review", icon: Package },
  { id: "payment", label: "Payment", icon: CreditCard }
];
function StepIndicator({ current }) {
  const currentIndex = STEPS.findIndex((s) => s.id === current);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-0 mb-8", children: STEPS.map((step, i) => {
    const Icon = step.icon;
    const done = i < currentIndex;
    const active = i === currentIndex;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${active ? "bg-primary text-primary-foreground shadow-md" : done ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`,
          children: [
            done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: step.label })
          ]
        }
      ),
      i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-px w-6 sm:w-10 mx-1 transition-smooth ${done ? "bg-primary/40" : "bg-border"}`
        }
      )
    ] }, step.id);
  }) });
}
function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = reactExports.useState("shipping");
  const [couponCode, setCouponCode] = reactExports.useState("");
  const [discount, setDiscount] = reactExports.useState(0);
  const [appliedCoupon, setAppliedCoupon] = reactExports.useState("");
  const validateCoupon = useValidateCoupon();
  const createOrder = useCreateOrder();
  const createCheckoutSession = useCreateCheckoutSession();
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors }
  } = useForm({
    defaultValues: { country: "IN" }
  });
  const finalTotal = Math.max(0, total() - discount);
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    validateCoupon.mutate(couponCode.trim(), {
      onSuccess: (coupon) => {
        if (!coupon) {
          ue.error("Invalid or expired coupon");
          return;
        }
        const amt = coupon.discountType === "percentage" ? total() * coupon.discountValue / 100 : coupon.discountValue;
        const capped = Math.min(amt, total());
        setDiscount(capped);
        setAppliedCoupon(couponCode.trim());
        ue.success(`Coupon applied — ₹${Math.round(capped)} saved!`);
      },
      onError: () => ue.error("Could not apply coupon")
    });
  };
  const handleNextStep = async () => {
    if (step === "shipping") {
      const valid = await trigger([
        "name",
        "street",
        "city",
        "state",
        "postalCode",
        "country"
      ]);
      if (valid) setStep("review");
    } else if (step === "review") {
      setStep("payment");
    }
  };
  const onSubmit = async (data) => {
    if (items.length === 0) {
      ue.error("Your cart is empty");
      return;
    }
    try {
      const cartItems = items.map((item) => ({
        productId: BigInt(item.product.id),
        quantity: BigInt(item.quantity)
      }));
      const shippingAddress = {
        name: data.name,
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country
      };
      const orderResult = await createOrder.mutateAsync({
        items: cartItems,
        couponCode: appliedCoupon || null,
        shippingAddress
      });
      if (!orderResult) throw new Error("Order creation failed");
      const shoppingItems = items.map((item) => ({
        productName: item.product.name,
        productDescription: item.product.description.slice(0, 100),
        currency: "inr",
        priceInCents: BigInt(Math.round(item.product.price * 100)),
        quantity: BigInt(item.quantity)
      }));
      const sessionJson = await createCheckoutSession.mutateAsync(shoppingItems);
      const session = JSON.parse(sessionJson);
      if (!(session == null ? void 0 : session.url)) throw new Error("Stripe session missing payment URL");
      clearCart();
      window.location.href = session.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      ue.error(message);
    }
  };
  const isSubmitting = createOrder.isPending || createCheckoutSession.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl py-8 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-2", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-6", children: [
      items.length,
      " item",
      items.length !== 1 ? "s" : "",
      " · ₹",
      Math.round(finalTotal).toLocaleString(),
      " total"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit(onSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
        step === "shipping" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 24 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -24 },
            transition: { duration: 0.25 },
            className: "bg-card border border-border rounded-xl p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground mb-5 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-primary" }),
                "Shipping Address"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "name",
                      placeholder: "Arjun Sharma",
                      ...register("name", {
                        required: "Full name is required"
                      }),
                      className: "mt-1",
                      "data-ocid": "checkout-name"
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.name.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "street", children: "Street Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "street",
                      placeholder: "42 Mahatma Gandhi Road, Apt 3B",
                      ...register("street", {
                        required: "Street address is required"
                      }),
                      className: "mt-1",
                      "data-ocid": "checkout-street"
                    }
                  ),
                  errors.street && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.street.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", children: "City" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "city",
                      placeholder: "Mumbai",
                      ...register("city", {
                        required: "City is required"
                      }),
                      className: "mt-1",
                      "data-ocid": "checkout-city"
                    }
                  ),
                  errors.city && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.city.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "state", children: "State" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "state",
                      placeholder: "Maharashtra",
                      ...register("state", {
                        required: "State is required"
                      }),
                      className: "mt-1",
                      "data-ocid": "checkout-state"
                    }
                  ),
                  errors.state && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.state.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "postalCode", children: "Postal Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "postalCode",
                      placeholder: "400001",
                      ...register("postalCode", {
                        required: "Postal code is required",
                        pattern: {
                          value: /^\d{4,10}$/,
                          message: "Enter a valid postal code"
                        }
                      }),
                      className: "mt-1",
                      "data-ocid": "checkout-postalcode"
                    }
                  ),
                  errors.postalCode && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.postalCode.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "country", children: "Country" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "country",
                      placeholder: "IN",
                      ...register("country", {
                        required: "Country is required"
                      }),
                      className: "mt-1",
                      "data-ocid": "checkout-country"
                    }
                  ),
                  errors.country && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.country.message })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: handleNextStep,
                  "data-ocid": "next-to-review-btn",
                  children: [
                    "Review Order",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                  ]
                }
              ) })
            ]
          },
          "shipping"
        ),
        step === "review" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 24 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -24 },
            transition: { duration: 0.25 },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground mb-5 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }),
                  "Order Items"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map(({ product, quantity }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: product.imageUrl,
                          alt: product.name,
                          className: "w-full h-full object-cover"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-1", children: product.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                          "Qty: ",
                          quantity
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground shrink-0", children: [
                        "₹",
                        (product.price * quantity).toLocaleString()
                      ] })
                    ]
                  },
                  product.id
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base text-foreground mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
                  "Delivering to"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground leading-relaxed", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: getValues("name") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: getValues("street") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    getValues("city"),
                    ", ",
                    getValues("state"),
                    " –",
                    " ",
                    getValues("postalCode")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: getValues("country") })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base text-foreground mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-primary" }),
                  "Coupon Code"
                ] }),
                discount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-sm py-1 px-3",
                      children: appliedCoupon
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-green-600 dark:text-green-400 font-medium", children: [
                    "−₹",
                    Math.round(discount).toLocaleString(),
                    " applied!"
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", "data-ocid": "coupon-section", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Enter coupon code",
                      value: couponCode,
                      onChange: (e) => setCouponCode(e.target.value),
                      onKeyDown: (e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleApplyCoupon();
                        }
                      },
                      className: "text-sm",
                      "data-ocid": "coupon-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: handleApplyCoupon,
                      disabled: validateCoupon.isPending || !couponCode.trim(),
                      "data-ocid": "apply-coupon-btn",
                      children: validateCoupon.isPending ? "…" : "Apply"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => setStep("shipping"),
                    "data-ocid": "back-to-shipping-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                      "Back"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    onClick: handleNextStep,
                    "data-ocid": "next-to-payment-btn",
                    children: [
                      "Proceed to Payment",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                    ]
                  }
                )
              ] })
            ]
          },
          "review"
        ),
        step === "payment" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 24 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -24 },
            transition: { duration: 0.25 },
            className: "bg-card border border-border rounded-xl p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground mb-5 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-primary" }),
                "Secure Payment via Stripe"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 rounded-lg p-4 mb-6 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You'll be redirected to Stripe's secure checkout page to complete your payment. We accept all major credit/debit cards, UPI, and net banking." }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }) }),
                "256-bit SSL encrypted · PCI DSS compliant"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => setStep("review"),
                    "data-ocid": "back-to-review-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                      "Back"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    size: "lg",
                    disabled: isSubmitting || items.length === 0,
                    className: "min-w-[160px]",
                    "data-ocid": "place-order-btn",
                    children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
                      createOrder.isPending ? "Creating order…" : "Redirecting…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      "Pay ₹",
                      Math.round(finalTotal).toLocaleString(),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                    ] })
                  }
                )
              ] })
            ]
          },
          "payment"
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 sticky top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground mb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: items.map(({ product, quantity }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between text-sm gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground line-clamp-1 flex-1", children: [
                product.name,
                " ×",
                quantity
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium shrink-0", children: [
                "₹",
                (product.price * quantity).toLocaleString()
              ] })
            ]
          },
          product.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              total().toLocaleString()
            ] })
          ] }),
          discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-green-600 dark:text-green-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Coupon (",
              appliedCoupon,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "−₹",
              Math.round(discount).toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Free" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground text-base pt-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "₹",
            Math.round(finalTotal).toLocaleString()
          ] })
        ] })
      ] }) })
    ] }) })
  ] }) });
}
export {
  CheckoutPage as default
};
