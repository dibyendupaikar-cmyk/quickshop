module {
  public type Timestamp = Int;
  public type UserId = Principal;
  public type OrderId = Nat;
  public type ProductId = Nat;
  public type ReviewId = Nat;
  public type CouponCode = Text;

  /// Mutable counter — passed as object reference so mixins can mutate `value`
  public type Counter = { var value : Nat };
  public func newCounter(initial : Nat) : Counter = { var value = initial };
};
