import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductLib "../lib/product";
import ProductTypes "../types/product";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, ProductTypes.Product>,
  reviews : List.List<ProductTypes.Review>,
  nextProductId : Common.Counter,
  nextReviewId : Common.Counter,
) {
  /// Returns all products, optionally filtered by category
  public query func getProducts(category : ?ProductTypes.Category) : async [ProductTypes.Product] {
    ProductLib.getProducts(products, category)
  };

  /// Returns a single product by ID
  public query func getProduct(id : Common.ProductId) : async ?ProductTypes.Product {
    ProductLib.getProduct(products, id)
  };

  /// Returns all reviews for a given product
  public query func getProductReviews(productId : Common.ProductId) : async [ProductTypes.Review] {
    ProductLib.getProductReviews(reviews, productId)
  };

  /// Authenticated: submit a review for a product
  public shared ({ caller }) func addReview(input : ProductTypes.ReviewInput) : async ProductTypes.Review {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to submit a review");
    };
    let review = ProductLib.addReview(reviews, nextReviewId.value, caller, input);
    nextReviewId.value += 1;
    review
  };

  /// Admin: create a new product
  public shared ({ caller }) func createProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let product = ProductLib.createProduct(products, nextProductId.value, input);
    nextProductId.value += 1;
    product
  };

  /// Admin: update an existing product
  public shared ({ caller }) func updateProduct(id : Common.ProductId, input : ProductTypes.ProductInput) : async ?ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductLib.updateProduct(products, id, input)
  };

  /// Admin: delete a product by ID
  public shared ({ caller }) func deleteProduct(id : Common.ProductId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductLib.deleteProduct(products, id)
  };
};
