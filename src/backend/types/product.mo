import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type Category = {
    #Clothing;
    #Electronics;
    #Food;
  };

  public type ProductInput = {
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    image : Storage.ExternalBlob;
    stockCount : Nat;
  };

  public type Product = {
    id : Common.ProductId;
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    image : Storage.ExternalBlob;
    stockCount : Nat;
    createdAt : Common.Timestamp;
  };

  public type Review = {
    id : Common.ReviewId;
    productId : Common.ProductId;
    userId : Common.UserId;
    rating : Nat;
    comment : Text;
    createdAt : Common.Timestamp;
  };

  public type ReviewInput = {
    productId : Common.ProductId;
    rating : Nat;
    comment : Text;
  };
};
