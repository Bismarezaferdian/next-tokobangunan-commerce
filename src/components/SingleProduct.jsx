"use client";
import React, { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Elsie_Swash_Caps } from "next/font/google";

const SingleProduct = ({ product }) => {
  const [dataProduct, setDataProduct] = useState();
  const [qty, setQty] = useState(1);

  const handleAddCart = () => {};

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
        <button className="flex bg-green-700 w-fit px-4 py-4 rounded-md text-sm text-slate-50 items-center justify-center">
          <ShoppingCartIcon className="h-6 w-6 font-bold  text-slate-50" />
          Masukan keranjang
        </button>
      </div>
    </>
  );
};

export default SingleProduct;
