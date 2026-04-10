import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: ShoppingBag, exact: false },
  { to: "/admin/orders", label: "Orders", icon: Package, exact: false },
  { to: "/admin/coupons", label: "Coupons", icon: Tag, exact: false },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AdminLayout({
  children,
  title,
  description,
}: AdminLayoutProps) {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (to: string, exact: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  if (!isAdmin) return null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm md:hidden"
          role="button"
          tabIndex={-1}
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-60 bg-card border-r border-border flex flex-col pt-16 transition-transform duration-300",
          "md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        data-ocid="admin-sidebar"
      >
        {/* Mobile close */}
        <div className="flex items-center justify-between px-4 py-3 md:hidden border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Zap
                className="w-3.5 h-3.5 text-primary-foreground"
                fill="currentColor"
              />
            </div>
            <span className="font-display font-bold text-sm text-foreground">
              Admin
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Desktop header */}
        <div className="hidden md:flex items-center gap-2 px-4 py-5 border-b border-border">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Zap
              className="w-3.5 h-3.5 text-primary-foreground"
              fill="currentColor"
            />
          </div>
          <div>
            <p className="font-display font-bold text-sm text-foreground leading-none">
              Admin Panel
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              QuickShop
            </p>
          </div>
        </div>

        {/* Nav links */}
        <nav
          className="flex-1 px-3 py-4 space-y-1"
          aria-label="Admin navigation"
        >
          {NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
                isActive(to, exact)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
              data-ocid={`admin-nav-${label.toLowerCase()}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Page header */}
        <div className="bg-card border-b border-border px-6 py-5 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-8 w-8 p-0 shrink-0"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <LayoutDashboard className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
