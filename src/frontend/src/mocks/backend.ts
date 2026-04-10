import type { backendInterface, Category, Product, Order, OrderStatus, UserRole, DashboardStats, CartItem, WishlistItem, Review, Coupon, DiscountType, OrderResult, ShippingAddress, StripeSessionStatus, TransformationOutput, _ImmutableObjectStorageRefillResult, _ImmutableObjectStorageCreateCertificateResult } from "../backend";
import { ExternalBlob } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const makeImageBlob = (url: string) => ExternalBlob.fromURL(url);

const samplePrincipal = { toText: () => "aaaaa-aa", isAnonymous: () => false, toUint8Array: () => new Uint8Array(29), compareTo: () => "eq" as const } as unknown as Principal;

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleProducts: Product[] = [
  {
    id: BigInt(1),
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium audio experience with active noise cancellation. Up to 30 hours battery life.",
    stockCount: BigInt(45),
    category: "Electronics" as unknown as Category,
    image: makeImageBlob("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"),
    price: BigInt(8999),
    createdAt: now,
  },
  {
    id: BigInt(2),
    name: "Classic Cotton T-Shirt",
    description: "Soft, breathable 100% cotton t-shirt. Available in multiple colors. Perfect for everyday wear.",
    stockCount: BigInt(120),
    category: "Clothing" as unknown as Category,
    image: makeImageBlob("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"),
    price: BigInt(1299),
    createdAt: now,
  },
  {
    id: BigInt(3),
    name: "Organic Green Tea",
    description: "Premium Japanese green tea, freshly sourced. Rich in antioxidants, perfect for daily health rituals.",
    stockCount: BigInt(200),
    category: "Food" as unknown as Category,
    image: makeImageBlob("https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop"),
    price: BigInt(899),
    createdAt: now,
  },
  {
    id: BigInt(4),
    name: "Smart Watch Pro",
    description: "Track fitness, heart rate, and notifications. Water-resistant with 7-day battery.",
    stockCount: BigInt(30),
    category: "Electronics" as unknown as Category,
    image: makeImageBlob("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"),
    price: BigInt(12999),
    createdAt: now,
  },
  {
    id: BigInt(5),
    name: "Slim Fit Jeans",
    description: "Modern slim-fit denim jeans. Comfortable stretch fabric with classic 5-pocket styling.",
    stockCount: BigInt(80),
    category: "Clothing" as unknown as Category,
    image: makeImageBlob("https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop"),
    price: BigInt(2999),
    createdAt: now,
  },
  {
    id: BigInt(6),
    name: "Dark Roast Coffee Beans",
    description: "Single-origin Colombian arabica beans, dark roasted for a bold, rich flavor.",
    stockCount: BigInt(150),
    category: "Food" as unknown as Category,
    image: makeImageBlob("https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop"),
    price: BigInt(1499),
    createdAt: now,
  },
];

const shippingAddress: ShippingAddress = {
  name: "Alex Johnson",
  street: "123 Main Street",
  city: "Mumbai",
  state: "Maharashtra",
  postalCode: "400001",
  country: "India",
};

const sampleOrders: Order[] = [
  {
    id: BigInt(1001),
    status: "Delivered" as unknown as OrderStatus,
    total: BigInt(10298),
    userId: samplePrincipal,
    createdAt: now - BigInt(7 * 24 * 3600) * BigInt(1_000_000_000),
    updatedAt: now - BigInt(2 * 24 * 3600) * BigInt(1_000_000_000),
    discount: BigInt(0),
    shippingAddress,
    items: [{ productId: BigInt(1), quantity: BigInt(1), priceAtPurchase: BigInt(8999) }, { productId: BigInt(2), quantity: BigInt(1), priceAtPurchase: BigInt(1299) }],
  },
  {
    id: BigInt(1002),
    status: "Processing" as unknown as OrderStatus,
    total: BigInt(12999),
    userId: samplePrincipal,
    createdAt: now - BigInt(1 * 24 * 3600) * BigInt(1_000_000_000),
    updatedAt: now,
    discount: BigInt(500),
    couponCode: "SAVE5",
    shippingAddress,
    items: [{ productId: BigInt(4), quantity: BigInt(1), priceAtPurchase: BigInt(12999) }],
  },
  {
    id: BigInt(1003),
    status: "Shipped" as unknown as OrderStatus,
    total: BigInt(4498),
    userId: samplePrincipal,
    createdAt: now - BigInt(3 * 24 * 3600) * BigInt(1_000_000_000),
    updatedAt: now - BigInt(1 * 24 * 3600) * BigInt(1_000_000_000),
    discount: BigInt(0),
    shippingAddress,
    items: [{ productId: BigInt(5), quantity: BigInt(1), priceAtPurchase: BigInt(2999) }, { productId: BigInt(6), quantity: BigInt(1), priceAtPurchase: BigInt(1499) }],
  },
];

