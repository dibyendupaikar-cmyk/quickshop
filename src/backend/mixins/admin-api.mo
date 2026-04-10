import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import DashboardLib "../lib/dashboard";
import DashboardTypes "../types/dashboard";
import ProductTypes "../types/product";
import OrderTypes "../types/order";
import CouponTypes "../types/coupon";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, ProductTypes.Product>,
  orders : Map.Map<Common.OrderId, OrderTypes.Order>,
  coupons : Map.Map<Common.CouponCode, CouponTypes.Coupon>,
  totalUsers : Nat,
) {
  /// Admin: get store dashboard statistics
  public query ({ caller }) func getDashboardStats() : async DashboardTypes.DashboardStats {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access dashboard stats");
    };
    DashboardLib.getDashboardStats(products, orders, coupons, totalUsers);
  };
};
