"use client";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { combineStore } from "@/utils/zustand/store";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

// const fetcher = (url) => fetch(url).then((res) => res.json());
function CartIcon() {
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);
  const { qty } = combineStore();

  //   useEffect(() => {
  //     if (token) {
  //       console.log("ada cart");
  //     } else {
  //       console.log("tidak ada cart");
  //     }
  //   }, [token]);

  useEffect(() => {
    combineStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (isLogout) {
      localStorage.removeItem("store");
      destroyCookie(null, "token", {
        path: "/",
      });
      router.push("/auth/login");
    }
  }, [isLogout]);

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLogout(true);
    // combineStore.persist.clearStorage();
  };

  return (
    <div>
      <Link href={"/cart"}>
        <ShoppingCartIcon className="h-6 w-6 font-bold text-gray-800" />
        <div className=" flex justify-center bg-red-500 text-center text-xs text-white border items-center rounded-full w-5 h-5 absolute translate-x-4 -translate-y-8">
          {qty}
        </div>
      </Link>
      <button
        onClick={(e) => handleLogout(e)}
        className="bg-blue-600 text-zinc-100 rounded-md p-1"
      >
        logout
      </button>
    </div>
  );
}

export default CartIcon;
