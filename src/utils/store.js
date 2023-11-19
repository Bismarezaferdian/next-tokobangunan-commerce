import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useProductStore = create(
  persist(
    (set) => ({
      products: [],
      updateProducts: (prod) => set((state) => (state.products = prod)),
    }),
    {
      name: "products", // name of the item in the storage (must be unique)
      skipHydration: true, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useProductStore;
