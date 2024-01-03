"use client";
import { combineStore } from "@/utils/zustand/store";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import useSWR from "swr";
import { motion } from "framer-motion";
import { formatRupiah } from "@/utils/formatMatauang";

const fecher = ([url, param]) =>
  fetch(`${url}${param}`).then((res) => res.json());

function CartPage() {
  // const [hovered, setHovered] = useState(false);
  // const router = useRouter();
  const { products, qty, weight, totalPrice, user, updateCart, deleteCart } =
    combineStore();
  const param = `?populate=*&filters[users_permissions_users][id][$eq]=${user.id}`;
  const { data, isLoading, error } = useSWR(
    [process.env.NEXT_PUBLIC_API_CART, param],
    fecher
  );

  useEffect(() => {
    if (data?.data.length > 0) {
      updateCart(data?.data);
    }
  }, [data]);

  const handleDelete = (item) => {
    // const filter = products.filter((product) => product.id !== item.id);
    // console.log(item);
    deleteCart(item);
  };

  useEffect(() => {
    combineStore.persist.rehydrate();
  }, []);

  // const handleCheckout = (e) => {
  //   e.preventDefault();
  //   router.push({
  //     pathname: "/order",
  //     query: { pid: "test" },
  //   });
  // };

  return (
    <div className="px-4">
      <ToastContainer />
      {products.map((item) => (
        <div
          className="flex justify-between w-full border-b-2 py-3"
          key={item.id}
        >
          <div className="card-content flex gap-1 w-fit">
            <Image
              priority={true}
              src={
                process.env.NEXT_PUBLIC_API_IMAGE +
                item?.image.data.attributes.url
              }
              alt={item.title}
              width={150}
              height={150}
            />
            <div className="desc-product">
              <p className="card text-slate-700 font-semibold ">
                pro {item.title}
              </p>
              <p className="card text-sm ">
                jumlah: {item.qty > 1 ? item.qty + "pcs" : item.qty + "pc"}
              </p>
              <p className="card text-sm">berat: {item.weight} kg</p>
              <p
                className={`text-sm text-slate-500 ${
                  item.stock <= 1 ? "bg-red-200" : "bg-green-200"
                } bg-green-200 w-fit px-2 rounded-md`}
              >
                stock: {item.stock}
              </p>
              <p className="card  md:hidden">{formatRupiah(item.price)}</p>
            </div>
          </div>
          <div className="card-price hidden md:flex items-center p-2 gap-3">
            <p className="card "> {formatRupiah(item.price)}</p>
            <div className="border h-4 border-slate-700"></div>
            {/* <span
              className={`${
                hovered ? "" : "hidden"
              } absolute translate-x-[88px] -translate-y-8 text-xs bg-red-200 text-red-600 rounded-lg px-2`}
            >
              delete
            </span> */}
            <motion.div whileHover={{ scale: 1.2 }} className="">
              <button
                onClick={() => handleDelete(item)}
                className="  text-slate-800 text-sm p-1 hover:text-gray-500 "
              >
                {" "}
                <TrashIcon className="h-6 w-6 text-gray-950" />
              </button>
            </motion.div>
          </div>
        </div>
      ))}
      <div className="flex flex-col bg-slate-50 items-end py-2 my-1">
        <div className=" ">
          {" "}
          total weight :<span className="font-semibold"> {weight} kg</span>
        </div>
        <div className=" ">
          {" "}
          total Price :
          <span className="font-semibold"> {formatRupiah(totalPrice)} </span>
        </div>
        <Link
          href={{
            pathname: "/order",
            // query: { qty: qty, weight: weight, totalPrice: totalPrice },
          }}
        >
          <button
            // onClick={handleCheckout}
            disabled={qty === 0}
            className="bg-green-700  py-2 px-4 text-slate-50 rounded-md transition-colors hover:bg-green-600 disabled:bg-green-600 disabled:text-white disabled:cursor-not-allowed"
          >
            Checkout now
          </button>
        </Link>
        <span className="text-red-600 italic text-sm">
          free delivery by courir toko (s&k berlaku)
        </span>
      </div>
    </div>
  );
}

export default CartPage;
