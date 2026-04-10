import { c as createLucideIcon, P as Package, j as jsxRuntimeExports, d as Button, L as Link, B as Badge } from "./index-BcEEdqxz.js";
import { A as AdminLayout } from "./AdminLayout-edk7lyGW.js";
import { P as ProtectedRoute } from "./ProtectedRoute-D9C9-ghI.js";
import { S as Skeleton } from "./skeleton-CwPIWZmi.js";
import { i as useDashboardStats, j as useAllOrders } from "./useBackend-5NC4LJso.js";
import { S as ShoppingBag } from "./shopping-bag-CQzdUjou.js";
import { T as Tag } from "./tag-DRXBsinr.js";
import { A as ArrowRight } from "./arrow-right-Dn7ScuNv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const statusColors = {
  pending: "bg-muted text-muted-foreground",
  confirmed: "bg-primary/15 text-primary",
  processing: "bg-accent/15 text-accent-foreground",
  shipped: "bg-secondary text-secondary-foreground",
  delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-destructive/15 text-destructive"
};
const QUICK_LINKS = [
  {
    to: "/admin/products",
    label: "Manage Products",
    icon: ShoppingBag,
    desc: "Add, edit, delete products"
  },
  {
    to: "/admin/orders",
    label: "Manage Orders",
    icon: Package,
    desc: "View and update order status"
  },
  {
    to: "/admin/coupons",
    label: "Manage Coupons",
    icon: Tag,
    desc: "Create discount codes"
  }
];
function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: allOrders, isLoading: ordersLoading } = useAllOrders();
  const recentOrders = allOrders ? [...allOrders].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5) : [];
  const pendingOrders = (allOrders == null ? void 0 : allOrders.filter((o) => o.status === "pending").length) ?? 0;
  const statCards = [
    {
      key: "orders",
      label: "Total Orders",
      value: (stats == null ? void 0 : stats.totalOrders) ?? 0,
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      key: "revenue",
      label: "Total Revenue",
      value: `₹${((stats == null ? void 0 : stats.totalRevenue) ?? 0).toLocaleString("en-IN")}`,
      icon: TrendingUp,
      color: "text-accent-foreground",
      bg: "bg-accent/10"
    },
    {
      key: "products",
      label: "Products",
      value: (stats == null ? void 0 : stats.totalProducts) ?? 0,
      icon: ShoppingBag,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      key: "users",
      label: "Users",
      value: (stats == null ? void 0 : stats.totalUsers) ?? 0,
      icon: Users,
      color: "text-muted-foreground",
      bg: "bg-muted"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { requireAdmin: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminLayout,
    {
      title: "Dashboard",
      description: "Overview of your store's performance",
      children: [
        pendingOrders > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between gap-4 bg-accent/10 border border-accent/30 rounded-xl px-4 py-3 mb-6",
            "data-ocid": "pending-orders-banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-accent-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                  "You have",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-accent-foreground", children: [
                    pendingOrders,
                    " pending order",
                    pendingOrders > 1 ? "s" : ""
                  ] }),
                  " ",
                  "waiting for action."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/orders", children: "Review" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: statsLoading ? ["sk-a", "sk-b", "sk-c", "sk-d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, k)) : statCards.map(({ key, label, value, icon: Icon, color, bg }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 transition-smooth hover:shadow-product",
            "data-ocid": `stat-card-${key}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-8 h-8 rounded-lg ${bg} flex items-center justify-center`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${color}` })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-foreground", children: value })
            ]
          },
          key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4 mb-8", children: QUICK_LINKS.map(({ to, label, icon: Icon, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to,
            className: "group bg-card border border-border rounded-xl p-4 flex items-start gap-3 hover:border-primary/40 hover:shadow-product transition-smooth",
            "data-ocid": `quick-link-${label.toLowerCase().replace(/\s+/g, "-")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground mb-0.5", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground ml-auto shrink-0 group-hover:translate-x-0.5 group-hover:text-primary transition-smooth mt-0.5" })
            ]
          },
          to
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Recent Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/orders", children: [
              "View all ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1" })
            ] }) })
          ] }),
          ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: ["sk-a", "sk-b", "sk-c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" }, k)) }) : recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-12 text-center text-muted-foreground",
              "data-ocid": "empty-recent-orders",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 mx-auto mb-2 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No orders yet." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-foreground", children: "Order ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-foreground hidden sm:table-cell", children: "Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-5 py-3 font-semibold text-foreground hidden md:table-cell", children: "Items" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 font-semibold text-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-5 py-3 font-semibold text-foreground", children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border last:border-0 hover:bg-muted/20 transition-smooth",
                "data-ocid": "recent-order-row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-mono text-muted-foreground text-xs", children: [
                    "#",
                    String(order.id).slice(-8)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground hidden sm:table-cell", children: new Date(
                    Number(order.createdAt) / 1e6
                  ).toLocaleDateString("en-IN", { dateStyle: "medium" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-center text-muted-foreground hidden md:table-cell", children: order.items.length }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 text-right font-bold text-foreground", children: [
                    "₹",
                    (Number(order.total) / 100).toLocaleString("en-IN")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `capitalize text-xs ${statusColors[order.status] ?? "bg-muted text-muted-foreground"}`,
                      children: order.status
                    }
                  ) })
                ]
              },
              order.id
            )) })
          ] })
        ] })
      ]
    }
  ) });
}
export {
  AdminDashboard as default
};
