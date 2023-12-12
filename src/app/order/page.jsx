"use client";
import Shipping from "@/components/shipping";
import { formatRupiah } from "@/utils/formatMatauang";
import { combineStore } from "@/utils/zustand/store";
import React, { useEffect, useState } from "react";

function Order() {
  const { products, qty, weight, totalPrice, user } = combineStore();
  const [expedisi, setExpedisi] = useState(null);
  const [cost, setCost] = useState();
  const [dataOrder, setDataOrder] = useState({
    totalHarga: 0,
    jenisPembayaran: "",
    bank: "",
    products: products,
  });

  useEffect(() => {
    combineStore.persist.rehydrate();
  }, []);
  //sementara
  useEffect(() => {
    if (
      (totalPrice !== undefined && cost !== null && cost) ||
      cost?.cost[0]?.value !== undefined
    ) {
      setDataOrder((prev) => ({
        ...prev,
        totalHarga: totalPrice + (cost?.toko || cost?.expedisi?.cost[0]?.value),
      }));
    }
  }, [totalPrice, cost]);

  console.log(dataOrder);

  const handleSelect = (e) => {
    if (e.target.value === "toko") {
      setCost((prev) => ({
        ...prev,
        [e.target.name]: 100000,
      }));
    }
    setExpedisi(e.target.value);
  };
  console.log(dataOrder.jenisPembayaran);

  const handleDataOrder = (e) => {
    setDataOrder((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
              onChange={handleSelect}
              id="toko"
              name="toko"
              className="bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={""}>jenis pengiriman</option>
              <option value="toko">pengiriman toko</option>
              <option value="expedisi">pengiriman expedisi</option>
            </select>
            {expedisi === "toko" && (
              <span className="font-light italic text-xs text-red-600">
                Max jarak 10 km dari toko, dikirim hari yang sama
              </span>
            )}
          </div>

          {expedisi === "expedisi" && (
            <Shipping weight={weight} setCost={setCost} cost={cost} />
          )}
        </div>
        <div className="daftar-bank w-full h-fit">
          <div className="bg-slate-50 p-4">
            <h1 className=" text-sm font-semibold">pembayaran</h1>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Pilih metode pembayaran
            </label>
            <select
              onChange={handleDataOrder}
              id="jenisPembayaran"
              name="jenisPembayaran"
              className="bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={""}>jenis pembayaran</option>
              <option value="bank">Transfer bank manual</option>
              <option value="VA">Virtual account</option>
            </select>
            {dataOrder?.JenisPembayaran === "VA" && (
              <span className="font-light italic text-xs text-red-600">
                maaf jenis pembayaran ini belum tersedia sekarang
              </span>
            )}
            {dataOrder?.jenisPembayaran === "bank" && (
              <div className="py-4">
                <label
                  htmlFor="bank"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Pilih Bank
                </label>
                <select
                  onChange={handleDataOrder}
                  id="bank"
                  name="courier"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="">-Pilih Bank-</option>
                  <option value="bca-123456789">Bank BCA</option>
                  <option value="mandiri-1234556">Bank MANDIRI</option>
                  <option value="bri-1234455">Bank BRI</option>
                </select>
              </div>
            )}
          </div>

          <div className="alamat bg-slate-50 p-4 mt-4">
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

              <p className="text-sm font-semibold">
                {cost?.expedisi !== undefined
                  ? formatRupiah(cost?.expedisi.cost[0]?.value)
                  : formatRupiah(cost?.toko)}
                {/* {cost !== null ? formatRupiah(cost.cost[0].value) : 0} */}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-slate-600">
                Total harga:{" "}
              </p>
              <p className="text-sm font-semibold">
                {formatRupiah(dataOrder?.totalHarga)}
              </p>
            </div>
          </div>
          <div className="flex justify-end p-4">
            <button className="btn-primary medium">Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
