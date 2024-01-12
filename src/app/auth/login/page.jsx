"use client";
import { errorMessage, successMessage } from "@/utils/notification";
import { combineStore } from "@/utils/zustand/store";
import { redirect, useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function Login() {
  const router = useRouter();
  const { login, updateCart } = combineStore();
  const [data, setData] = useState({});
  const { token } = parseCookies();

  // const handleChange = (e) => {
  //   setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    console.log(response);
    //update cookies
    if (res.ok) {
      setCookie(null, "token", response.jwt, {
        path: "/",
      });
      //update state auth
      login(response.user);
      //get data cart
      const res2 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/carts?populate=*&filters[users_permissions_users][id][$eq]=${response.user.id}`
      );
      const dataCart = await res2.json();
      if (dataCart.data.length > 0) {
        console.log("ada cart");
        //update cart
        updateCart(dataCart.data);
      } else {
        console.log("tidak punya cart");
      }
      successMessage("success login");
    } else {
      errorMessage(response.error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className=" flex justify-center countainer min-h-screen items-center">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="identifier"
                type="email"
                onChange={handleChange}
                placeholder="email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="password"
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Login In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
