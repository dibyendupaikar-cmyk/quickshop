import { c as createLucideIcon, f as useParams, j as jsxRuntimeExports, L as Link, P as Package, d as Button, a as cn } from "./index-BcEEdqxz.js";
import { P as ProtectedRoute } from "./ProtectedRoute-D9C9-ghI.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Dh9XuOZK.js";
import { S as Separator } from "./separator-BvfAzWk8.js";
import { S as Skeleton } from "./skeleton-CwPIWZmi.js";
import { h as useOrder } from "./useBackend-5NC4LJso.js";
import { A as ArrowLeft } from "./arrow-left-B_3SztlY.js";
import { m as motion } from "./proxy-B7DDjsQP.js";
import { M as MapPin } from "./map-pin-C39B-re0.js";
import { S as ShoppingBag } from "./shopping-bag-CQzdUjou.js";
import { T as Truck } from "./truck-D7xdKpR1.js";
import { C as CircleCheck } from "./circle-check-BU3rqfVp.js";
import "./index-CSz3IhE1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$1);
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
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200"
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-800 border-blue-200"
  },
  processing: {
    label: "Processing",
    className: "bg-blue-100 text-blue-800 border-blue-200"
  },
  shipped: {
    label: "Shipped",
    className: "bg-purple-100 text-purple-800 border-purple-200"
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-800 border-green-200"
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 border-red-200"
  }
};
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${cfg.className}`,
      "data-ocid": "order-status-badge",
      children: cfg.label
    }
  );
}
const STEPS = [
  {
    key: "pending",
    label: "Order Placed",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-3.5 h-3.5" })
  },
  {
    key: "processing",
    label: "Processing",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5" })
  },
  { key: "shipped", label: "Shipped", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5" }) },
  {
    key: "delivered",
    label: "Delivered",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" })
  }
];
const STEP_INDEX = {
  pending: 0,
  confirmed: 0,
  processing: 1,
  shipped: 2,
  delivered: 3
};
function OrderTimeline({ status }) {
  const current = STEP_INDEX[status] ?? 0;
  const isCancelled = status === "cancelled";
  if (isCancelled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 py-3 px-4 rounded-xl bg-red-50 border border-red-100",
        "data-ocid": "order-timeline",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-600 text-sm font-bold", children: "✕" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-red-800 text-sm", children: "Order Cancelled" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-600 text-xs", children: "This order has been cancelled." })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex items-start", "data-ocid": "order-timeline", children: STEPS.map((step, idx) => {
    const isDone = idx <= current;
    const isActive = idx === current;
    const isLast = idx === STEPS.length - 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-1 flex flex-col items-center relative",
        children: [
          !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "absolute top-4 left-1/2 w-full h-0.5 z-0 transition-smooth",
                isDone && idx < current ? "bg-primary" : "bg-border"
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0.75, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { delay: idx * 0.1, duration: 0.25 },
              className: cn(
                "relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-smooth",
                isDone ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-muted-foreground",
                isActive && "ring-4 ring-primary/20"
              ),
              children: step.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "mt-2 text-center text-[10px] font-medium leading-tight px-0.5",
                isDone ? "text-primary" : "text-muted-foreground",
                isActive && "font-semibold"
              ),
              children: step.label
            }
          )
        ]
      },
      step.key
    );
  }) });
}
function OrderItemRow({ item }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0", children: item.productImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: item.productImage,
        alt: item.productName,
        className: "w-full h-full object-cover"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-muted-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate", children: item.productName }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
        "Qty: ",
        item.quantity
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm text-foreground shrink-0", children: [
      "₹",
      (item.price * item.quantity).toLocaleString("en-IN")
    ] })
  ] });
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "order-detail-skeleton", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 rounded-full" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-12" })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5 space-y-4", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-12 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
    ] }, i)) }) })
  ] });
}
function OrderNotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 text-center",
      "data-ocid": "order-not-found",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-2", children: "Order not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-xs", children: "This order doesn't exist or you don't have access to it." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: "Back to Orders" }) })
      ]
    }
  );
}
function OrderDetailContent({ id }) {
  const { data: order, isLoading } = useOrder(id);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  if (!order) return /* @__PURE__ */ jsxRuntimeExports.jsx(OrderNotFound, {});
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = order.discount ?? 0;
  const date = new Date(Number(order.createdAt) / 1e6).toLocaleDateString(
    "en-IN",
    { weekday: "short", day: "numeric", month: "long", year: "numeric" }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35 },
      className: "space-y-4",
      "data-ocid": "order-detail",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-base text-foreground", children: [
              "#",
              order.id.slice(-12).toUpperCase()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-display font-semibold text-foreground", children: "Track Order" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderTimeline, { status: order.status }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-1 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-display font-semibold text-foreground", children: "Items Ordered" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: order.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            OrderItemRow,
            {
              item
            },
            `${item.productId}-${item.productName}`
          )) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-1 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-display font-semibold text-foreground", children: "Price Details" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            CardContent,
            {
              className: "px-5 pb-4 space-y-2.5",
              "data-ocid": "price-breakdown",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                    "₹",
                    subtotal.toLocaleString("en-IN")
                  ] })
                ] }),
                discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "Discount",
                    order.couponCode ? ` (${order.couponCode})` : ""
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-700 font-medium", children: [
                    "−₹",
                    discount.toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-base", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                    "₹",
                    order.total.toLocaleString("en-IN")
                  ] })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-1 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-display font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
            "Delivery Address"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-5 pb-4", "data-ocid": "shipping-address", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: order.shippingAddress.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1 leading-relaxed", children: [
              order.shippingAddress.street,
              ",",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              order.shippingAddress.city,
              ", ",
              order.shippingAddress.state,
              " ",
              order.shippingAddress.pincode
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
              order.shippingAddress.phone
            ] })
          ] })
        ] })
      ]
    }
  );
}
function OrderDetail() {
  const { id } = useParams({ from: "/orders/$id" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/orders",
          className: "w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-smooth",
          "aria-label": "Back to orders",
          "data-ocid": "back-to-orders",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 text-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Order Details" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderDetailContent, { id }) })
  ] }) });
}
export {
  OrderDetail as default
};
