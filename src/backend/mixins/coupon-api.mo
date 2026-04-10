import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CouponLib "../lib/coupon";
import CouponTypes "../types/coupon";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  coupons : Map.Map<Common.CouponCode, CouponTypes.Coupon>,
) {
  /// Admin: create a new coupon
  public shared ({ caller }) func createCoupon(input : CouponTypes.CouponInput) : async CouponTypes.Coupon {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create coupons");
    };
    CouponLib.createCoupon(coupons, input);
  };

  /// Admin: update an existing coupon
  public shared ({ caller }) func updateCoupon(code : Common.CouponCode, input : CouponTypes.CouponInput) : async ?CouponTypes.Coupon {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update coupons");
    };
    CouponLib.updateCoupon(coupons, code, input);
  };

  /// Admin: delete a coupon
  public shared ({ caller }) func deleteCoupon(code : Common.CouponCode) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete coupons");
    };
    CouponLib.deleteCoupon(coupons, code);
  };

  /// Public: validate a coupon and return the discount amount for the given order total
  public query func validateCoupon(code : Common.CouponCode, orderTotal : Nat) : async Nat {
    CouponLib.validateCoupon(coupons, code, orderTotal);
  };
};
