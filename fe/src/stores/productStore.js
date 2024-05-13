import { create } from "zustand";

const productState = create((set) => ({
  products: [],
  setProducts: (products) =>
    set((state) => ({
      products: products,
    })),
  addedProducts: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  cancelProducts: () =>
    set((state) => ({
      products: [],
    })),
}));
export default productState;
