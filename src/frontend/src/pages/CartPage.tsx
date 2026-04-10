import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useValidateCoupon } from "@/hooks/useBackend";
import { useCartStore } from "@/store/cartStore";
import type { Coupon } from "@/types/index";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function CartContents() {
  const { items, removeItem, updateQuantity, total, clearCart, itemCount } =
    useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const validateCoupon = useValidateCoupon();

  const subtotal = total();
  const discount = appliedCoupon
    ? appliedCoupon.discountType === "percentage"
      ? Math.round((subtotal * appliedCoupon.discountValue) / 100)
      : appliedCoupon.discountValue
    : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const coupon = await validateCoupon.mutateAsync(
        couponCode.trim().toUpperCase(),
      );
      if (coupon?.isActive) {
        if (subtotal < coupon.minOrderAmount) {
          toast.error("Coupon not applicable", {
            description: `Minimum order amount is ₹${coupon.minOrderAmount.toLocaleString()}`,
          });
          return;
        }
        setAppliedCoupon(coupon);
        toast.success("Coupon applied!", {
          description: `You saved ₹${
            coupon.discountType === "percentage"
              ? Math.round((subtotal * coupon.discountValue) / 100)
              : coupon.discountValue
          }`,
        });
      } else {
        toast.error("Invalid coupon", {
          description: "This coupon code is not valid or has expired.",
        });
      }
    } catch {
      toast.error("Failed to validate coupon");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast("Coupon removed");
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-20 flex flex-col items-center gap-6 text-center"
        data-ocid="empty-cart"
      >
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xs">
            Looks like you haven't added anything yet. Discover amazing products
            and fill your cart!
          </p>
          <Button asChild size="lg" data-ocid="cart-shop-cta">
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">
          Shopping Cart
          <Badge variant="secondary" className="ml-3 text-sm font-medium">
            {itemCount()} {itemCount() === 1 ? "item" : "items"}
          </Badge>
        </h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-muted-foreground hover:text-destructive transition-smooth hidden md:block"
          data-ocid="clear-cart-btn"
        >
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence mode="popLayout">
            {items.map(({ product, quantity }) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex gap-4 bg-card border border-border rounded-xl p-4"
                data-ocid="cart-item"
              >
                {/* Product image */}
                <Link
                  to="/products/$id"
                  params={{ id: product.id }}
                  className="shrink-0"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-border transition-smooth hover:opacity-80"
                  />
                </Link>

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground capitalize mb-0.5">
                    {product.category}
                  </p>
                  <Link
                    to="/products/$id"
                    params={{ id: product.id }}
                    className="font-semibold text-foreground hover:text-primary transition-smooth line-clamp-2 text-sm leading-snug block"
                  >
                    {product.name}
                  </Link>
                  <p className="font-bold text-foreground mt-1.5 text-base">
                    ₹{product.price.toLocaleString()}
                  </p>
                  {/* Mobile: qty + remove inline */}
                  <div className="flex items-center gap-3 mt-3 md:hidden">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-2 hover:bg-muted transition-smooth"
                        aria-label="Decrease quantity"
                        data-ocid="cart-qty-decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span
                        className="w-8 text-center text-sm font-semibold"
                        data-ocid="cart-qty-value"
                      >
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-2 hover:bg-muted transition-smooth"
                        aria-label="Increase quantity"
                        data-ocid="cart-qty-increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="text-muted-foreground hover:text-destructive transition-smooth p-1"
                      aria-label={`Remove ${product.name}`}
                      data-ocid="cart-item-remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Desktop: right column controls + subtotal */}
                <div className="hidden md:flex flex-col items-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="text-muted-foreground hover:text-destructive transition-smooth"
                    aria-label={`Remove ${product.name} from cart`}
                    data-ocid="cart-item-remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-2 hover:bg-muted transition-smooth"
                      aria-label="Decrease quantity"
                      data-ocid="cart-qty-decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span
                      className="w-8 text-center text-sm font-semibold"
                      data-ocid="cart-qty-value"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-2 hover:bg-muted transition-smooth"
                      aria-label="Increase quantity"
                      data-ocid="cart-qty-increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    ₹{(product.price * quantity).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Mobile clear cart */}
          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-muted-foreground hover:text-destructive transition-smooth mt-1 md:hidden"
            data-ocid="clear-cart-btn-mobile"
          >
            Clear all items
          </button>
        </div>

        {/* Order Summary sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24"
          data-ocid="cart-summary"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-4">
            Order Summary
          </h2>

          {/* Coupon input */}
          <div className="mb-4" data-ocid="coupon-section">
            {appliedCoupon ? (
              <div className="flex items-center justify-between gap-2 bg-accent/10 border border-accent/30 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Tag className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm font-semibold text-foreground truncate">
                    {appliedCoupon.code}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  aria-label="Remove coupon"
                  className="text-muted-foreground hover:text-destructive transition-smooth shrink-0"
                  data-ocid="remove-coupon-btn"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  className="text-sm h-9"
                  data-ocid="coupon-input"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 h-9 px-4"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim() || validateCoupon.isPending}
                  data-ocid="apply-coupon-btn"
                >
                  Apply
                </Button>
              </div>
            )}
          </div>

          <Separator className="mb-4" />

          {/* Price breakdown */}
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>
                Subtotal ({itemCount()} {itemCount() === 1 ? "item" : "items"})
              </span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                Free
              </span>
            </div>
            {appliedCoupon && discount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium"
                data-ocid="discount-row"
              >
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Discount ({appliedCoupon.code})
                </span>
                <span>−₹{discount.toLocaleString()}</span>
              </motion.div>
            )}
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between font-bold text-foreground text-base mb-5">
            <span>Total</span>
            <span>₹{finalTotal.toLocaleString()}</span>
          </div>

          <Button
            asChild
            size="lg"
            className="w-full"
            data-ocid="proceed-to-checkout-btn"
          >
            <Link to="/checkout">Proceed to Checkout</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartContents />
    </ProtectedRoute>
  );
}