const sampleCoupon: Coupon = {
  code: "SAVE10",
  discountValue: BigInt(10),
  discountType: "Percentage" as unknown as DiscountType,
  expiryDate: now + BigInt(30 * 24 * 3600) * BigInt(1_000_000_000),
  usedCount: BigInt(25),
  isActive: true,
  maxUses: BigInt(100),
};

const sampleReviews: Review[] = [
  {
    id: BigInt(1),
    userId: samplePrincipal,
    productId: BigInt(1),
    rating: BigInt(5),
    comment: "Excellent sound quality! The noise cancellation is superb.",
    createdAt: now - BigInt(5 * 24 * 3600) * BigInt(1_000_000_000),
  },
  {
    id: BigInt(2),
    userId: samplePrincipal,
    productId: BigInt(1),
    rating: BigInt(4),
    comment: "Very comfortable for long listening sessions. Highly recommend.",
    createdAt: now - BigInt(3 * 24 * 3600) * BigInt(1_000_000_000),
  },
];

export const mockBackend: backendInterface = {
  _immutableObjectStorageBlobsAreLive: async () => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => undefined,
  _immutableObjectStorageCreateCertificate: async () => ({ method: "PUT", blob_hash: "abc123" } as _ImmutableObjectStorageCreateCertificateResult),
  _immutableObjectStorageRefillCashier: async () => ({ success: true, topped_up_amount: BigInt(0) } as _ImmutableObjectStorageRefillResult),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,

  addReview: async (input) => ({
    id: BigInt(99),
    userId: samplePrincipal,
    productId: input.productId,
    rating: input.rating,
    comment: input.comment,
    createdAt: now,
  }),
  addToCart: async () => undefined,
  addToWishlist: async () => undefined,
  assignCallerUserRole: async () => undefined,
  createCheckoutSession: async () => "https://checkout.stripe.com/mock-session",
  createCoupon: async (input) => ({
    ...input,
    usedCount: BigInt(0),
  }),
  createOrder: async (items, couponCode, shippingAddress, _email) => ({
    __kind__: "ok" as const,
    ok: {
      id: BigInt(9999),
      status: "Pending" as unknown as OrderStatus,
      total: BigInt(8999),
      userId: samplePrincipal,
      createdAt: now,
      updatedAt: now,
      discount: BigInt(0),
      couponCode: couponCode ?? undefined,
      shippingAddress,
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity, priceAtPurchase: BigInt(8999) })),
    },
  } as OrderResult),
  createProduct: async (input) => ({
    id: BigInt(99),
    ...input,
    createdAt: now,
  }),
  deleteCoupon: async () => true,
  deleteProduct: async () => true,
  getAllOrders: async () => sampleOrders,
  getCallerUserRole: async () => "admin" as unknown as UserRole,
  getCart: async () => [
    { productId: BigInt(1), quantity: BigInt(1) },
    { productId: BigInt(3), quantity: BigInt(2) },
  ] as CartItem[],
  getDashboardStats: async () => ({
    totalProducts: BigInt(6),
    totalOrders: BigInt(3),
    pendingOrders: BigInt(1),
    totalUsers: BigInt(42),
    totalRevenue: BigInt(75840),
    totalCoupons: BigInt(2),
  } as DashboardStats),
  getOrder: async (id) => sampleOrders.find((o) => o.id === id) ?? null,
  getOrders: async () => sampleOrders,
  getProduct: async (id) => sampleProducts.find((p) => p.id === id) ?? null,
  getProductReviews: async () => sampleReviews,
  getProducts: async (_category) => sampleProducts,
  getStripeSessionStatus: async () => ({
    __kind__: "completed" as const,
    completed: { userPrincipal: "aaaaa-aa", response: "success" },
  } as StripeSessionStatus),
  getWishlist: async () => [
    { productId: BigInt(2) },
    { productId: BigInt(4) },
  ] as WishlistItem[],
  isCallerAdmin: async () => true,
  isStripeConfigured: async () => false,
  removeFromCart: async () => undefined,
  removeFromWishlist: async () => undefined,
  setStripeConfiguration: async () => undefined,
  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  } as TransformationOutput),
  updateCoupon: async (_code, input) => ({
    ...input,
    usedCount: BigInt(0),
  }),
  updateOrderStatus: async (id, status) => {
    const order = sampleOrders.find((o) => o.id === id);
    return order ? { ...order, status, updatedAt: now } : null;
  },
  updateProduct: async (id, input) => {
    const product = sampleProducts.find((p) => p.id === id);
    return product ? { ...product, ...input } : null;
  },
  validateCoupon: async () => BigInt(500),
};
