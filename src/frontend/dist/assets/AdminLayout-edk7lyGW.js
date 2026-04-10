import { V as useLocation, g as useAuth, r as reactExports, j as jsxRuntimeExports, Z as Zap, d as Button, X, W as LayoutDashboard, P as Package, L as Link, a as cn } from "./index-BcEEdqxz.js";
import { S as ShoppingBag } from "./shopping-bag-CQzdUjou.js";
import { T as Tag } from "./tag-DRXBsinr.js";
const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: ShoppingBag, exact: false },
  { to: "/admin/orders", label: "Orders", icon: Package, exact: false },
  { to: "/admin/coupons", label: "Coupons", icon: Tag, exact: false }
];
function AdminLayout({
  children,
  title,
  description
}) {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const isActive = (to, exact) => exact ? location.pathname === to : location.pathname.startsWith(to);
  if (!isAdmin) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[calc(100vh-4rem)]", children: [
    sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm md:hidden",
        role: "button",
        tabIndex: -1,
        "aria-label": "Close sidebar",
        onClick: () => setSidebarOpen(false),
        onKeyDown: (e) => e.key === "Escape" && setSidebarOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: cn(
          "fixed inset-y-0 left-0 z-40 w-60 bg-card border-r border-border flex flex-col pt-16 transition-transform duration-300",
          "md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        ),
        "data-ocid": "admin-sidebar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 md:hidden border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-md bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Zap,
                {
                  className: "w-3.5 h-3.5 text-primary-foreground",
                  fill: "currentColor"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground", children: "Admin" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 w-7 p-0",
                onClick: () => setSidebarOpen(false),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2 px-4 py-5 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-md bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Zap,
              {
                className: "w-3.5 h-3.5 text-primary-foreground",
                fill: "currentColor"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground leading-none", children: "Admin Panel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "QuickShop" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "nav",
            {
              className: "flex-1 px-3 py-4 space-y-1",
              "aria-label": "Admin navigation",
              children: NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to,
                  onClick: () => setSidebarOpen(false),
                  className: cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
                    isActive(to, exact) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  ),
                  "data-ocid": `admin-nav-${label.toLowerCase()}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 shrink-0" }),
                    label
                  ]
                },
                to
              ))
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-6 py-5 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "md:hidden h-8 w-8 p-0 shrink-0",
            onClick: () => setSidebarOpen(true),
            "aria-label": "Open sidebar",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: description })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children })
    ] })
  ] });
}
export {
  AdminLayout as A
};
