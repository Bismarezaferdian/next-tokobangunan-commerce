import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";
import CartIcon from "./CartIcon";
import UserInfo from "./UserInfo";
import NavLinks from "./NavLinks";
import NavLinkMobile from "./NavLinkMobile";

const Navbar = () => {
  return (
    <div className="  md:relative  z-40 w-screen bg-neutral-50 ">
      <div className=" flex px-4 md:px-14 flex-1 h-14 md:h-16 items-center gap-4 overflow-hidden justify-between  z-50 ">
        <div className="hidden md:flex">
          <h1 className=" flex font-bold text-red-600">Mega Utama</h1>
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
        <NavLinkMobile />
      </div>
    </div>
  );
};

export default Navbar;
