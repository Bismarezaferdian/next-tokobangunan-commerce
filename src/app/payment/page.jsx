"use client";
import { ClockIcon } from "@heroicons/react/24/outline";
import React from "react";

const Payment = () => {
  return (
    <div className="container mx-auto h-screen">
      {/* <div className="flex justify-center  items-center flex-col h-1/2 ">
        <div className=" flex items-center justify-center bg-blue-100 w-40 h-40 rounded-full md:w-60 md:h-60 ">
          <div className="flex items-center justify-center bg-blue-500 w-20 h-20 rounded-full md:w-40 md:h-40 ">
            <ClockIcon className="h-10 w-10 text-slate-200 md:h-14 md:w-14 " />
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center  justify-center ">
          <h1 className="font-semibold">Menunggu Pembayaran</h1>
          <p className="text-sm text-center font-semibold text-gray-400">
            yeay selesaikan pembayaranmu dan pesanan segera dikirim
          </p>
        </div>
      </div> */}
      <div className="detail w-max  md:w-1/2 mx-auto">
        <div className="flex justify-between  ">
          <span className=" text-slate-500 px-4 py-2 rounded-md">
            Metode Pembayaran:
          </span>
          <span className=" text-slate-900 font-semibold px-4 py-2 rounded-md whitespace-nowrap">
            Transfer Bank
          </span>
        </div>
        <div className="flex justify-between  ">
          <span className=" text-slate-500 px-4 py-2 rounded-md">
            Nama Bank:
          </span>
          <span className=" text-slate-900 font-semibold px-4 py-2 rounded-md">
            BCA
          </span>
        </div>
        <div className="flex justify-between  ">
          <span className=" text-slate-500 px-4 py-2 rounded-md">
            No. Rekening
          </span>
          <span className=" text-slate-900 font-semibold px-4 py-2 rounded-md">
            12343434
          </span>
        </div>
        <div className="flex justify-between  ">
          <span className=" text-slate-500 px-4 py-2 rounded-md">
            Atas Nama
          </span>
          <span className=" text-slate-900 font-semibold px-4 py-2 rounded-md">
            PT.Mega Abadi Surya
          </span>
        </div>
      </div>
      <div className="button flex items-center justify-center mt-10">
        <button className="bg-blue-600 text-slate-50 px-4 py-2 rounded-md">
          konfirmasi pesanan
        </button>
      </div>
    </div>
  );
};

export default Payment;
