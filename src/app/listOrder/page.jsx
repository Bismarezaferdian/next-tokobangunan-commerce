"use client";
import { formatRupiah, formatTanggal } from "@/utils/formatMatauang";
import { getOrder, updateStatusPesanan } from "@/utils/getData";
import { combineStore } from "@/utils/zustand/store";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const ListOrder = () => {
  //untuk ambil userid
  const { user } = combineStore();
  //di ambil dari utils
  const { order, mutate, isLoading } = getOrder(user.id);

  useEffect(() => {
    //rehydrate store zustand
    combineStore.persist.rehydrate();
  }, []);

  const handleStatus = async (orderID, e) => {
    e.preventDefault();
    const data = e.target.name;
    //dari utils
    await updateStatusPesanan(orderID, data);
    //revalid data order
    mutate();
  };

  //   console.log(order);
  const handleBuy = (item) => {
    console.log(item);
  };

  return (
    <div className="csontainer mx-auto md:px-32">
      <div className="detail-barang bg-slate-50 ">
        <h1 className="text-sm font-semibold p-4">List Orderan</h1>

        {isLoading
          ? "loading"
          : order?.data.map((item, index) => (
              <div className="mt-10 p-4" key={index}>
                <h1>no.order: {item.id}</h1>
                <h1>
                  Tgl Pesanan : {formatTanggal(item.attributes.createdAt)}
                </h1>

                <div className="bg-slate-200 p-4">
                  {item.attributes.product.map((product, index) => (
                    <div
                      className="desc-product flex flex-col mt-2"
                      key={index}
                    >
                      <div className="flex gap-2">
                        <div className="img flex flex-1">
                          <div className="w-4">
                            <h1 className="card text-slate-700 text-xs  ">
                              {index + 1}.
                            </h1>
                          </div>
                          <div className="flex gap-1 w-fit">
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_API_IMAGE +
                                product?.image.data.attributes.url
                              }
                              alt="test"
                              //   objectFit="cover"
                              //   className="w-200 h-200"
                              width={100}
                              height={100}
                            />
                          </div>
                        </div>
                        <div className="desc flex flex-col flex-1 ">
                          <p className="card text-slate-700 font-semibold text-xs ">
                            {product.title}
                          </p>
                          <p className="card text-xs text-slate-600">
                            Jumlah:{" "}
                            {product.qty > 1
                              ? product.qty + "pcs"
                              : product.qty + "pc"}
                          </p>
                          <p className="card text-xs text-slate-600">
                            berat: {product.weight} kg
                          </p>
                          <p className="card ">Rp.{product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="desc flex flex-col items-end">
                  <h1 className="text-sm font-semibold">
                    Status :
                    <span className="text-red-600">
                      {item.attributes.status.toUpperCase()}
                    </span>
                  </h1>
                  <h1 className="text-sm font-semibold">
                    {" "}
                    Total Harga : {formatRupiah(item.attributes.totalHarga)}
                  </h1>
                  {item.attributes.status == "Dibatalkan" && (
                    <div className="button flex gap-4 p-4">
                      <button className="border px-4  py-2 bg-blue-600 text-slate-50 rounded-md ">
                        Beli Lagi
                      </button>
                      <button
                        disabled
                        className="border px-4 py-2 rounded-md disabled:text-slate-300"
                      >
                        Terima pesanan
                      </button>
                      <button
                        disabled
                        className="border px-4 py-2 rounded-md disabled:text-slate-300"
                      >
                        Terima pesanan
                      </button>
                    </div>
                  )}
                  {item.attributes.status === "Belum Bayar" && (
                    <div className="button flex gap-2 p-4">
                      <button className="border px-4  py-2 bg-blue-600 text-slate-50 text-xs md:text-base rounded-md hover:bg-blue-700">
                        konfirmasi pesanan
                      </button>
                      <button
                        disabled
                        className="border px-4  py-2 rounded-md transition-colors text-xs md:text-base disabled:text-slate-300 "
                      >
                        Terima pesanan
                      </button>
                      <button
                        disabled
                        className="px-4  py-2 rounded-md transition-colors text-xs md:text-base cursor-pointer "
                      >
                        <InformationCircleIcon className="h-6 w-6 text-gray-500" />
                      </button>
                    </div>
                  )}
                  {item.attributes.status === "Dikirim" && (
                    <div className="button flex gap-4 p-4">
                      <button
                        disabled
                        className="border px-2  py-1 bg-blue-600 text-slate-50 text-xs md:px-4 md:py-2 md:text-base rounded-md disabled:bg-blue-300"
                      >
                        Konfimasi pesanan
                      </button>
                      <button
                        name="Sudah Sampai"
                        className="border px-2  py-1 rounded-md transition-colors text-xs md:px-4 md:py-2 md:text-base disabled:text-slate-300 hover:bg-slate-100"
                        onClick={(e) => handleStatus(item.id, e)}
                      >
                        Terima pesanan
                      </button>
                      <button
                        disabled
                        className="px-4  py-2 rounded-md transition-colors text-xs md:text-base cursor-pointer "
                      >
                        <InformationCircleIcon className="h-6 w-6 text-gray-500" />
                      </button>
                    </div>
                  )}
                  {item.attributes.status === "Sudah Sampai" && (
                    <div className="button flex gap-4 p-4">
                      <Link
                        href={{
                          pathname: "/order",
                          query: {
                            products: JSON.stringify(item.attributes),
                          },
                          // type: "replace",
                        }}
                      >
                        <button
                          //   onClick={() => handleBuy(item)}
                          className="border px-2  py-1 bg-blue-600 text-slate-50 rounded-md transition-colors whitespace-nowrap text-xs md:px-4 md:py-2 md:text-base disabled:bg-blue-300 hover:bg-blue-700"
                        >
                          Beli Lagi
                        </button>
                      </Link>

                      <button
                        disabled
                        className="border px-2  py-1 rounded-md transition-colors text-xs md:px-4 md:py-2 md:text-base disabled:text-slate-300 whitespace-nowrap"
                      >
                        Terima pesanan
                      </button>
                      <button
                        disabled
                        className="px-4  py-2 rounded-md transition-colors text-xs md:text-base cursor-pointer "
                      >
                        <InformationCircleIcon className="h-6 w-6 text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>

                <hr />
              </div>
            ))}
        {/* {order.data.map((item, index) => {
        //   item.attribute.product.map((product) => (
        //     <div className="flex w-full border-b-2" key={product.id}>
        //       <div className="card-content flex gap-1 w-fit ">
        //         <div className="desc-product flex">
        //           <div className="">
        //             <p className="card text-slate-700 text-xs ">{index + 1}.</p>
        //           </div>
        //           <div className="">
        //             <p className="card text-slate-700 font-semibold text-xs ">
        //               {product.title}
        //             </p>
        //             <p className="card text-xs text-slate-600">
        //               Jumlah:{" "}
        //               {product.qty > 1
        //                 ? product.qty + "pcs"
        //                 : product.qty + "pc"}
        //             </p>
        //             <p className="card text-xs text-slate-600">
        //               berat: {product.weight} kg
        //             </p>
        //             <p
        //               className={`text-xs text-slate-500 ${
        //                 product.stock <= 1 ? "bg-red-200" : "bg-green-200"
        //               } bg-green-200 w-fit px-2 rounded-md`}
        //             >
        //               stock: {product.stock}
        //             </p>
        //             <p className="card ">Rp.{product.price}</p>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   ));
        })} */}
      </div>
    </div>
  );
};

export default ListOrder;
