import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
}

export type CartProduct = Product & { quantity: number };

const SERVICE_FEE = 2.99;
const DELIVERY_FEE = 5.99;

export interface BasketState {
  products: CartProduct[];
  items: number;
  total: number;
  serviceFee: number;
  deliveryFee: number;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
}

const useBasketStore = create<BasketState>()((set) => ({
  products: [],
  items: 0,
  total: 0,
  serviceFee: SERVICE_FEE,
  deliveryFee: DELIVERY_FEE,

  addProduct: (product: Product) => {
    set((state) => {
      const existingIndex = state.products.findIndex((p) => p.id === product.id);

      let updatedProducts: CartProduct[];
      if (existingIndex >= 0) {
        updatedProducts = state.products.map((p, index) =>
          index === existingIndex ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        updatedProducts = [...state.products, { ...product, quantity: 1 }];
      }

      const updatedItems = updatedProducts.reduce((acc, curr) => acc + curr.quantity, 0);
      const updatedTotal = updatedProducts.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );

      return {
        products: updatedProducts,
        items: updatedItems,
        total: updatedTotal,
      };
    });
  },

  reduceProduct: (product: Product) => {
    set((state) => {
      const updatedProducts = state.products
        .map((p) => (p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0);

      const updatedItems = updatedProducts.reduce((acc, curr) => acc + curr.quantity, 0);
      const updatedTotal = updatedProducts.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );

      return {
        products: updatedProducts,
        items: updatedItems,
        total: updatedTotal,
        serviceFee: updatedItems > 0 ? SERVICE_FEE : 0,
        deliveryFee: updatedItems > 0 ? DELIVERY_FEE : 0,
      };
    });
  },

  clearCart: () =>
    set({
      products: [],
      items: 0,
      total: 0,
      serviceFee: SERVICE_FEE,
      deliveryFee: DELIVERY_FEE,
    }),
}));

export default useBasketStore;
