import { createActor } from "@/backend";
import type {
  Coupon,
  DashboardStats,
  Order,
  Product,
  Review,
  UserProfile,
} from "@/types/index";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Typed accessor helpers
type AnyActor = Record<string, (...args: unknown[]) => Promise<unknown>>;

function getActor(actor: unknown): AnyActor {
  return actor as AnyActor;
}

// ─── Products ───────────────────────────────────────────────────────────────

export function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return ((await getActor(actor).getProducts?.()) as Product[]) ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return null;
      return (
        ((await getActor(actor).getProduct?.(id)) as Product | null) ?? null
      );
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, Omit<Product, "id">>({
    mutationFn: async (product) => {
      if (!actor) throw new Error("Actor not available");
      await getActor(actor).createProduct?.(product as unknown);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, Product>({
    mutationFn: async (product) => {
      if (!actor) throw new Error("Actor not available");
      await getActor(actor).updateProduct?.(product as unknown);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      await getActor(actor).deleteProduct?.(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

// ─── Orders ─────────────────────────────────────────────────────────────────

export function useOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return ((await getActor(actor).getCallerOrders?.()) as Order[]) ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOrder(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order | null>({
    queryKey: ["order", id],
    queryFn: async () => {
      if (!actor) return null;
      return ((await getActor(actor).getOrder?.(id)) as Order | null) ?? null;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useAllOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      if (!actor) return [];
      return ((await getActor(actor).getAllOrders?.()) as Order[]) ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    Order,
    Error,
    Omit<Order, "id" | "userId" | "createdAt" | "updatedAt" | "status">
  >({
    mutationFn: async (orderData) => {
      if (!actor) throw new Error("Actor not available");
      return (await getActor(actor).placeOrder?.(
        orderData as unknown,
      )) as Order;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, { id: string; status: Order["status"] }>({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Actor not available");
      await getActor(actor).updateOrderStatus?.(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });
}

// ─── Coupons ─────────────────────────────────────────────────────────────────

export function useCoupons() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Coupon[]>({
    queryKey: ["admin", "coupons"],
    queryFn: async () => {
      if (!actor) return [];
      return ((await getActor(actor).getCoupons?.()) as Coupon[]) ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useValidateCoupon() {
  const { actor } = useActor(createActor);
  return useMutation<Coupon | null, Error, string>({
    mutationFn: async (code) => {
      if (!actor) throw new Error("Actor not available");
      return (
        ((await getActor(actor).validateCoupon?.(code)) as Coupon | null) ??
        null
      );
    },
  });
}

export function useCreateCoupon() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, Omit<Coupon, "id" | "usedCount">>({
    mutationFn: async (coupon) => {
      if (!actor) throw new Error("Actor not available");
      await getActor(actor).createCoupon?.(coupon as unknown);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] }),
  });
}

export function useDeleteCoupon() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (code) => {
      if (!actor) throw new Error("Actor not available");
      await getActor(actor).deleteCoupon?.(code);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] }),
  });
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export function useProductReviews(productId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Review[]>({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      if (!actor) return [];
      return (
        ((await getActor(actor).getProductReviews?.(productId)) as Review[]) ??
        []
      );
    },
    enabled: !!actor && !isFetching && !!productId,
  });
}

export function useAddReview() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, Omit<Review, "id" | "userId" | "createdAt">>({
    mutationFn: async (review) => {
      if (!actor) throw new Error("Actor not available");
      await getActor(actor).addReview?.(review as unknown);
    },
    onSuccess: (_data, vars) =>
      queryClient.invalidateQueries({ queryKey: ["reviews", vars.productId] }),
  });
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export function useDashboardStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardStats | null>({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      if (!actor) return null;
      return (
        ((await getActor(
          actor,
        ).getDashboardStats?.()) as DashboardStats | null) ?? null
      );
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── User Profile ────────────────────────────────────────────────────────────

export function useCallerProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return (
        ((await getActor(
          actor,
        ).getCallerUserProfile?.()) as UserProfile | null) ?? null
      );
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useSaveProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, UserProfile>({
    mutationFn: async (profile) => {
      if (!actor) throw new Error("Actor not available");
      await getActor(actor).saveCallerUserProfile?.(profile as unknown);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] }),
  });
}

// ─── Checkout ────────────────────────────────────────────────────────────────

export interface CreateOrderInput {
  items: Array<{ productId: bigint; quantity: bigint }>;
  couponCode: string | null;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export function useCreateOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, CreateOrderInput>({
    mutationFn: async ({ items, couponCode, shippingAddress }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await getActor(actor).createOrder?.(
        items as unknown,
        couponCode as unknown,
        shippingAddress as unknown,
      );
      // result is OrderResult: { __kind__: "ok", ok: Order } | { __kind__: "err", err: string }
      const orderResult = result as {
        __kind__: string;
        ok?: unknown;
        err?: string;
      };
      if (orderResult.__kind__ === "err") {
        throw new Error(orderResult.err ?? "Order creation failed");
      }
      return orderResult.ok ?? orderResult;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  return useMutation<
    string,
    Error,
    Array<{
      productName: string;
      productDescription: string;
      currency: string;
      priceInCents: bigint;
      quantity: bigint;
    }>
  >({
    mutationFn: async (items) => {
      if (!actor) throw new Error("Actor not available");
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/checkout/success`;
      const cancelUrl = `${baseUrl}/checkout`;
      const result = await getActor(actor).createCheckoutSession?.(
        items as unknown,
        successUrl,
        cancelUrl,
      );
      return result as string;
    },
  });
}
