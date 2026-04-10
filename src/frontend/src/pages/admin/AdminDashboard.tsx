import { AdminLayout } from "@/components/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllOrders, useDashboardStats } from "@/hooks/useBackend";
import type { Order } from "@/types/index";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Package,
  ShoppingBag,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  confirmed: "bg-primary/15 text-primary",
  processing: "bg-accent/15 text-accent-foreground",
  shipped: "bg-secondary text-secondary-foreground",
  delivered:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-destructive/15 text-destructive",
};

const QUICK_LINKS = [
  {
    to: "/admin/products",
    label: "Manage Products",
    icon: ShoppingBag,
    desc: "Add, edit, delete products",
  },
  {
    to: "/admin/orders",
    label: "Manage Orders",
    icon: Package,
    desc: "View and update order status",
  },
  {
    to: "/admin/coupons",
    label: "Manage Coupons",
    icon: Tag,
    desc: "Create discount codes",
  },
];

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: allOrders, isLoading: ordersLoading } = useAllOrders();

  const recentOrders: Order[] = allOrders
    ? [...allOrders].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5)
    : [];

  const pendingOrders =
    allOrders?.filter((o) => o.status === "pending").length ?? 0;

  const statCards = [
    {
      key: "orders",
      label: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      key: "revenue",
      label: "Total Revenue",
      value: `₹${(stats?.totalRevenue ?? 0).toLocaleString("en-IN")}`,
      icon: TrendingUp,
      color: "text-accent-foreground",
      bg: "bg-accent/10",
    },
    {
      key: "products",
      label: "Products",
      value: stats?.totalProducts ?? 0,
      icon: ShoppingBag,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      key: "users",
      label: "Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ];

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout
        title="Dashboard"
        description="Overview of your store's performance"
      >
        {/* Pending banner */}
        {pendingOrders > 0 && (
          <div
            className="flex items-center justify-between gap-4 bg-accent/10 border border-accent/30 rounded-xl px-4 py-3 mb-6"
            data-ocid="pending-orders-banner"
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-accent-foreground shrink-0" />
              <p className="text-sm font-medium text-foreground">
                You have{" "}
                <span className="font-bold text-accent-foreground">
                  {pendingOrders} pending order{pendingOrders > 1 ? "s" : ""}
                </span>{" "}
                waiting for action.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="shrink-0">
              <Link to="/admin/orders">Review</Link>
            </Button>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsLoading
            ? ["sk-a", "sk-b", "sk-c", "sk-d"].map((k) => (
                <Skeleton key={k} className="h-28 rounded-xl" />
              ))
            : statCards.map(({ key, label, value, icon: Icon, color, bg }) => (
                <div
                  key={key}
                  className="bg-card border border-border rounded-xl p-5 transition-smooth hover:shadow-product"
                  data-ocid={`stat-card-${key}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <div
                      className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}
                    >
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                  </div>
                  <p className="font-display font-bold text-2xl text-foreground">
                    {value}
                  </p>
                </div>
              ))}
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {QUICK_LINKS.map(({ to, label, icon: Icon, desc }) => (
            <Link
              key={to}
              to={to}
              className="group bg-card border border-border rounded-xl p-4 flex items-start gap-3 hover:border-primary/40 hover:shadow-product transition-smooth"
              data-ocid={`quick-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-smooth">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-foreground mb-0.5">
                  {label}
                </p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0 group-hover:translate-x-0.5 group-hover:text-primary transition-smooth mt-0.5" />
            </Link>
          ))}
        </div>

        {/* Recent orders table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-display font-semibold text-base text-foreground">
              Recent Orders
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/orders">
                View all <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          {ordersLoading ? (
            <div className="p-5 space-y-3">
              {["sk-a", "sk-b", "sk-c"].map((k) => (
                <Skeleton key={k} className="h-12 rounded-lg" />
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <div
              className="py-12 text-center text-muted-foreground"
              data-ocid="empty-recent-orders"
            >
              <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No orders yet.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left px-5 py-3 font-semibold text-foreground">
                    Order ID
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-center px-5 py-3 font-semibold text-foreground hidden md:table-cell">
                    Items
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-foreground">
                    Total
                  </th>
                  <th className="text-center px-5 py-3 font-semibold text-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                    data-ocid="recent-order-row"
                  >
                    <td className="px-5 py-3 font-mono text-muted-foreground text-xs">
                      #{String(order.id).slice(-8)}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">
                      {new Date(
                        Number(order.createdAt) / 1_000_000,
                      ).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                    </td>
                    <td className="px-5 py-3 text-center text-muted-foreground hidden md:table-cell">
                      {order.items.length}
                    </td>
                    <td className="px-5 py-3 text-right font-bold text-foreground">
                      ₹{(Number(order.total) / 100).toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <Badge
                        className={`capitalize text-xs ${statusColors[order.status] ?? "bg-muted text-muted-foreground"}`}
                      >
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
