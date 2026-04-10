import Common "common";

module {
  public type DiscountType = {
    #Percentage;
    #FixedAmount;
  };

  public type Coupon = {
    code : Common.CouponCode;
    discountType : DiscountType;
    discountValue : Nat;
    expiryDate : Common.Timestamp;
    isActive : Bool;
    maxUses : Nat;
    usedCount : Nat;
  };

  public type CouponInput = {
    code : Common.CouponCode;
    discountType : DiscountType;
    discountValue : Nat;
    expiryDate : Common.Timestamp;
    isActive : Bool;
    maxUses : Nat;
  };
};
