import type { Product, WishlistItem } from "@/types/index";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.some((i) => i.product.id === product.id)) {
            return state;
          }
          return {
            items: [...state.items, { product, addedAt: Date.now() }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },

      toggleItem: (product) => {
        const { isWishlisted, addItem, removeItem } = get();
        if (isWishlisted(product.id)) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },

      isWishlisted: (productId) =>
        get().items.some((i) => i.product.id === productId),
    }),
    { name: "quickshop-wishlist" },
  ),
);
