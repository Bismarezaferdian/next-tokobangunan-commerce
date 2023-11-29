import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import CartIcon from "./CartIcon";
import UserInfo from "./UserInfo";

const Navbar = () => {
  return (
    <div className="flex flex-1 container mx-auto px-3 h-14 md:h-16 items-center gap-4 w-screen overflow-hidden justify-between ">
      <div className="">
        <h1 className="font-bold text-red-600">Mega Utama</h1>
      </div>
      <div className="flex flex-1 justify-start">
        <input
          type="text"
          className="rounded-l-sm text-sm py-1 px-2 border-2"
          placeholder="Search ...."
        />
        <button className="bg-green-800 px-2 rounded-r-sm">
          <MagnifyingGlassIcon className="h-4 w-4 text-white " />
        </button>
      </div>
      <div className="flex flex-1 justify-end gap-5">
        <div className="hidden md:flex gap-10  ">
          <button className="font-semibold text-slate-500">
            <Link href="/">Home</Link>
          </button>
          <button className="font-semibold text-slate-500">
            <Link href="/products">Product</Link>
          </button>
          <button className="font-semibold text-slate-500">
            <Link href="/">About</Link>
          </button>
          <button className="font-semibold text-slate-500">
            <Link href="/">Contact</Link>
          </button>
        </div>
        <div className="flex gap-5">
          <CartIcon />
          <Bars3Icon className="h-6 w-6 text-black sm:hidden" />
          {/* {user && <UserIcon className="h-6 w-6 text-black" />} */}
          <UserInfo />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
