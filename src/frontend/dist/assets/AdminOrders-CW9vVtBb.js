import { r as reactExports, j as jsxRuntimeExports, P as Package, B as Badge, d as Button } from "./index-BcEEdqxz.js";
import { A as AdminLayout } from "./AdminLayout-edk7lyGW.js";
import { P as ProtectedRoute } from "./ProtectedRoute-D9C9-ghI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-3nHbQU75.js";
import { S as Skeleton } from "./skeleton-CwPIWZmi.js";
import { j as useAllOrders, n as useUpdateOrderStatus } from "./useBackend-5NC4LJso.js";
import { u as ue } from "./index-BCkbE-xZ.js";
import "./shopping-bag-CQzdUjou.js";
import "./tag-DRXBsinr.js";
const statusColors = {
  pending: "bg-muted text-muted-foreground",
  confirmed: "bg-primary/15 text-primary",
  processing: "bg-accent/15 text-accent-foreground",
  shipped: "bg-secondary text-secondary-foreground",
  delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-destructive/15 text-destructive"
};
const ALL_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled"
];
function AdminOrders() {
  const { data: orders, isLoading } = useAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const filtered = (orders ?? []).filter((o) => filterStatus === "all" || o.status === filterStatus).sort((a, b) => b.createdAt - a.createdAt);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { requireAdmin: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminLayout,
    {
      title: "Orders",
      description: "Manage and update customer orders",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-6 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Showing",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: filtered.length }),
            " ",
            "order",
            filtered.length !== 1 ? "s" : ""
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: filterStatus,
              onValueChange: (v) => setFilterStatus(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", "data-ocid": "admin-orders-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by status" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
                  ALL_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "capitalize", children: s.charAt(0).toUpperCase() + s.slice(1) }, s))
                ] })
              ]
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl py-16 text-center",
            "data-ocid": "empty-orders",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 mx-auto mb-3 opacity-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No orders found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: filterStatus !== "all" ? "Try a different status filter." : "Orders will appear here once customers place them." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[640px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Order ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-foreground", children: "Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-foreground", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border last:border-0 hover:bg-muted/20 transition-smooth",
              "data-ocid": "admin-order-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap", children: [
                  "#",
                  String(order.id).slice(-10)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: new Date(
                  Number(order.createdAt) / 1e6
                ).toLocaleDateString("en-IN", {
                  dateStyle: "medium"
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground max-w-[120px] truncate", children: `${String(order.userId).slice(0, 12)}…` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center font-medium text-foreground", children: order.items.length }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-bold text-foreground whitespace-nowrap", children: [
                  "₹",
                  Number(order.total).toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: order.status,
                    onValueChange: (status) => updateStatus.mutate(
                      { id: order.id, status },
                      {
                        onSuccess: () => ue.success("Order status updated"),
                        onError: () => ue.error("Failed to update status")
                      }
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-7 w-36 text-xs border-0 p-0 focus:ring-0",
                          "data-ocid": "order-status-select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              className: `capitalize text-xs ${statusColors[order.status] ?? "bg-muted text-muted-foreground"}`,
                              children: order.status
                            }
                          ) })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ALL_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: s }) }, s)) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    asChild: true,
                    className: "h-7 text-xs",
                    "data-ocid": "view-order-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/orders/${order.id}`, children: "View" })
                  }
                ) })
              ]
            },
            order.id
          )) })
        ] }) })
      ]
    }
  ) });
}
export {
  AdminOrders as default
};
