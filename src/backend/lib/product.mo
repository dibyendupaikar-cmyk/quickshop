import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import ProductTypes "../types/product";
import Common "../types/common";

module {
  // ── Placeholder image blob used for seeded demo products ──────────────────
  let placeholderBlob : Storage.ExternalBlob = "";

  // ── Products ───────────────────────────────────────────────────────────────

  public func getProducts(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    category : ?ProductTypes.Category,
  ) : [ProductTypes.Product] {
    let iter = products.values();
    switch (category) {
      case null {
        List.fromIter<ProductTypes.Product>(iter).toArray()
      };
      case (?cat) {
        List.fromIter<ProductTypes.Product>(iter)
          .filter(func(p) { p.category == cat })
          .toArray()
      };
    };
  };

  public func getProduct(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    id : Common.ProductId,
  ) : ?ProductTypes.Product {
    products.get(id)
  };

  public func createProduct(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    nextId : Nat,
    input : ProductTypes.ProductInput,
  ) : ProductTypes.Product {
    let product : ProductTypes.Product = {
      id = nextId;
      name = input.name;
      description = input.description;
      price = input.price;
      category = input.category;
      image = input.image;
      stockCount = input.stockCount;
      createdAt = Time.now();
    };
    products.add(nextId, product);
    product
  };

  public func updateProduct(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    id : Common.ProductId,
    input : ProductTypes.ProductInput,
  ) : ?ProductTypes.Product {
    switch (products.get(id)) {
      case null null;
      case (?existing) {
        let updated : ProductTypes.Product = {
          existing with
          name = input.name;
          description = input.description;
          price = input.price;
          category = input.category;
          image = input.image;
          stockCount = input.stockCount;
        };
        products.add(id, updated);
        ?updated
      };
    }
  };

  public func deleteProduct(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    id : Common.ProductId,
  ) : Bool {
    if (products.containsKey(id)) {
      products.remove(id);
      true
    } else {
      false
    }
  };

  // ── Reviews ────────────────────────────────────────────────────────────────

  public func getProductReviews(
    reviews : List.List<ProductTypes.Review>,
    productId : Common.ProductId,
  ) : [ProductTypes.Review] {
    reviews.filter(func(r) { r.productId == productId }).toArray()
  };

  public func addReview(
    reviews : List.List<ProductTypes.Review>,
    nextId : Nat,
    caller : Common.UserId,
    input : ProductTypes.ReviewInput,
  ) : ProductTypes.Review {
    // Enforce one review per user per product
    let existing = reviews.find(func(r) {
      r.productId == input.productId and r.userId == caller
    });
    switch (existing) {
      case (?_) Runtime.trap("You have already reviewed this product");
      case null {};
    };

    if (input.rating < 1 or input.rating > 5) {
      Runtime.trap("Rating must be between 1 and 5")
    };

    let review : ProductTypes.Review = {
      id = nextId;
      productId = input.productId;
      userId = caller;
      rating = input.rating;
      comment = input.comment;
      createdAt = Time.now();
    };
    reviews.add(review);
    review
  };

  // ── Average Rating Helper ──────────────────────────────────────────────────

  public func getAverageRating(
    reviews : List.List<ProductTypes.Review>,
    productId : Common.ProductId,
  ) : ?Float {
    let productReviews = reviews.filter(func(r) { r.productId == productId });
    let count = productReviews.size();
    if (count == 0) return null;
    let total = productReviews.foldLeft(0.0, func(acc, r) { acc + r.rating.toFloat() });
    ?(total / count.toFloat())
  };

  // ── Sample Seed Data ───────────────────────────────────────────────────────

  public func seedProducts(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    nextProductId : Nat,
  ) : Nat {
    let now = Time.now();
    let seeds : [ProductTypes.ProductInput] = [
      // Clothing (4 items)
      { name = "Classic White T-Shirt"; description = "Premium cotton crew-neck tee, perfect for everyday wear."; price = 1299; category = #Clothing; image = placeholderBlob; stockCount = 100 },
      { name = "Slim Fit Jeans"; description = "Stretch denim slim-fit jeans in midnight blue."; price = 3499; category = #Clothing; image = placeholderBlob; stockCount = 60 },
      { name = "Hooded Sweatshirt"; description = "Cozy pullover hoodie with kangaroo pocket."; price = 2199; category = #Clothing; image = placeholderBlob; stockCount = 80 },
      { name = "Floral Summer Dress"; description = "Light chiffon midi dress with vibrant floral print."; price = 2799; category = #Clothing; image = placeholderBlob; stockCount = 45 },
      // Electronics (4 items)
      { name = "Wireless Earbuds"; description = "True wireless stereo earbuds with 24-hour battery life."; price = 4999; category = #Electronics; image = placeholderBlob; stockCount = 200 },
      { name = "Smart Watch"; description = "Fitness tracker with heart-rate monitor and GPS."; price = 8999; category = #Electronics; image = placeholderBlob; stockCount = 75 },
      { name = "Portable Charger 20000mAh"; description = "High-capacity power bank with dual USB-C ports."; price = 3299; category = #Electronics; image = placeholderBlob; stockCount = 150 },
      { name = "Bluetooth Speaker"; description = "Waterproof portable speaker with 360° surround sound."; price = 5499; category = #Electronics; image = placeholderBlob; stockCount = 90 },
      // Food (4 items)
      { name = "Organic Green Tea (50 bags)"; description = "Premium loose-leaf green tea bags sourced from Darjeeling."; price = 699; category = #Food; image = placeholderBlob; stockCount = 500 },
      { name = "Dark Chocolate Bar 70%"; description = "Rich single-origin dark chocolate, 100 g bar."; price = 349; category = #Food; image = placeholderBlob; stockCount = 300 },
      { name = "Mixed Nuts & Dried Fruits"; description = "Heart-healthy trail mix: cashews, almonds, raisins, and cranberries."; price = 549; category = #Food; image = placeholderBlob; stockCount = 250 },
      { name = "Cold-Pressed Olive Oil 500ml"; description = "Extra-virgin olive oil, first cold press, ideal for salads."; price = 1199; category = #Food; image = placeholderBlob; stockCount = 180 },
    ];

    var id = nextProductId;
    for (input in seeds.vals()) {
      let product : ProductTypes.Product = {
        id;
        name = input.name;
        description = input.description;
        price = input.price;
        category = input.category;
        image = input.image;
        stockCount = input.stockCount;
        createdAt = now;
      };
      products.add(id, product);
      id += 1;
    };
    id  // returns the updated nextProductId
  };
};
