"use client";
import Shipping from "@/components/shipping";
import { formatRupiah } from "@/utils/formatMatauang";
import { combineStore } from "@/utils/zustand/store";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

function Order({ searchParams }) {
  const [expedisi, setExpedisi] = useState("toko");

  // const router = useRouter();
  // const data = router.query;
  const { products, qty, weight, totalPrice, user, updateCart, deleteCart } =
    combineStore();

  useEffect(() => {
    combineStore.persist.rehydrate();
  }, []);
  //sementara
  const ongkosKirim = 100000;

  const totalHarga = totalPrice + ongkosKirim;

  const handleSelect = (e) => {
    // console.log(e.target.value);
    setExpedisi(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <div className="flex gap-2">
        <div className=" flex flex-col detail-transaksi w-full gap-2 ">
          <div className="alamat bg-slate-50 p-4 ">
            <h1 className=" text-sm font-semibold ">Detail pengiriman</h1>
            <p className="text-sm text-slate-600">
              alamat: jl.ks tubun,kel palmerah, jakarta barat, jakarta , kode
              pos 112334
            </p>
            <p className="text-sm text-slate-600">A/N: BISMA REZA FERDIAN</p>
            <p className="text-sm text-slate-600">telp: 082211777272</p>
          </div>
          <div className="detail-barang p-4 bg-slate-50 ">
            <h1 className="text-sm font-semibold ">Detail Barang</h1>
            {products.map((item, index) => (
              <div className="flex w-full border-b-2" key={item.id}>
                <div className="card-content flex gap-1 w-fit ">
                  <div className="desc-product flex">
                    <div className="">
                      <p className="card text-slate-700 text-xs ">
                        {index + 1}.
                      </p>
                    </div>
                    <div className="">
                      <p className="card text-slate-700 font-semibold text-xs ">
                        {item.title}
                      </p>
                      <p className="card text-xs text-slate-600">
                        Jumlah:{" "}
                        {item.qty > 1 ? item.qty + "pcs" : item.qty + "pc"}
                      </p>
                      <p className="card text-xs text-slate-600">
                        berat: {item.weight} kg
                      </p>
                      <p
                        className={`text-xs text-slate-500 ${
                          item.stock <= 1 ? "bg-red-200" : "bg-green-200"
                        } bg-green-200 w-fit px-2 rounded-md`}
                      >
                        stock: {item.stock}
                      </p>
                      <p className="card ">Rp.{item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 p-4">
            <h1 className=" text-sm font-semibold"> Pengiriman</h1>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Pilih Pengiriman
            </label>
            <select
              onChange={(e) => handleSelect(e)}
              id="countries"
              className="bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={""}>jenis pengiriman</option>
              <option value="toko">pengiriman toko</option>
              <option value="expedisi">pengiriman expedisi</option>
            </select>
          </div>

          {expedisi === "expedisi" && <Shipping weight={weight} />}

          <div className="alamat bg-slate-50 p-4 ">
            <h1 className=" text-sm font-semibold ">Total Harga</h1>
            <div className="flex justify-between">
              <p className="text-sm  text-slate-600">
                Harga sebelum ppn
                <span className="font-light italic">
                  ( {qty} {`${qty > 1 ? "items" : "item"}`}):
                </span>
              </p>
              <p className="text-sm font-semibold">
                {formatRupiah(totalPrice)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-slate-600">ppn: </p>
              <p>free</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-slate-600">
                Biaya pengiriman:{" "}
                <span className="font-light italic">( {weight}kg):</span>
              </p>

              <p className="text-sm font-semibold">{formatRupiah(100000)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-slate-600">
                Total harga:{" "}
              </p>
              <p className="text-sm font-semibold">
                {formatRupiah(totalHarga)}
              </p>
            </div>
          </div>
        </div>
        <div className="daftar-bank bg-slate-50 py-4 w-full h-fit">
          <h1 className="text-sm text-slate-600">
            pilih pembayaran bank transfer
          </h1>
          <div className="bank">
            <div className="">
              <Image
                src={
                  "https://res.cloudinary.com/websitemuid/image/upload/c_crop,w_600,h_200/v1682582746/bca_lmqygl.png"
                }
                alt="bca"
                width={100}
                height={100}
                // className="bg-red-300"
              />
            </div>
            <p className="flex items-center">
              no.rek: 2838484{" "}
              <DocumentDuplicateIcon className="h-4 w-4 text-gray-500" />
            </p>
            <p className="flex items-center">
              jumlah yang harus dibayar : {formatRupiah(totalHarga)}{" "}
              <DocumentDuplicateIcon className="h-4 w-4 text-gray-500" />
            </p>
          </div>
          <div className="bank">
            <div className="">
              <Image
                src={
                  "https://res.cloudinary.com/websitemuid/image/upload/v1682582746/bca_lmqygl.png"
                }
                alt="bca"
                width={100}
                height={100}
              />
            </div>
            <p>2838484</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
