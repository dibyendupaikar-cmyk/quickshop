import { u as useCartStore, r as reactExports, j as jsxRuntimeExports, P as Package, d as Button, L as Link } from "./index-BcEEdqxz.js";
import { S as Separator } from "./separator-BvfAzWk8.js";
import { m as motion } from "./proxy-B7DDjsQP.js";
import { C as CircleCheck } from "./circle-check-BU3rqfVp.js";
import { S as ShoppingBag } from "./shopping-bag-CQzdUjou.js";
import "./index-CSz3IhE1.js";
function CheckoutSuccess() {
  const { clearCart } = useCartStore();
  reactExports.useEffect(() => {
    clearCart();
  }, [clearCart]);
  let sessionId = null;
  try {
    const params = new URLSearchParams(window.location.search);
    sessionId = params.get("session_id");
  } catch {
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[80vh] flex items-center justify-center px-4",
      "data-ocid": "checkout-success",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: 20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          className: "w-full max-w-md",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0 },
                animate: { scale: 1 },
                transition: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 14
                },
                className: "w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-primary" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 text-center shadow-elevated", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-2", children: "Order Confirmed!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Thank you for your purchase. Your payment was successful and your order is being prepared." }),
              sessionId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-muted/50 rounded-lg px-4 py-2 mb-4 text-xs text-muted-foreground font-mono truncate",
                  "data-ocid": "order-session-id",
                  children: [
                    "Session: ",
                    sessionId
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6 text-left", children: [
                {
                  icon: Package,
                  title: "Order Processing",
                  desc: "We're preparing your items for shipment."
                },
                {
                  icon: ShoppingBag,
                  title: "Shipping Updates",
                  desc: "You'll receive tracking info once dispatched."
                }
              ].map(({ icon: Icon, title, desc }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: -12 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.3 + i * 0.1 },
                  className: "flex items-start gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
                    ] })
                  ]
                },
                title
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    size: "lg",
                    className: "flex-1",
                    "data-ocid": "view-orders-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 mr-2" }),
                      "Track Order"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    size: "lg",
                    variant: "outline",
                    className: "flex-1",
                    "data-ocid": "continue-shopping-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 mr-2" }),
                      "Keep Shopping"
                    ] })
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
export {
  CheckoutSuccess as default
};
