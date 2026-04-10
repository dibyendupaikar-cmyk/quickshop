import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrder } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import type { Order, OrderItem, OrderStatus } from "@/types/index";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Status config ────────────────────────────────────────────────────────────

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
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${cfg.className}`}
      data-ocid="order-status-badge"
    >
      {cfg.label}
    </span>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

type TimelineStep = { key: OrderStatus; label: string; icon: React.ReactNode };

const STEPS: TimelineStep[] = [
  {
    key: "pending",
    label: "Order Placed",
    icon: <Circle className="w-3.5 h-3.5" />,
  },
  {
    key: "processing",
    label: "Processing",
    icon: <Package className="w-3.5 h-3.5" />,
  },
  { key: "shipped", label: "Shipped", icon: <Truck className="w-3.5 h-3.5" /> },
  {
    key: "delivered",
    label: "Delivered",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
];

const STEP_INDEX: Partial<Record<OrderStatus, number>> = {
  pending: 0,
  confirmed: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
};

function OrderTimeline({ status }: { status: OrderStatus }) {
  const current = STEP_INDEX[status] ?? 0;
  const isCancelled = status === "cancelled";

  if (isCancelled) {
    return (
      <div
        className="flex items-center gap-3 py-3 px-4 rounded-xl bg-red-50 border border-red-100"
        data-ocid="order-timeline"
      >
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <span className="text-red-600 text-sm font-bold">✕</span>
        </div>
        <div>
          <p className="font-semibold text-red-800 text-sm">Order Cancelled</p>
          <p className="text-red-600 text-xs">This order has been cancelled.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-start" data-ocid="order-timeline">
      {STEPS.map((step, idx) => {
        const isDone = idx <= current;
        const isActive = idx === current;
        const isLast = idx === STEPS.length - 1;
        return (
          <div
            key={step.key}
            className="flex-1 flex flex-col items-center relative"
          >
            {!isLast && (
              <div
                className={cn(
                  "absolute top-4 left-1/2 w-full h-0.5 z-0 transition-smooth",
                  isDone && idx < current ? "bg-primary" : "bg-border",
                )}
              />
            )}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.25 }}
              className={cn(
                "relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-smooth",
                isDone
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background border-border text-muted-foreground",
                isActive && "ring-4 ring-primary/20",
              )}
            >
              {step.icon}
            </motion.div>
            <p
              className={cn(
                "mt-2 text-center text-[10px] font-medium leading-tight px-0.5",
                isDone ? "text-primary" : "text-muted-foreground",
                isActive && "font-semibold",
              )}
            >
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Item row ─────────────────────────────────────────────────────────────────

function OrderItemRow({ item }: { item: OrderItem }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
        {item.productImage ? (
          <img
            src={item.productImage}
            alt={item.productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <ShoppingBag className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground truncate">
          {item.productName}
        </p>
        <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
      </div>
      <p className="font-semibold text-sm text-foreground shrink-0">
        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="space-y-4" data-ocid="order-detail-skeleton">
      <div className="flex justify-between items-center">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Card>
        <CardContent className="p-5 space-y-4">
          <Skeleton className="h-4 w-24" />
          <div className="flex justify-between">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-2.5 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5 space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-3 items-center">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── 404 ──────────────────────────────────────────────────────────────────────

function OrderNotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center"
      data-ocid="order-not-found"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Package className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="font-display font-bold text-lg text-foreground mb-2">
        Order not found
      </h2>
      <p className="text-muted-foreground text-sm mb-6 max-w-xs">
        This order doesn't exist or you don't have access to it.
      </p>
      <Button asChild variant="outline">
        <Link to="/orders">Back to Orders</Link>
      </Button>
    </div>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

function OrderDetailContent({ id }: { id: string }) {
  const { data: order, isLoading } = useOrder(id);

  if (isLoading) return <DetailSkeleton />;
  if (!order) return <OrderNotFound />;

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = order.discount ?? 0;
  const date = new Date(Number(order.createdAt) / 1_000_000).toLocaleDateString(
    "en-IN",
    { weekday: "short", day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
      data-ocid="order-detail"
    >
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <p className="font-display font-bold text-base text-foreground">
            #{order.id.slice(-12).toUpperCase()}
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">{date}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Timeline */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-4 px-5">
          <CardTitle className="text-sm font-display font-semibold text-foreground">
            Track Order
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <OrderTimeline status={order.status} />
        </CardContent>
      </Card>

      {/* Items */}
      <Card className="border border-border">
        <CardHeader className="pb-1 pt-4 px-5">
          <CardTitle className="text-sm font-display font-semibold text-foreground">
            Items Ordered
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-3">
          <div className="divide-y divide-border">
            {order.items.map((item) => (
              <OrderItemRow
                key={`${item.productId}-${item.productName}`}
                item={item}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price breakdown */}
      <Card className="border border-border">
        <CardHeader className="pb-1 pt-4 px-5">
          <CardTitle className="text-sm font-display font-semibold text-foreground">
            Price Details
          </CardTitle>
        </CardHeader>
        <CardContent
          className="px-5 pb-4 space-y-2.5"
          data-ocid="price-breakdown"
        >
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Discount{order.couponCode ? ` (${order.couponCode})` : ""}
              </span>
              <span className="text-green-700 font-medium">
                −₹{discount.toLocaleString("en-IN")}
              </span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-display font-bold text-base">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">
              ₹{order.total.toLocaleString("en-IN")}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Shipping address */}
      <Card className="border border-border">
        <CardHeader className="pb-1 pt-4 px-5">
          <CardTitle className="text-sm font-display font-semibold text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-4" data-ocid="shipping-address">
          <p className="font-semibold text-sm text-foreground">
            {order.shippingAddress.name}
          </p>
          <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
            {order.shippingAddress.street},<br />
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.pincode}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
            <Phone className="w-3.5 h-3.5" />
            {order.shippingAddress.phone}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderDetail() {
  const { id } = useParams({ from: "/orders/$id" });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
            <Link
              to="/orders"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-smooth"
              aria-label="Back to orders"
              data-ocid="back-to-orders"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </Link>
            <h1 className="font-display font-bold text-xl text-foreground">
              Order Details
            </h1>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <OrderDetailContent id={id} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
