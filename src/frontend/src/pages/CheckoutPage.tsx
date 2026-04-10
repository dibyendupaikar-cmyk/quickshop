import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  useCreateCheckoutSession,
  useCreateOrder,
  useValidateCoupon,
} from "@/hooks/useBackend";
import { useCartStore } from "@/store/cartStore";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  Tag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Step = "shipping" | "review" | "payment";

const STEPS: { id: Step; label: string; icon: typeof MapPin }[] = [
  { id: "shipping", label: "Shipping", icon: MapPin },
  { id: "review", label: "Review", icon: Package },
  { id: "payment", label: "Payment", icon: CreditCard },
];

function StepIndicator({ current }: { current: Step }) {
  const currentIndex = STEPS.findIndex((s) => s.id === current);
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                active
                  ? "bg-primary text-primary-foreground shadow-md"
                  : done
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Icon className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-6 sm:w-10 mx-1 transition-smooth ${
                  done ? "bg-primary/40" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface CheckoutForm {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("shipping");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const validateCoupon = useValidateCoupon();
  const createOrder = useCreateOrder();
  const createCheckoutSession = useCreateCheckoutSession();

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<CheckoutForm>({
    defaultValues: { country: "IN" },
  });

  const finalTotal = Math.max(0, total() - discount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    validateCoupon.mutate(couponCode.trim(), {
      onSuccess: (coupon) => {
        if (!coupon) {
          toast.error("Invalid or expired coupon");
          return;
        }
        const amt =
          coupon.discountType === "percentage"
            ? (total() * coupon.discountValue) / 100
            : coupon.discountValue;
        const capped = Math.min(amt, total());
        setDiscount(capped);
        setAppliedCoupon(couponCode.trim());
        toast.success(`Coupon applied — ₹${Math.round(capped)} saved!`);
      },
      onError: () => toast.error("Could not apply coupon"),
    });
  };

  const handleNextStep = async () => {
    if (step === "shipping") {
      const valid = await trigger([
        "name",
        "street",
        "city",
        "state",
        "postalCode",
        "country",
      ]);
      if (valid) setStep("review");
    } else if (step === "review") {
      setStep("payment");
    }
  };

  const onSubmit = async (data: CheckoutForm) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      // Step 1: Create order on backend
      const cartItems = items.map((item) => ({
        productId: BigInt(item.product.id),
        quantity: BigInt(item.quantity),
      }));

      const shippingAddress = {
        name: data.name,
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      };

      const orderResult = await createOrder.mutateAsync({
        items: cartItems,
        couponCode: appliedCoupon || null,
        shippingAddress,
      });

      if (!orderResult) throw new Error("Order creation failed");

      // Step 2: Create Stripe checkout session
      const shoppingItems = items.map((item) => ({
        productName: item.product.name,
        productDescription: item.product.description.slice(0, 100),
        currency: "inr",
        priceInCents: BigInt(Math.round(item.product.price * 100)),
        quantity: BigInt(item.quantity),
      }));

      const sessionJson =
        await createCheckoutSession.mutateAsync(shoppingItems);
      const session = JSON.parse(sessionJson) as { id?: string; url?: string };

      if (!session?.url) throw new Error("Stripe session missing payment URL");

      // Clear cart and redirect to Stripe
      clearCart();
      window.location.href = session.url;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    }
  };

  const isSubmitting = createOrder.isPending || createCheckoutSession.isPending;

  return (
    <ProtectedRoute>
      <div className="container max-w-5xl py-8 animate-fade-in">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
          Checkout
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          {items.length} item{items.length !== 1 ? "s" : ""} · ₹
          {Math.round(finalTotal).toLocaleString()} total
        </p>

        <StepIndicator current={step} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main content panel */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* ── Step 1: Shipping ── */}
                {step === "shipping" && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="bg-card border border-border rounded-xl p-6"
                  >
                    <h2 className="font-display font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Shipping Address
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Arjun Sharma"
                          {...register("name", {
                            required: "Full name is required",
                          })}
                          className="mt-1"
                          data-ocid="checkout-name"
                        />
                        {errors.name && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          placeholder="42 Mahatma Gandhi Road, Apt 3B"
                          {...register("street", {
                            required: "Street address is required",
                          })}
                          className="mt-1"
                          data-ocid="checkout-street"
                        />
                        {errors.street && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="Mumbai"
                          {...register("city", {
                            required: "City is required",
                          })}
                          className="mt-1"
                          data-ocid="checkout-city"
                        />
                        {errors.city && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="Maharashtra"
                          {...register("state", {
                            required: "State is required",
                          })}
                          className="mt-1"
                          data-ocid="checkout-state"
                        />
                        {errors.state && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          placeholder="400001"
                          {...register("postalCode", {
                            required: "Postal code is required",
                            pattern: {
                              value: /^\d{4,10}$/,
                              message: "Enter a valid postal code",
                            },
                          })}
                          className="mt-1"
                          data-ocid="checkout-postalcode"
                        />
                        {errors.postalCode && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.postalCode.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          placeholder="IN"
                          {...register("country", {
                            required: "Country is required",
                          })}
                          className="mt-1"
                          data-ocid="checkout-country"
                        />
                        {errors.country && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        data-ocid="next-to-review-btn"
                      >
                        Review Order
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Order Review ── */}
                {step === "review" && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h2 className="font-display font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        Order Items
                      </h2>
                      <div className="space-y-3">
                        {items.map(({ product, quantity }) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-3"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground line-clamp-1">
                                {product.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {quantity}
                              </p>
                            </div>
                            <span className="text-sm font-semibold text-foreground shrink-0">
                              ₹{(product.price * quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping address summary */}
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h2 className="font-display font-semibold text-base text-foreground mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Delivering to
                      </h2>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        <p className="font-medium text-foreground">
                          {getValues("name")}
                        </p>
                        <p>{getValues("street")}</p>
                        <p>
                          {getValues("city")}, {getValues("state")} –{" "}
                          {getValues("postalCode")}
                        </p>
                        <p>{getValues("country")}</p>
                      </div>
                    </div>

                    {/* Coupon */}
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h2 className="font-display font-semibold text-base text-foreground mb-3 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        Coupon Code
                      </h2>
                      {discount > 0 ? (
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="text-sm py-1 px-3"
                          >
                            {appliedCoupon}
                          </Badge>
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                            −₹{Math.round(discount).toLocaleString()} applied!
                          </span>
                        </div>
                      ) : (
                        <div className="flex gap-2" data-ocid="coupon-section">
                          <Input
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleApplyCoupon();
                              }
                            }}
                            className="text-sm"
                            data-ocid="coupon-input"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleApplyCoupon}
                            disabled={
                              validateCoupon.isPending || !couponCode.trim()
                            }
                            data-ocid="apply-coupon-btn"
                          >
                            {validateCoupon.isPending ? "…" : "Apply"}
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("shipping")}
                        data-ocid="back-to-shipping-btn"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        data-ocid="next-to-payment-btn"
                      >
                        Proceed to Payment
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 3: Payment ── */}
                {step === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="bg-card border border-border rounded-xl p-6"
                  >
                    <h2 className="font-display font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Secure Payment via Stripe
                    </h2>
                    <div className="bg-muted/40 rounded-lg p-4 mb-6 border border-border">
                      <p className="text-sm text-muted-foreground">
                        You'll be redirected to Stripe's secure checkout page to
                        complete your payment. We accept all major credit/debit
                        cards, UPI, and net banking.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                      <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      256-bit SSL encrypted · PCI DSS compliant
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("review")}
                        data-ocid="back-to-review-btn"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting || items.length === 0}
                        className="min-w-[160px]"
                        data-ocid="place-order-btn"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            {createOrder.isPending
                              ? "Creating order…"
                              : "Redirecting…"}
                          </span>
                        ) : (
                          <>
                            Pay ₹{Math.round(finalTotal).toLocaleString()}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary sidebar */}
            <div>
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="font-display font-bold text-base text-foreground mb-4">
                  Order Summary
                </h2>
                <div className="space-y-2 mb-4">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex justify-between text-sm gap-2"
                    >
                      <span className="text-muted-foreground line-clamp-1 flex-1">
                        {product.name} ×{quantity}
                      </span>
                      <span className="font-medium shrink-0">
                        ₹{(product.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="mb-4" />
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{total().toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Coupon ({appliedCoupon})</span>
                      <span>−₹{Math.round(discount).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <Badge variant="secondary" className="text-xs">
                      Free
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-foreground text-base pt-2 border-t border-border">
                  <span>Total</span>
                  <span>₹{Math.round(finalTotal).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
