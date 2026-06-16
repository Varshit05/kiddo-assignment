import { create } from 'zustand';

interface CartState {
  cart: Record<string, number>;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: {},
  addToCart: (id) =>
    set((state) => ({
      cart: {
        ...state.cart,
        [id]: (state.cart[id] || 0) + 1,
      },
    })),
  removeFromCart: (id) =>
    set((state) => {
      const currentQty = state.cart[id] || 0;
      if (currentQty <= 1) {
        const newCart = { ...state.cart };
        delete newCart[id];
        return { cart: newCart };
      }
      return {
        cart: {
          ...state.cart,
          [id]: currentQty - 1,
        },
      };
    }),
  clearCart: () => set({ cart: {} }),
}));
