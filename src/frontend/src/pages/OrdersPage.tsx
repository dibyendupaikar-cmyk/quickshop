import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/hooks/useBackend";
import type { Order, OrderStatus } from "@/types/index";
import { Link } from "@tanstack/react-router";
import { ChevronRight, ClipboardList, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> =
  {
    pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    confirmed: {
      label: "Confirmed",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    processing: {
      label: "Processing",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    shipped: {
      label: "Shipped",
      className: "bg-purple-100 text-purple-800 border-purple-200",
    },
    delivered: {
      label: "Delivered",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-100 text-red-800 border-red-200",
    },
  };

function StatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.className}`}
    >
      {config.label}
    </span>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function OrderCardSkeleton() {
  return (
    <Card className="border border-border">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Order card ───────────────────────────────────────────────────────────────

function OrderCard({ order, index }: { order: Order; index: number }) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const firstTwo = order.items.slice(0, 2);
  const remainder = order.items.length - 2;
  const itemSummary =
    firstTwo.map((i) => `${i.productName} ×${i.quantity}`).join(", ") +
    (remainder > 0 ? ` +${remainder} more` : "");

  const date = new Date(Number(order.createdAt) / 1_000_000).toLocaleDateString(
    "en-IN",
    { day: "numeric", month: "short", year: "numeric" },
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
    >
      <Link
        to="/orders/$id"
        params={{ id: order.id }}
        data-ocid={`order-row-${order.id}`}
      >
        <Card className="border border-border card-hover cursor-pointer group">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-display font-semibold text-sm text-foreground">
                    #{order.id.slice(-8).toUpperCase()}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
                <p
                  className="text-muted-foreground text-xs truncate mb-1"
                  title={itemSummary}
                >
                  {itemSummary}
                </p>
                <p className="text-muted-foreground text-xs">
                  {itemCount} {itemCount === 1 ? "item" : "items"} · {date}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <p className="font-display font-bold text-foreground text-sm">
                  ₹{order.total.toLocaleString("en-IN")}
                </p>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      data-ocid="orders-empty-state"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <ClipboardList className="w-10 h-10 text-primary" />
      </div>
      <h2 className="font-display font-bold text-xl text-foreground mb-2">
        No orders yet
      </h2>
      <p className="text-muted-foreground text-sm mb-8 max-w-xs">
        Looks like you haven't placed any orders. Explore our products and find
        something you love!
      </p>
      <Button asChild size="lg" data-ocid="start-shopping-btn">
        <Link to="/">
          <ShoppingBag className="w-4 h-4 mr-2" />
          Start Shopping
        </Link>
      </Button>
    </motion.div>
  );
}

// ─── List ─────────────────────────────────────────────────────────────────────

function OrdersList() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <OrderCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return <EmptyOrders />;
  }

  const sorted = [...orders].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );

  return (
    <div className="space-y-3" data-ocid="orders-list">
      {sorted.map((order, index) => (
        <OrderCard key={order.id} order={order} index={index} />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="font-display font-bold text-2xl text-foreground">
              My Orders
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              View and track all your orders
            </p>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <OrdersList />
        </div>
      </div>
    </ProtectedRoute>
  );
}
