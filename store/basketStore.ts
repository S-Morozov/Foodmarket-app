import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
}

export interface BasketState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  items: number;
  total: number;
  serviceFee: number;
  deliveryFee: number;
}

const useBasketStore = create<BasketState>((set) => ({
  products: [],
  items: 0,
  total: 0,
  serviceFee: 2.99,
  deliveryFee: 5.99,
  
  addProduct: (product) => {
    set((state) => {
      const existingProduct = state.products.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }

      const updatedItems = state.items + 1;
      const updatedTotal = state.products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      
      return {
        products: [...state.products],
        items: updatedItems,
        total: updatedTotal,
      };
    });
  },

  reduceProduct: (product) => {
    set((state) => {
      const updatedProducts = state.products
        .map((p) => {
          if (p.id === product.id) {
            p.quantity -= 1;
          }
          return p;
        })
        .filter((p) => p.quantity > 0); 

      const updatedItems = updatedProducts.reduce((acc, curr) => acc + curr.quantity, 0);
      const updatedTotal = updatedProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

      const newServiceFee = updatedItems > 0 ? state.serviceFee : 0;
      const newDeliveryFee = updatedItems > 0 ? state.deliveryFee : 0;

      return {
        products: updatedProducts,
        items: updatedItems,
        total: updatedTotal,
        serviceFee: newServiceFee,
        deliveryFee: newDeliveryFee,
      };
    });
  },

  clearCart: () => set({ products: [], items: 0, total: 0, serviceFee: 2.99, deliveryFee: 5.99 }),
}));

export default useBasketStore;
