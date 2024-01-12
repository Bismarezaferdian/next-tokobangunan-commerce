"use client";
import React, { useEffect, useState } from "react";
import { MinusIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import useProductStore, { combineStore } from "@/utils/zustand/store";
import { ToastContainer } from "react-toastify";
import { errorMessage } from "@/utils/notification";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { formatRupiah } from "@/utils/formatMatauang";
import { motion } from "framer-motion";

const SingleProduct = ({ product }) => {
  const { user, addToCart, products } = combineStore();
  const { token } = parseCookies();
  // console.log(products);
  // const addToCart = combineStore((state) => state.addToCart);
  const [dataProduct, setDataProduct] = useState(product.data);
  const [qty, setQty] = useState(1);
  const [qtyProdIncart, setQtyProdIncart] = useState(null);
  const router = useRouter();

  //cari product yang sama id dengan product saat ini
  // .map((item) => parseInt(item.qty));

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

  useEffect(() => {
    if (products) {
      const stock = products?.find((item) => item?.id === product.data.id);
      // console.log(stock?.qty);
      setQtyProdIncart(stock?.qty);
    }
  }, [products]);

  // console.log(qtyProdIncart, product.data.attributes.stock);
  const handleQty = (type) => {
    setQty((prevQty) => {
      // console.log(prevQty, product.data.attributes.stock);
      if (type === "plus") {
        if (qty < product.data.attributes.stock) {
          return (prevQty += 1);
        } else {
          errorMessage("anda sudah melebihi batas stok");
          return prevQty;
        }
      } else if (type === "minus") {
        return Math.max(1, (prevQty -= 1)); // Ensure qty doesn't go below 0
      } else {
        return prevQty; // No change for an unknown type
      }
    });
  };

  console.log(product);

  return (
    <div className=" container mx-auto px-2 flex flex-col md:flex-row gap-2 overflow-hidden  ">
      <ToastContainer />
      <div className=" flex flex-1 relative justify-center rounded-lg overflow-hidden ">
        <Image
          src={product.data.attributes.image.data[0].attributes.url}
          alt={product.data.attributes.title}
          width={500}
          height={500}
          // priority={true}
          className="object-cover h-fit"
        />
        {product.data.attributes.stock == 0 && (
          <div className=" w-full h-full absolute top-0 left-0 bg-slate-300 z-10 opacity-50 flex justify-center items-center ">
            <h1 className="text-3xl font-bold">Habis</h1>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col  ">
        <div className="wrap-desc overscroll-contain overflow-auto max-h-96">
          <h1 className="text-lg font-extrabold text-black">
            {product.data.attributes.title}
          </h1>
          <h1 className="text-red-700 font-bold">
            {" "}
            {formatRupiah(product.data.attributes.price)}
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
            {/* {product.data.attributes.description.length > 500
              ? product.data.attributes.description.substring(0, 500) + "..."
              : internalMutate.attributes.title} */}
          </p>
        </div>
        <span>jumlah Qty</span>
        <div className="my-2 w-fit flex  ">
          <motion.button
            layout
            whileHover={{
              // scale: 1.1,
              transition: { type: "spring", stiffness: 100, duration: 0.5 },
            }}
            whileTap={{ scale: 0.6 }}
            disabled={
              product.data.attributes.stock == 0 ||
              product.data.attributes.stock <= qtyProdIncart
            }
            onClick={() => handleQty("minus")}
            className="bg-green-700 py-2 px-4 text-slate-50 rounded-sm
            transition-colors hover:bg-green-600 disabled:bg-slate-300
            disabled:text-white"
          >
            {" "}
            -
          </motion.button>
          <div className="flex min-w-[40px] justify-center items-center">
            {qty}
          </div>
          <motion.button
            layout
            whileHover={{
              // scale: 1.1,
              transition: { type: "spring", stiffness: 100, duration: 0.5 },
            }}
            whileTap={{ scale: 0.6 }}
            disabled={
              product.data.attributes.stock == 0 ||
              product.data.attributes.stock <= qtyProdIncart
            }
            onClick={() => handleQty("plus")}
            className="bg-green-700 py-2 px-4 text-slate-50 rounded-sm
            transition-colors hover:bg-green-600 disabled:bg-slate-300
            disabled:text-white"
          >
            {" "}
            +
          </motion.button>
        </div>
        <button
          disabled={
            product.data.attributes.stock == 0 ||
            product.data.attributes.stock <= qtyProdIncart
          }
          className="flex bg-green-700 w-fit px-4 py-4 rounded-md text-sm text-slate-50 items-center justify-center transition-colors hover:bg-green-600 disabled:bg-slate-300 disabled:text-white"
          onClick={(e) => handleAddCart(e)}
        >
          <ShoppingCartIcon className="h-6 w-6 font-bold  text-slate-50 " />
          Masukan keranjang
        </button>
      </div>
    </div>
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
