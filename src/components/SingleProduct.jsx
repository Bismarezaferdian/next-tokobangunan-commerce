"use client";
import React, { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import useProductStore, { combineStore } from "@/utils/zustand/store";
import { ToastContainer } from "react-toastify";
import { errorMessage } from "@/utils/notification";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

const SingleProduct = ({ product }) => {
  const { user, addToCart } = combineStore();
  const { token } = parseCookies();
  // console.log(user);

  // const addToCart = combineStore((state) => state.addToCart);
  const [dataProduct, setDataProduct] = useState(product.data);
  const [qty, setQty] = useState(1);

  const router = useRouter();

  console.log(product);
  const handleAddCart = (e) => {
    //post data in cart where id ...
    //post data in zustand
    e.preventDefault();
    const data = {
      ...dataProduct.attributes,
      qty,
      price: dataProduct.attributes.price * qty,
      id: dataProduct.id,
      userID: user.id,
    };

    if (token) {
      addToCart(data);
    } else {
      errorMessage("anda belum login,silahkan login ! ");
      //fungsi pada onClose tidak berfungsi
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    }
  };
  // addToCart(qty);

  useEffect(() => {
    combineStore.persist.rehydrate();
  }, []);

  // console.log(data);

  const handleQty = (type) => {
    setQty((prevQty) => {
      if (type === "plus") {
        return (prevQty += 1);
      } else if (type === "minus") {
        return Math.max(1, (prevQty -= 1)); // Ensure qty doesn't go below 0
      } else {
        return prevQty; // No change for an unknown type
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <div className=" flex flex-1  justify-center h-auto ">
        <Image
          src={
            process.env.NEXT_PUBLIC_API_IMAGE +
            product.data.attributes.image.data.attributes.url
          }
          alt={product.data.attributes.title}
          width={500}
          height={500}
          // priority={true}
          className="object-cover h-fit"
        />
      </div>

      <div className="flex flex-1 flex-col  ">
        <h1 className="text-lg font-extrabold text-black">
          {product.data.attributes.title}
        </h1>
        <h1 className="text-red-700 font-bold">
          {" "}
          Rp.{product.data.attributes.price}
        </h1>
        <p
          className={`text-sm text-slate-500 ${
            product.data.attributes.stock <= 1 ? "bg-red-200" : "bg-green-200"
          } bg-green-200 w-fit px-2 rounded-md`}
        >
          {" "}
          stock:{product.data.attributes.stock}{" "}
        </p>
        <br />
        <span>Description:</span>
        <p className="text-sm font-extralight text-slate-700 ">
          {product.data.attributes.description}
        </p>
        <span>jumlah Qty</span>
        <div className="my-2 w-fit  ">
          <button
            onClick={() => handleQty("minus")}
            className="bg-green-700  py-2 px-4 text-slate-50 rounded-sm"
          >
            -
          </button>
          <span className="py-2 px-4">{qty}</span>
          <button
            onClick={() => handleQty("plus")}
            className="bg-green-700  py-2 px-4 text-slate-50 rounded-sm"
          >
            +
          </button>
        </div>
        <button
          className="flex bg-green-700 w-fit px-4 py-4 rounded-md text-sm text-slate-50 items-center justify-center"
          onClick={(e) => handleAddCart(e)}
        >
          <ShoppingCartIcon className="h-6 w-6 font-bold  text-slate-50" />
          Masukan keranjang
        </button>
      </div>
    </>
  );
};

export default SingleProduct;
// const productInState = products.find(
//   (product) => product.id === item.id
// );

// //jika sudah ada , update qty dan price
// if (productInState) {
//   const updateState = console.log(true);
//   set((state) => ({
//     products: [...state.products],
//     qty: state.qty + item.qty,
//     totalPrice: state.totalPrice + item.qty * item.price,
//     weight: state.weight + item.weight,
//   }));
// } else {
//   console.log(true);
//   set((state) => ({
//     products: [...state.products, item],
//     qty: state.qty + item.qty,
//     weight: state.weight + item.weight,
//     totalPrice: state.totalPrice + item.qty * item.price,
//   }));
// }
