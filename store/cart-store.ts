import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  hasHydrated: boolean;

  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,

      setHasHydrated: (value) => {
        set({ hasHydrated: value });
      },

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (cartItem) => cartItem.productId === item.productId
          );

          if (existingItem) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.productId === item.productId
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              )
            }
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }]
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId)
        }))
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: quantity < 1
            ? state.items.filter(
              (item) => item.productId !== productId
            )
            : state.items.map(
              (item) => item.productId === productId
                ? { ...item, quantity }
                : item
            )
        }))
      },

      clearCart: () => set({ items: [] }),

    }), {
      name: "mini-commerce-cart",
    onRehydrateStorage: () => {
      return (state) => {
        state?.setHasHydrated(true);
      }
    }
  }
  )
)