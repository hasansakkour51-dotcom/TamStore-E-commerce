// src/store/useCartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { notifySuccess, notifyError, notifyInfo } from "../../../shared/data/toastHelper";

const useCartStore = create(
  persist(
    (set) => ({
      products: [],
      loading: false,
      error: null,
      cart: [],

      // جلب المنتجات من API وهمي
      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("https://dummyjson.com/products");
          if (!res.ok) throw new Error("فشل في جلب البيانات من السيرفر!");
          const data = await res.json();
          set({ products: data.products, loading: false });
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      // إضافة للسلة مع إشعار
      addToCart: (product) =>
        set((state) => {
          const isExist = state.cart.find((item) => item.id === product.id);
          if (isExist) {
            notifyInfo(" المنتج موجود مسبقاً بالسلة");
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          notifySuccess(" تمت إضافة المنتج للسلة!");
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (productId) =>
        set((state) => {
          notifyError(" تم حذف المنتج من السلة");
          return { cart: state.cart.filter((item) => item.id !== productId) };
        }),

      updateQuantity: (productId, newQuantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          ),
        })),

      getTotalPrice: () => {
        return useCartStore
          .getState()
          .cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      clearCart: () => {
        notifyInfo(" تم تفريغ السلة بالكامل");
        set({ cart: [] });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export default useCartStore;
