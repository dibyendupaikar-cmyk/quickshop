import Map "mo:core/Map";
import Time "mo:core/Time";
import OrderTypes "../types/order";
import ProductTypes "../types/product";
import CouponTypes "../types/coupon";
import Common "../types/common";

module {
  /// Validates the coupon (if provided) and returns the discount amount.
  /// Does NOT increment usedCount — caller is responsible after successful order.
  func computeDiscount(
    coupons : Map.Map<Common.CouponCode, CouponTypes.Coupon>,
    couponCode : ?Common.CouponCode,
    subtotal : Nat,
  ) : (Nat, ?CouponTypes.Coupon) {
    switch (couponCode) {
      case (null) { (0, null) };
      case (?code) {
        switch (coupons.get(code)) {
          case (null) { (0, null) };
          case (?coupon) {
            if (not coupon.isActive) { return (0, null) };
            let now = Time.now();
            if (now > coupon.expiryDate) { return (0, null) };
            if (coupon.usedCount >= coupon.maxUses) { return (0, null) };
            let discount = switch (coupon.discountType) {
              case (#Percentage) {
                let d = subtotal * coupon.discountValue / 100;
                if (d > subtotal) subtotal else d;
              };
              case (#FixedAmount) {
                if (coupon.discountValue > subtotal) subtotal else coupon.discountValue;
              };
            };
            (discount, ?coupon);
          };
        };
      };
    };
  };

  public func createOrder(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    coupons : Map.Map<Common.CouponCode, CouponTypes.Coupon>,
    nextId : Nat,
    userId : Common.UserId,
    items : [OrderTypes.CartItem],
    couponCode : ?Common.CouponCode,
    shippingAddress : OrderTypes.ShippingAddress,
  ) : (OrderTypes.OrderResult, Nat) {
    if (items.size() == 0) {
      return (#err("Cart is empty"), nextId);
    };

    // Validate all items and compute subtotal
    var subtotal : Nat = 0;
    var orderItems : [OrderTypes.OrderItem] = [];

    for (cartItem in items.values()) {
      if (cartItem.quantity == 0) {
        return (#err("Item quantity must be greater than zero"), nextId);
      };
      switch (products.get(cartItem.productId)) {
        case (null) {
          return (#err("Product not found: " # cartItem.productId.toText()), nextId);
        };
        case (?product) {
          if (product.stockCount < cartItem.quantity) {
            return (#err("Insufficient stock for product: " # product.name), nextId);
          };
          let lineTotal = product.price * cartItem.quantity;
          subtotal += lineTotal;
          let orderItem : OrderTypes.OrderItem = {
            productId = cartItem.productId;
            quantity = cartItem.quantity;
            priceAtPurchase = product.price;
          };
          orderItems := orderItems.concat([orderItem]);
        };
      };
    };

    // Validate coupon and compute discount
    let (discount, couponOpt) = computeDiscount(coupons, couponCode, subtotal);
    let total = if (discount >= subtotal) 0 else subtotal - discount;

    // Deduct stock
    for (cartItem in items.values()) {
      switch (products.get(cartItem.productId)) {
        case (null) {};
        case (?product) {
          let updated = { product with stockCount = product.stockCount - cartItem.quantity };
          products.add(cartItem.productId, updated);
        };
      };
    };

    // Increment coupon usedCount
    switch (couponOpt) {
      case (null) {};
      case (?coupon) {
        let updated = { coupon with usedCount = coupon.usedCount + 1 };
        coupons.add(coupon.code, updated);
      };
    };

    let now = Time.now();
    let orderId = nextId;
    let order : OrderTypes.Order = {
      id = orderId;
      userId = userId;
      items = orderItems;
      total = total;
      discount = discount;
      couponCode = couponCode;
      status = #Pending;
      shippingAddress = shippingAddress;
      createdAt = now;
      updatedAt = now;
    };

    orders.add(orderId, order);
    (#ok(order), nextId + 1);
  };

  public func getOrders(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    userId : Common.UserId,
  ) : [OrderTypes.Order] {
    orders.values()
      .filter(func(o : OrderTypes.Order) : Bool { o.userId == userId })
      .toArray();
  };

  public func getOrder(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    userId : Common.UserId,
    id : Common.OrderId,
  ) : ?OrderTypes.Order {
    switch (orders.get(id)) {
      case (null) { null };
      case (?order) {
        if (order.userId == userId) { ?order } else { null };
      };
    };
  };

  public func getAllOrders(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>
  ) : [OrderTypes.Order] {
    orders.values().toArray();
  };

  public func updateOrderStatus(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    id : Common.OrderId,
    status : OrderTypes.OrderStatus,
  ) : ?OrderTypes.Order {
    switch (orders.get(id)) {
      case (null) { null };
      case (?order) {
        let updated = { order with status = status; updatedAt = Time.now() };
        orders.add(id, updated);
        ?updated;
      };
    };
  };
};
