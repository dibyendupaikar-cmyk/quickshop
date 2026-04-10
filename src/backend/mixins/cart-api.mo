import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CartLib "../lib/cart";
import OrderTypes "../types/order";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : Map.Map<Common.UserId, List.List<OrderTypes.CartItem>>,
  wishlists : Map.Map<Common.UserId, List.List<OrderTypes.WishlistItem>>,
) {
  /// Authenticated: get current user's cart
  public query ({ caller }) func getCart() : async [OrderTypes.CartItem] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view cart");
    };
    CartLib.getCart(carts, caller);
  };

  /// Authenticated: add item to cart
  public shared ({ caller }) func addToCart(productId : Common.ProductId, quantity : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to modify cart");
    };
    CartLib.addToCart(carts, caller, productId, quantity);
  };

  /// Authenticated: remove item from cart
  public shared ({ caller }) func removeFromCart(productId : Common.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to modify cart");
    };
    CartLib.removeFromCart(carts, caller, productId);
  };

  /// Authenticated: get current user's wishlist
  public query ({ caller }) func getWishlist() : async [OrderTypes.WishlistItem] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view wishlist");
    };
    CartLib.getWishlist(wishlists, caller);
  };

  /// Authenticated: add item to wishlist
  public shared ({ caller }) func addToWishlist(productId : Common.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to modify wishlist");
    };
    CartLib.addToWishlist(wishlists, caller, productId);
  };

  /// Authenticated: remove item from wishlist
  public shared ({ caller }) func removeFromWishlist(productId : Common.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to modify wishlist");
    };
    CartLib.removeFromWishlist(wishlists, caller, productId);
  };
};
