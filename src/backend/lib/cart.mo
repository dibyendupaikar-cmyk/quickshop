import Map "mo:core/Map";
import List "mo:core/List";
import OrderTypes "../types/order";
import Common "../types/common";

module {
  public func getCart(
    carts : Map.Map<Common.UserId, List.List<OrderTypes.CartItem>>,
    userId : Common.UserId,
  ) : [OrderTypes.CartItem] {
    switch (carts.get(userId)) {
      case (?items) { items.toArray() };
      case null { [] };
    };
  };

  public func addToCart(
    carts : Map.Map<Common.UserId, List.List<OrderTypes.CartItem>>,
    userId : Common.UserId,
    productId : Common.ProductId,
    quantity : Nat,
  ) {
    let items = switch (carts.get(userId)) {
      case (?existing) { existing };
      case null {
        let newList = List.empty<OrderTypes.CartItem>();
        carts.add(userId, newList);
        newList;
      };
    };
    // Upsert: update quantity if product already in cart
    var found = false;
    items.mapInPlace(
      func(item) {
        if (item.productId == productId) {
          found := true;
          { item with quantity = item.quantity + quantity };
        } else {
          item;
        };
      }
    );
    if (not found) {
      items.add({ productId; quantity });
    };
  };

  public func removeFromCart(
    carts : Map.Map<Common.UserId, List.List<OrderTypes.CartItem>>,
    userId : Common.UserId,
    productId : Common.ProductId,
  ) {
    switch (carts.get(userId)) {
      case (?items) {
        let filtered = items.filter(func(item) { item.productId != productId });
        carts.add(userId, filtered);
      };
      case null {};
    };
  };

  public func getWishlist(
    wishlists : Map.Map<Common.UserId, List.List<OrderTypes.WishlistItem>>,
    userId : Common.UserId,
  ) : [OrderTypes.WishlistItem] {
    switch (wishlists.get(userId)) {
      case (?items) { items.toArray() };
      case null { [] };
    };
  };

  public func addToWishlist(
    wishlists : Map.Map<Common.UserId, List.List<OrderTypes.WishlistItem>>,
    userId : Common.UserId,
    productId : Common.ProductId,
  ) {
    let items = switch (wishlists.get(userId)) {
      case (?existing) { existing };
      case null {
        let newList = List.empty<OrderTypes.WishlistItem>();
        wishlists.add(userId, newList);
        newList;
      };
    };
    // Only add if not already in wishlist
    let alreadyAdded = items.find(func(item) { item.productId == productId });
    switch (alreadyAdded) {
      case null { items.add({ productId }) };
      case (?_) {};
    };
  };

  public func removeFromWishlist(
    wishlists : Map.Map<Common.UserId, List.List<OrderTypes.WishlistItem>>,
    userId : Common.UserId,
    productId : Common.ProductId,
  ) {
    switch (wishlists.get(userId)) {
      case (?items) {
        let filtered = items.filter(func(item) { item.productId != productId });
        wishlists.add(userId, filtered);
      };
      case null {};
    };
  };
};
