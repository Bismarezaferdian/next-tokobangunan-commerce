"use client";
import { combineStore } from "@/utils/zustand/store";
import {
  ArchiveBoxIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import React, { useEffect, useState } from "react";

function UserInfo() {
  const [isLogout, setIsLogout] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const router = useRouter();
  const { user } = combineStore();
  //   if (user) {
  //     console.log(user);
  //   }

  useEffect(() => {
    combineStore.persist.rehydrate();
  }, []);

  const destroy = () => {
    combineStore.persist.clearStorage();
    localStorage.removeItem("store");
    destroyCookie(null, "token", {
      path: "/",
    });
    router.push("/auth/login");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("run");
    setIsLogout(!isLogout);
    setShowUserInfo(!showUserInfo);
    destroy();
  };

  return (
    <>
      {user.id ? (
        <div className="overflow-hidden">
          <UserIcon
            className={`h-6 w-6 text-black cursor-pointer`}
            onClick={() => setShowUserInfo(!showUserInfo)}
          />
          <div
            className={`${
              showUserInfo ? "flex" : "hidden"
            } absolute  -translate-x-32 translate-y-3 bg-slate-100 p-2 transition-all duration-1000 overflow-hidden w-36`}
          >
            <div className="w-30 gap-2">
              <p className="border-b-2 flex items-center gap-1">
                <UserIcon className="h-4 w-4x text-gray-500" />
                hello, {user.username}
              </p>
              <p className="border-b-2 flex items-center gap-1">
                <ArchiveBoxIcon className="h-4 w-4 text-gray-500" />
                pesanan saya
              </p>
              <Link href={"/profile"}>
                <button className="cursor-pointer flex items-center gap-1 transition-all duration-700 hover:text-slate-500 ">
                  <UserCircleIcon className="h-4 w-4 text-gray-500" />
                  profile
                </button>
              </Link>
              <button
                className="cursor-pointer flex items-center gap-1 transition-all duration-700 hover:text-slate-500 "
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 text-gray-500" />
                logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <Link href={"/auth/login"}>
            <button className="btn-primary">login</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default UserInfo;
