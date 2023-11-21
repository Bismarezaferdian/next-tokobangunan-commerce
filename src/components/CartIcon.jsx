"use client";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import useProductStore, { combineStore } from "@/utils/zustand/store";

import React, { useEffect } from "react";

function CartIcon() {
  const { qty } = combineStore();

  useEffect(() => {
    combineStore.persist.rehydrate();
  }, []);

  return (
    <div>
      <ShoppingCartIcon className="h-6 w-6 font-bold text-gray-800" />
      <div className=" flex justify-center bg-red-500 text-center text-xs text-white border items-center rounded-full w-5 h-5 absolute translate-x-4 -translate-y-8">
        {qty}
      </div>
    </div>
  );
}

export default CartIcon;
