import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";
import Common "types/common";
import ProductTypes "types/product";
import OrderTypes "types/order";
import CouponTypes "types/coupon";
import ProductLib "lib/product";
import CatalogApi "mixins/catalog-api";
import CartApi "mixins/cart-api";
import OrderApi "mixins/order-api";
import CouponApi "mixins/coupon-api";
import AdminApi "mixins/admin-api";

actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Object Storage (product images) ---
  include MixinObjectStorage();

  // --- Product catalog state ---
  let products = Map.empty<Common.ProductId, ProductTypes.Product>();
  let reviews = List.empty<ProductTypes.Review>();
  let nextProductId : Common.Counter = Common.newCounter(ProductLib.seedProducts(products, 0));
  let nextReviewId : Common.Counter = Common.newCounter(0);

  // --- Cart & Wishlist state ---
  let carts = Map.empty<Common.UserId, List.List<OrderTypes.CartItem>>();
  let wishlists = Map.empty<Common.UserId, List.List<OrderTypes.WishlistItem>>();

  // --- Order state ---
  let orders = Map.empty<Common.OrderId, OrderTypes.Order>();
  let nextOrderId : Common.Counter = Common.newCounter(0);

  // --- Coupon state ---
  let coupons = Map.empty<Common.CouponCode, CouponTypes.Coupon>();

  // --- User count (tracked on registration events) ---
  let totalUsers : Nat = 0;

  // --- Stripe configuration ---
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  // --- Mixins ---
  include CatalogApi(accessControlState, products, reviews, nextProductId, nextReviewId);
  include CartApi(accessControlState, carts, wishlists);
  include OrderApi(accessControlState, orders, products, coupons, nextOrderId);
  include CouponApi(accessControlState, coupons);
  include AdminApi(accessControlState, products, orders, coupons, totalUsers);

  // --- Stripe API ---
  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfiguration := ?config;
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    let config = switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?c) { c };
    };
    await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let config = switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?c) { c };
    };
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
