import { c as createLucideIcon, j as jsxRuntimeExports, d as Button, L as Link } from "./index-BcEEdqxz.js";
import { P as ProtectedRoute } from "./ProtectedRoute-D9C9-ghI.js";
import { C as Card, a as CardContent } from "./card-Dh9XuOZK.js";
import { S as Skeleton } from "./skeleton-CwPIWZmi.js";
import { g as useOrders } from "./useBackend-5NC4LJso.js";
import { m as motion } from "./proxy-B7DDjsQP.js";
import { S as ShoppingBag } from "./shopping-bag-CQzdUjou.js";
import { C as ChevronRight } from "./chevron-right-y2NMtARk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode);
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
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.className}`,
      children: config.label
    }
  );
}
function OrderCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" })
    ] })
  ] }) }) });
}
function OrderCard({ order, index }) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const firstTwo = order.items.slice(0, 2);
  const remainder = order.items.length - 2;
  const itemSummary = firstTwo.map((i) => `${i.productName} ×${i.quantity}`).join(", ") + (remainder > 0 ? ` +${remainder} more` : "");
  const date = new Date(Number(order.createdAt) / 1e6).toLocaleDateString(
    "en-IN",
    { day: "numeric", month: "short", year: "numeric" }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.07 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/orders/$id",
          params: { id: order.id },
          "data-ocid": `order-row-${order.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border card-hover cursor-pointer group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-sm text-foreground", children: [
                  "#",
                  order.id.slice(-8).toUpperCase()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-muted-foreground text-xs truncate mb-1",
                  title: itemSummary,
                  children: itemSummary
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
                itemCount,
                " ",
                itemCount === 1 ? "item" : "items",
                " · ",
                date
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-foreground text-sm", children: [
                "₹",
                order.total.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" })
            ] })
          ] }) }) })
        }
      )
    }
  );
}
function EmptyOrders() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4 },
      className: "flex flex-col items-center justify-center py-20 px-4 text-center",
      "data-ocid": "orders-empty-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-10 h-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "No orders yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8 max-w-xs", children: "Looks like you haven't placed any orders. Explore our products and find something you love!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", "data-ocid": "start-shopping-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 mr-2" }),
          "Start Shopping"
        ] }) })
      ]
    }
  );
}
function OrdersList() {
  const { data: orders, isLoading } = useOrders();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCardSkeleton, {}, i)) });
  }
  if (!orders || orders.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyOrders, {});
  }
  const sorted = [...orders].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "orders-list", children: sorted.map((order, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, index }, order.id)) });
}
function OrdersPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "My Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "View and track all your orders" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersList, {}) })
  ] }) });
}
export {
  OrdersPage as default
};
