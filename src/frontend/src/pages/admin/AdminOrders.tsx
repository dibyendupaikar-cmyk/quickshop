import { AdminLayout } from "@/components/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllOrders, useUpdateOrderStatus } from "@/hooks/useBackend";
import type { OrderStatus } from "@/types/index";
import { Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  confirmed: "bg-primary/15 text-primary",
  processing: "bg-accent/15 text-accent-foreground",
  shipped: "bg-secondary text-secondary-foreground",
  delivered:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-destructive/15 text-destructive",
};

const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrders() {
  const { data: orders, isLoading } = useAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  const filtered = (orders ?? [])
    .filter((o) => filterStatus === "all" || o.status === filterStatus)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout
        title="Orders"
        description="Manage and update customer orders"
      >
        {/* Filter */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filtered.length}
              </span>{" "}
              order{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Select
            value={filterStatus}
            onValueChange={(v) => setFilterStatus(v as OrderStatus | "all")}
          >
            <SelectTrigger className="w-44" data-ocid="admin-orders-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {ALL_STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {["sk-a", "sk-b", "sk-c", "sk-d", "sk-e"].map((k) => (
              <Skeleton key={k} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="bg-card border border-border rounded-xl py-16 text-center"
            data-ocid="empty-orders"
          >
            <Package className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium text-foreground mb-1">No orders found</p>
            <p className="text-sm text-muted-foreground">
              {filterStatus !== "all"
                ? "Try a different status filter."
                : "Orders will appear here once customers place them."}
            </p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Order ID
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    User
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground">
                    Items
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground">
                    Total
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                    data-ocid="admin-order-row"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                      #{String(order.id).slice(-10)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {new Date(
                        Number(order.createdAt) / 1_000_000,
                      ).toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                      })}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[120px] truncate">
                      {`${String(order.userId).slice(0, 12)}…`}
                    </td>
                    <td className="px-4 py-3 text-center font-medium text-foreground">
                      {order.items.length}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-foreground whitespace-nowrap">
                      ₹{Number(order.total).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Select
                        value={order.status}
                        onValueChange={(status) =>
                          updateStatus.mutate(
                            { id: order.id, status: status as OrderStatus },
                            {
                              onSuccess: () =>
                                toast.success("Order status updated"),
                              onError: () =>
                                toast.error("Failed to update status"),
                            },
                          )
                        }
                      >
                        <SelectTrigger
                          className="h-7 w-36 text-xs border-0 p-0 focus:ring-0"
                          data-ocid="order-status-select"
                        >
                          <SelectValue>
                            <Badge
                              className={`capitalize text-xs ${statusColors[order.status] ?? "bg-muted text-muted-foreground"}`}
                            >
                              {order.status}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {ALL_STATUSES.map((s) => (
                            <SelectItem key={s} value={s} className="text-xs">
                              <span className="capitalize">{s}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-7 text-xs"
                        data-ocid="view-order-btn"
                      >
                        <a href={`/orders/${order.id}`}>View</a>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}
