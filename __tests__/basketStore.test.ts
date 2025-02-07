import useBasketStore, { Product } from '../store/basketStore';

const mockProduct: Product = {
  id: 1,
  name: 'Test Pizza',
  price: 12.99,
  info: 'Delicious test pizza',
  img: null,
};

const mockProduct2: Product = {
  id: 2,
  name: 'Test Burger',
  price: 9.99,
  info: 'Tasty test burger',
  img: null,
};

describe('basketStore', () => {
  beforeEach(() => {
    useBasketStore.setState({
      products: [],
      items: 0,
      total: 0,
      serviceFee: 2.99,
      deliveryFee: 5.99,
    });
  });

  describe('addProduct', () => {
    it('adds a new product to the cart', () => {
      const { addProduct } = useBasketStore.getState();

      addProduct(mockProduct);

      const state = useBasketStore.getState();
      expect(state.products).toHaveLength(1);
      expect(state.products[0].id).toBe(mockProduct.id);
      expect(state.products[0].quantity).toBe(1);
      expect(state.items).toBe(1);
      expect(state.total).toBe(12.99);
    });

    it('increments quantity when adding existing product', () => {
      const { addProduct } = useBasketStore.getState();

      addProduct(mockProduct);
      addProduct(mockProduct);

      const state = useBasketStore.getState();
      expect(state.products).toHaveLength(1);
      expect(state.products[0].quantity).toBe(2);
      expect(state.items).toBe(2);
      expect(state.total).toBe(25.98);
    });

    it('handles multiple different products', () => {
      const { addProduct } = useBasketStore.getState();

      addProduct(mockProduct);
      addProduct(mockProduct2);

      const state = useBasketStore.getState();
      expect(state.products).toHaveLength(2);
      expect(state.items).toBe(2);
      expect(state.total).toBeCloseTo(22.98, 2);
    });
  });

  describe('reduceProduct', () => {
    it('decrements product quantity', () => {
      const { addProduct, reduceProduct } = useBasketStore.getState();

      addProduct(mockProduct);
      addProduct(mockProduct);
      reduceProduct(mockProduct);

      const state = useBasketStore.getState();
      expect(state.products[0].quantity).toBe(1);
      expect(state.items).toBe(1);
    });

    it('removes product when quantity reaches zero', () => {
      const { addProduct, reduceProduct } = useBasketStore.getState();

      addProduct(mockProduct);
      reduceProduct(mockProduct);

      const state = useBasketStore.getState();
      expect(state.products).toHaveLength(0);
      expect(state.items).toBe(0);
      expect(state.total).toBe(0);
    });
  });

  describe('clearCart', () => {
    it('clears all products and resets state', () => {
      const { addProduct, clearCart } = useBasketStore.getState();

      addProduct(mockProduct);
      addProduct(mockProduct2);
      clearCart();

      const state = useBasketStore.getState();
      expect(state.products).toHaveLength(0);
      expect(state.items).toBe(0);
      expect(state.total).toBe(0);
    });
  });

  describe('immutability', () => {
    it('does not mutate state directly when adding products', () => {
      const { addProduct } = useBasketStore.getState();
      const initialProducts = useBasketStore.getState().products;

      addProduct(mockProduct);

      const newProducts = useBasketStore.getState().products;
      expect(newProducts).not.toBe(initialProducts);
    });
  });
});
