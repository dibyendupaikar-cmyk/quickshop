import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Package, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function CheckoutSuccess() {
  const { clearCart } = useCartStore();
  // Cart may already be cleared from CheckoutPage; clear again as safety net
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  // Try to parse session_id from Stripe redirect params
  let sessionId: string | null = null;
  try {
    const params = new URLSearchParams(window.location.search);
    sessionId = params.get("session_id");
  } catch {
    // ignore
  }

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-4"
      data-ocid="checkout-success"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 14,
            }}
            className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </motion.div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-elevated">
          <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground text-sm mb-4">
            Thank you for your purchase. Your payment was successful and your
            order is being prepared.
          </p>

          {sessionId && (
            <div
              className="bg-muted/50 rounded-lg px-4 py-2 mb-4 text-xs text-muted-foreground font-mono truncate"
              data-ocid="order-session-id"
            >
              Session: {sessionId}
            </div>
          )}

          <Separator className="my-4" />

          {/* What's next */}
          <div className="space-y-3 mb-6 text-left">
            {[
              {
                icon: Package,
                title: "Order Processing",
                desc: "We're preparing your items for shipment.",
              },
              {
                icon: ShoppingBag,
                title: "Shipping Updates",
                desc: "You'll receive tracking info once dispatched.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="flex-1"
              data-ocid="view-orders-btn"
            >
              <Link to="/orders">
                <Package className="w-4 h-4 mr-2" />
                Track Order
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="flex-1"
              data-ocid="continue-shopping-btn"
            >
              <Link to="/">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Keep Shopping
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
