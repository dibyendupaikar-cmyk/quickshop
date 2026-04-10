import { AdminLayout } from "@/components/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  useCoupons,
  useCreateCoupon,
  useDeleteCoupon,
} from "@/hooks/useBackend";
import type { Coupon } from "@/types/index";
import {
  CalendarDays,
  DollarSign,
  Percent,
  Plus,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type CouponFormData = Omit<Coupon, "id" | "usedCount">;

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c"];

export default function AdminCoupons() {
  const { data: coupons, isLoading } = useCoupons();
  const createCoupon = useCreateCoupon();
  const deleteCoupon = useDeleteCoupon();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CouponFormData>({
    defaultValues: {
      discountType: "percentage",
      isActive: true,
      maxUses: 100,
      minOrderAmount: 0,
    },
  });

  const onSubmit = (data: CouponFormData) => {
    const payload = {
      ...data,
      code: data.code.toUpperCase(),
      expiresAt: data.expiresAt
        ? new Date(data.expiresAt).getTime()
        : Date.now() + 30 * 24 * 60 * 60 * 1000,
    };
    createCoupon.mutate(payload, {
      onSuccess: () => {
        toast.success("Coupon created successfully");
        reset();
        setOpen(false);
      },
      onError: () => toast.error("Failed to create coupon"),
    });
  };

  const handleDelete = (coupon: Coupon) => {
    if (!confirm(`Delete coupon "${coupon.code}"? This cannot be undone.`))
      return;
    deleteCoupon.mutate(coupon.code, {
      onSuccess: () => toast.success("Coupon deleted"),
      onError: () => toast.error("Failed to delete coupon"),
    });
  };

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout
        title="Coupons"
        description="Manage discount codes and promotions"
      >
        {/* Header actions */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">
            {coupons?.length ?? 0} coupon{coupons?.length !== 1 ? "s" : ""}{" "}
            total
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" data-ocid="add-coupon-btn">
                <Plus className="w-4 h-4 mr-1.5" />
                New Coupon
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Coupon</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 pt-2"
              >
                {/* Code */}
                <div>
                  <Label htmlFor="coupon-code">Coupon Code</Label>
                  <Input
                    id="coupon-code"
                    placeholder="SAVE20"
                    className="mt-1.5 uppercase tracking-wider font-mono"
                    {...register("code", {
                      required: "Coupon code is required",
                    })}
                    data-ocid="coupon-code-input"
                  />
                  {errors.code && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.code.message}
                    </p>
                  )}
                </div>

                {/* Type + Value */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="coupon-type">Discount Type</Label>
                    <Controller
                      control={control}
                      name="discountType"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="coupon-type"
                            className="mt-1.5"
                            data-ocid="coupon-type-select"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">
                              Percentage (%)
                            </SelectItem>
                            <SelectItem value="fixed">
                              Fixed Amount (₹)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="coupon-value">Value</Label>
                    <Input
                      id="coupon-value"
                      type="number"
                      placeholder="20"
                      className="mt-1.5"
                      {...register("discountValue", {
                        required: "Value is required",
                        min: { value: 1, message: "Must be at least 1" },
                      })}
                      data-ocid="coupon-value-input"
                    />
                    {errors.discountValue && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.discountValue.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Min order + Max uses */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="coupon-min">Min Order (₹)</Label>
                    <Input
                      id="coupon-min"
                      type="number"
                      placeholder="0"
                      className="mt-1.5"
                      {...register("minOrderAmount", { min: 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="coupon-max-uses">Max Uses</Label>
                    <Input
                      id="coupon-max-uses"
                      type="number"
                      placeholder="100"
                      className="mt-1.5"
                      {...register("maxUses", { min: 1 })}
                      data-ocid="coupon-max-uses-input"
                    />
                  </div>
                </div>

                {/* Expiry */}
                <div>
                  <Label htmlFor="coupon-expiry">Expiry Date</Label>
                  <Input
                    id="coupon-expiry"
                    type="date"
                    className="mt-1.5"
                    {...register("expiresAt")}
                    data-ocid="coupon-expiry-input"
                  />
                </div>

                {/* Active toggle */}
                <div className="flex items-center justify-between py-1">
                  <div>
                    <Label htmlFor="coupon-active" className="cursor-pointer">
                      Active
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Coupon can be used by customers
                    </p>
                  </div>
                  <Controller
                    control={control}
                    name="isActive"
                    render={({ field }) => (
                      <Switch
                        id="coupon-active"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-ocid="coupon-active-toggle"
                      />
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={createCoupon.isPending}
                  data-ocid="create-coupon-submit"
                >
                  {createCoupon.isPending ? "Creating…" : "Create Coupon"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="h-36 rounded-xl" />
            ))}
          </div>
        ) : !coupons?.length ? (
          <div
            className="bg-card border border-border rounded-xl py-16 text-center"
            data-ocid="empty-coupons"
          >
            <Tag className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium text-foreground mb-1">No coupons yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first discount coupon to boost sales.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 transition-smooth hover:shadow-product"
                data-ocid="coupon-card"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <code className="font-mono font-bold text-base text-foreground tracking-wider bg-muted px-2 py-1 rounded-md">
                    {coupon.code}
                  </code>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge
                      className={
                        coupon.isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs"
                          : "bg-muted text-muted-foreground text-xs"
                      }
                    >
                      {coupon.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(coupon)}
                      aria-label={`Delete coupon ${coupon.code}`}
                      data-ocid="delete-coupon-btn"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Discount value */}
                <div className="flex items-center gap-2 text-sm">
                  {coupon.discountType === "percentage" ? (
                    <Percent className="w-4 h-4 text-primary shrink-0" />
                  ) : (
                    <DollarSign className="w-4 h-4 text-primary shrink-0" />
                  )}
                  <span className="font-semibold text-foreground">
                    {coupon.discountType === "percentage"
                      ? `${coupon.discountValue}% off`
                      : `₹${coupon.discountValue} off`}
                  </span>
                  {coupon.minOrderAmount > 0 && (
                    <span className="text-muted-foreground text-xs">
                      · min ₹{coupon.minOrderAmount}
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border">
                  <span>
                    Used:{" "}
                    <span className="font-medium text-foreground">
                      {coupon.usedCount}
                    </span>
                    /{coupon.maxUses}
                  </span>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    <span>
                      {new Date(coupon.expiresAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}
