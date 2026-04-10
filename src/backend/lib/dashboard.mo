import Map "mo:core/Map";
import DashboardTypes "../types/dashboard";
import ProductTypes "../types/product";
import OrderTypes "../types/order";
import CouponTypes "../types/coupon";
import Common "../types/common";

module {
  public func getDashboardStats(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    coupons : Map.Map<Common.CouponCode, CouponTypes.Coupon>,
    totalUsers : Nat,
  ) : DashboardTypes.DashboardStats {
    var totalRevenue : Nat = 0;
    var pendingOrders : Nat = 0;

    for ((_, order) in orders.entries()) {
      totalRevenue += order.total;
      switch (order.status) {
        case (#Pending) { pendingOrders += 1 };
        case (_) {};
      };
    };

    {
      totalProducts = products.size();
      totalOrders = orders.size();
      totalRevenue;
      pendingOrders;
      totalUsers;
      totalCoupons = coupons.size();
    };
  };
};
