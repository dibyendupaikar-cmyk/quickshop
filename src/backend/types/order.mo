import Common "common";

module {
  public type OrderStatus = {
    #Pending;
    #Processing;
    #Shipped;
    #Delivered;
    #Cancelled;
  };

  public type CartItem = {
    productId : Common.ProductId;
    quantity : Nat;
  };

  public type WishlistItem = {
    productId : Common.ProductId;
  };

  public type ShippingAddress = {
    name : Text;
    street : Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
  };

  public type OrderItem = {
    productId : Common.ProductId;
    quantity : Nat;
    priceAtPurchase : Nat;
  };

  public type Order = {
    id : Common.OrderId;
    userId : Common.UserId;
    items : [OrderItem];
    total : Nat;
    discount : Nat;
    couponCode : ?Common.CouponCode;
    status : OrderStatus;
    shippingAddress : ShippingAddress;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type OrderResult = {
    #ok : Order;
    #err : Text;
  };
};
