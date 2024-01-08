"use client";
import Link from "next/link";
import {
  HomeIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

const NavLinkMobile = () => {
  const path = usePathname();
  return (
    <div>
      <div className="flex justify-between items-center px-4">
        <Link href={"/"}>
          <div className="home flex flex-col justify-center items-center text-center">
            <HomeIcon
              className={`h-6 w-6 ${
                path == "/" ? "text-green-600" : "text-gray-900"
              }`}
            />
            <span className="text-xs ">home</span>
          </div>
        </Link>
        <Link href={"/products"}>
          <div className="flex flex-col justify-center items-center text-center">
            <Squares2X2Icon
              className={`h-6 w-6 ${
                path == "/products" ? "text-green-600" : "text-gray-900"
              }`}
            />
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
            <UserCircleIcon
              className={`h-6 w-6 ${
                path == "/profile" ? "text-green-600" : "text-gray-900"
              }`}
            />
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
  );
};

export default NavLinkMobile;
