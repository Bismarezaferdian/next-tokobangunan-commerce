"use client";
import { combineStore } from "@/utils/zustand/store";
import Image from "next/image";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useSWR from "swr";

const fecher = ([url, param]) =>
  fetch(`${url}${param}`).then((res) => res.json());

function CartPage() {
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

  // console.log(products);

  const handleDelete = (item) => {
    // const filter = products.filter((product) => product.id !== item.id);
    // console.log(item);
    deleteCart(item);
  };

  useEffect(() => {
    combineStore.persist.rehydrate();
  }, []);

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
              <p className="card  md:hidden">Rp.{item.price}</p>
            </div>
          </div>
          <div className="card-price hidden md:flex items-center p-2 gap-3">
            <p className="card "> Rp.{item.price}</p>
            <div className="border h-4 border-slate-700"></div>
            <button
              onClick={() => handleDelete(item)}
              className="btn-primary bg-red-300 text-slate-800 text-sm p-1 hover:bg-red-500 "
            >
              {" "}
              Delete
            </button>
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
          total Price :<span className="font-semibold">{totalPrice}</span>
        </div>
        <button
          disabled={qty === 0}
          className="btn-primary medium flex w-fit mt-2"
        >
          Checkout now
        </button>
        <span className="text-red-600 italic text-sm">
          free delivery by courir toko (s&k berlaku)
        </span>
      </div>
    </div>
  );
}

export default CartPage;
