import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OrderItem {
    productId: ProductId;
    quantity: bigint;
    priceAtPurchase: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type CouponCode = string;
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ReviewId = bigint;
export interface Review {
    id: ReviewId;
    userId: UserId;
    createdAt: Timestamp;
    productId: ProductId;
    comment: string;
    rating: bigint;
}
export interface ProductInput {
    name: string;
    description: string;
    stockCount: bigint;
    category: Category;
    image: ExternalBlob;
    price: bigint;
}
export type OrderResult = {
    __kind__: "ok";
    ok: Order;
} | {
    __kind__: "err";
    err: string;
};
export interface ShippingAddress {
    street: string;
    country: string;
    city: string;
    postalCode: string;
    name: string;
    state: string;
}
export interface WishlistItem {
    productId: ProductId;
}
export interface Coupon {
    discountValue: bigint;
    expiryDate: Timestamp;
    code: CouponCode;
    discountType: DiscountType;
    usedCount: bigint;
    isActive: boolean;
    maxUses: bigint;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    couponCode?: CouponCode;
    total: bigint;
    userId: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    discount: bigint;
    shippingAddress: ShippingAddress;
    items: Array<OrderItem>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface DashboardStats {
    totalProducts: bigint;
    totalOrders: bigint;
    pendingOrders: bigint;
    totalUsers: bigint;
    totalRevenue: bigint;
    totalCoupons: bigint;
}
export type UserId = Principal;
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface CouponInput {
    discountValue: bigint;
    expiryDate: Timestamp;
    code: CouponCode;
    discountType: DiscountType;
    isActive: boolean;
    maxUses: bigint;
}
export type ProductId = bigint;
export interface CartItem {
    productId: ProductId;
    quantity: bigint;
}
export interface ReviewInput {
    productId: ProductId;
    comment: string;
    rating: bigint;
}
export interface Product {
    id: ProductId;
    name: string;
    createdAt: Timestamp;
    description: string;
    stockCount: bigint;
    category: Category;
    image: ExternalBlob;
    price: bigint;
}
export type OrderId = bigint;
export enum Category {
    Food = "Food",
    Electronics = "Electronics",
    Clothing = "Clothing"
}
export enum DiscountType {
    FixedAmount = "FixedAmount",
    Percentage = "Percentage"
}
export enum OrderStatus {
    Delivered = "Delivered",
    Cancelled = "Cancelled",
    Processing = "Processing",
    Shipped = "Shipped",
    Pending = "Pending"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addReview(input: ReviewInput): Promise<Review>;
    addToCart(productId: ProductId, quantity: bigint): Promise<void>;
    addToWishlist(productId: ProductId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createCoupon(input: CouponInput): Promise<Coupon>;
    createOrder(items: Array<CartItem>, couponCode: CouponCode | null, shippingAddress: ShippingAddress, emailAddress: string): Promise<OrderResult>;
    createProduct(input: ProductInput): Promise<Product>;
    deleteCoupon(code: CouponCode): Promise<boolean>;
    deleteProduct(id: ProductId): Promise<boolean>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getDashboardStats(): Promise<DashboardStats>;
    getOrder(id: OrderId): Promise<Order | null>;
    getOrders(): Promise<Array<Order>>;
    getProduct(id: ProductId): Promise<Product | null>;
    getProductReviews(productId: ProductId): Promise<Array<Review>>;
    getProducts(category: Category | null): Promise<Array<Product>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getWishlist(): Promise<Array<WishlistItem>>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    removeFromCart(productId: ProductId): Promise<void>;
    removeFromWishlist(productId: ProductId): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCoupon(code: CouponCode, input: CouponInput): Promise<Coupon | null>;
    updateOrderStatus(id: OrderId, status: OrderStatus, recipientEmail: string): Promise<Order | null>;
    updateProduct(id: ProductId, input: ProductInput): Promise<Product | null>;
    validateCoupon(code: CouponCode, orderTotal: bigint): Promise<bigint>;
}
