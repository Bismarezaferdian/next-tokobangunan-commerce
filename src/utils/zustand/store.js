import { create } from "zustand";
import useCartStore from "@/utils/zustand/cartZustand";
import useAuthStore from "@/utils/zustand/authZustand";
import { persist } from "zustand/middleware";

export const combineStore = create(
  persist(
    (set, get) => ({
      ...useAuthStore(set, get),
      ...useCartStore(set, get),
    }),
    {
      name: "store",
      skipHydration: true,
    }
  )
);
