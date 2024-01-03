import {
  Bars3Icon,
  HomeIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import CartIcon from "./CartIcon";
import UserInfo from "./UserInfo";
import NavLinks from "./NavLinks";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="  md:relative  z-40 w-screen bg-neutral-50 ">
      <div className=" flex px-4 md:px-14 flex-1 h-14 md:h-16 items-center gap-4 overflow-hidden justify-between  z-50 ">
        <div className="hidden md:flex">
          <h1 className=" flex font-bold text-red-600">Mega Utama</h1>
        </div>
        <div className=" flex flex-1 justify-start">
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
          {/* //dari component */}
          <NavLinks />
          <div className="flex gap-5">
            <CartIcon />
            <Bars3Icon className="h-6 w-6 text-black sm:hidden" />
            {/* {user && <UserIcon className="h-6 w-6 text-black" />} */}
            {/* //dari component */}
            <UserInfo />
          </div>
        </div>
      </div>
      {/* nav bottom */}
      <div className="fixed bottom-0 h-fit pt-2 md:hidden w-screen bg-neutral-50 z-40">
        <div className="flex justify-between items-center px-4">
          <Link href={"/"}>
            <div className="home flex flex-col justify-center items-center text-center">
              <HomeIcon className="h-6 w-6 text-green-600" />
              <span className="text-xs ">home</span>
            </div>
          </Link>
          <Link href={"/products"}>
            <div className="flex flex-col justify-center items-center text-center">
              <Squares2X2Icon className="h-6 w-6 text-gray-900" />
              <span className="text-xs ">Products</span>
            </div>
          </Link>
          {/* <Link href={"/listOrder"}>
            <div className="flex flex-col justify-center items-center text-center">
              <ClipboardIcon className="h-6 w-6 text-gray-900" />
              <span className="text-xs ">Order</span>
            </div>
          </Link> */}
          <Link href={"/profile"}>
            <div className="flex flex-col justify-center items-center text-center">
              <UserCircleIcon class="h-6 w-6 text-gray-900" />
              <span className="text-xs ">User</span>
            </div>
          </Link>
          {/* <Link href={"/contact"}>
            <div className="flex flex-col justify-center items-center text-center">
              <PhoneIcon className="h-6 w-6 text-gray-900" />
              <span className="text-xs ">Contact</span>
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
