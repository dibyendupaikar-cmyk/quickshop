import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import EmailClient "mo:caffeineai-email/emailClient";
import OrderLib "../lib/order";
import OrderTypes "../types/order";
import ProductTypes "../types/product";
import CouponTypes "../types/coupon";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Common.OrderId, OrderTypes.Order>,
  products : Map.Map<Common.ProductId, ProductTypes.Product>,
  coupons : Map.Map<Common.CouponCode, CouponTypes.Coupon>,
  nextOrderId : Common.Counter,
) {
  /// Build a human-readable items summary for emails
  func formatOrderItems(items : [OrderTypes.OrderItem]) : Text {
    var lines = "";
    for (item in items.values()) {
      lines := lines # "<li>Product #" # item.productId.toText()
        # " x" # item.quantity.toText()
        # " @ " # item.priceAtPurchase.toText() # " units</li>";
    };
    lines;
  };

  func statusToText(status : OrderTypes.OrderStatus) : Text {
    switch (status) {
      case (#Pending)    { "Pending" };
      case (#Processing) { "Processing" };
      case (#Shipped)    { "Shipped" };
      case (#Delivered)  { "Delivered" };
      case (#Cancelled)  { "Cancelled" };
    };
  };

  /// Send order confirmation email (fire-and-forget — errors are ignored to not block order creation)
  func sendOrderConfirmationEmail(order : OrderTypes.Order, callerEmail : Text) : async () {
    let itemsHtml = formatOrderItems(order.items);
    let couponLine = switch (order.couponCode) {
      case (null)      { "" };
      case (?code) { "<p>Coupon applied: <strong>" # code # "</strong> — Discount: " # order.discount.toText() # "</p>" };
    };
    let body = "<h2>Order Confirmation — QuickShop</h2>"
      # "<p>Your order <strong>#" # order.id.toText() # "</strong> has been placed successfully.</p>"
      # "<ul>" # itemsHtml # "</ul>"
      # couponLine
      # "<p><strong>Total: " # order.total.toText() # "</strong></p>"
      # "<p>We will notify you when your order ships.</p>";
    let _ = await EmailClient.sendServiceEmail(
      "no-reply",
      [callerEmail],
      "Order #" # order.id.toText() # " Confirmed — QuickShop",
      body,
    );
  };

  /// Send order status update email
  func sendStatusUpdateEmail(order : OrderTypes.Order, recipientEmail : Text) : async () {
    let newStatus = statusToText(order.status);
    let body = "<h2>Order Status Update — QuickShop</h2>"
      # "<p>Your order <strong>#" # order.id.toText() # "</strong> status has been updated to: <strong>" # newStatus # "</strong>.</p>"
      # "<p>Thank you for shopping with QuickShop!</p>";
    let _ = await EmailClient.sendServiceEmail(
      "no-reply",
      [recipientEmail],
      "Order #" # order.id.toText() # " Status: " # newStatus # " — QuickShop",
      body,
    );
  };

  /// Authenticated: place a new order
  public shared ({ caller }) func createOrder(
    items : [OrderTypes.CartItem],
    couponCode : ?Common.CouponCode,
    shippingAddress : OrderTypes.ShippingAddress,
    emailAddress : Text,
  ) : async OrderTypes.OrderResult {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to place an order");
    };
    let (result, newNextId) = OrderLib.createOrder(
      orders,
      products,
      coupons,
      nextOrderId.value,
      caller,
      items,
      couponCode,
      shippingAddress,
    );
    switch (result) {
      case (#ok(order)) {
        nextOrderId.value := newNextId;
        ignore sendOrderConfirmationEmail(order, emailAddress);
        #ok(order);
      };
      case (#err(msg)) { #err(msg) };
    };
  };

  /// Authenticated: list current user's orders
  public query ({ caller }) func getOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view orders");
    };
    OrderLib.getOrders(orders, caller);
  };

  /// Authenticated: get a specific order by ID (must belong to caller)
  public query ({ caller }) func getOrder(id : Common.OrderId) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view orders");
    };
    OrderLib.getOrder(orders, caller, id);
  };

  /// Admin: list all orders across all users
  public query ({ caller }) func getAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    OrderLib.getAllOrders(orders);
  };

  /// Admin: update the status of an order
  public shared ({ caller }) func updateOrderStatus(
    id : Common.OrderId,
    status : OrderTypes.OrderStatus,
    recipientEmail : Text,
  ) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    let result = OrderLib.updateOrderStatus(orders, id, status);
    switch (result) {
      case (?order) {
        ignore sendStatusUpdateEmail(order, recipientEmail);
        ?order;
      };
      case (null) { null };
    };
  };
};
