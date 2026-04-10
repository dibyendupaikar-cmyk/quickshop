import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import CouponTypes "../types/coupon";
import Common "../types/common";

module {
  public func createCoupon(
    coupons : Map.Map<Common.CouponCode, CouponTypes.Coupon>,
    input : CouponTypes.CouponInput,
  ) : CouponTypes.Coupon {
    if (coupons.containsKey(input.code)) {
      Runtime.trap("Coupon code already exists");
    };
    let coupon : CouponTypes.Coupon = {
      code = input.code;
      discountType = input.discountType;
      discountValue = input.discountValue;
      expiryDate = input.expiryDate;
      isActive = input.isActive;
      maxUses = input.maxUses;
      usedCount = 0;
    };
    coupons.add(input.code, coupon);
    coupon;
  };

  public func updateCoupon(
    coupons : Map.Map<Common.CouponCode, CouponTypes.Coupon>,
    code : Common.CouponCode,
    input : CouponTypes.CouponInput,
  ) : ?CouponTypes.Coupon {
    switch (coupons.get(code)) {
      case null { null };
      case (?existing) {
        let updated : CouponTypes.Coupon = {
          existing with
          discountType = input.discountType;
          discountValue = input.discountValue;
          expiryDate = input.expiryDate;
          isActive = input.isActive;
          maxUses = input.maxUses;
        };
        coupons.add(code, updated);
        ?updated;
      };
    };
  };

  public func deleteCoupon(
    coupons : Map.Map<Common.CouponCode, CouponTypes.Coupon>,
    code : Common.CouponCode,
  ) : Bool {
    if (coupons.containsKey(code)) {
      coupons.remove(code);
      true;
    } else {
      false;
    };
  };

  public func validateCoupon(
    coupons : Map.Map<Common.CouponCode, CouponTypes.Coupon>,
    code : Common.CouponCode,
    orderTotal : Nat,
  ) : Nat {
    let coupon = switch (coupons.get(code)) {
      case null { Runtime.trap("Coupon not found") };
      case (?c) { c };
    };
    if (not coupon.isActive) {
      Runtime.trap("Coupon is not active");
    };
    if (Time.now() > coupon.expiryDate) {
      Runtime.trap("Coupon has expired");
    };
    if (coupon.maxUses > 0 and coupon.usedCount >= coupon.maxUses) {
      Runtime.trap("Coupon has reached its maximum uses");
    };
    switch (coupon.discountType) {
      case (#Percentage) {
        // Cap percentage discount at 100%
        let pct = if (coupon.discountValue > 100) { 100 } else { coupon.discountValue };
        orderTotal * pct / 100;
      };
      case (#FixedAmount) {
        if (coupon.discountValue > orderTotal) { orderTotal } else { coupon.discountValue };
      };
    };
  };

  /// Increment used count after a coupon is successfully applied to an order
  public func incrementCouponUsage(
    coupons : Map.Map<Common.CouponCode, CouponTypes.Coupon>,
    code : Common.CouponCode,
  ) {
    switch (coupons.get(code)) {
      case null {};
      case (?coupon) {
        coupons.add(code, { coupon with usedCount = coupon.usedCount + 1 });
      };
    };
  };
};
