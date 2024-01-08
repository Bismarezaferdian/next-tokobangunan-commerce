"use client";
import { successMessage } from "@/utils/notification";
import { ClockIcon } from "@heroicons/react/24/outline";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer } from "react-toastify";

const Payment = ({ searchParams }) => {
  // const bank = searchParams.bank.split("-")[1];
  // const norek = searchParams.bank.split("-")[0];
  // const searchParams = useSearchParams();
  // const totalHarga = searchParams.get("totalHarga");
  // const jenisPembayaran = searchParams.get("jenisPembayaran");
  // const bank = searchParams.get("bank");

  console.log(searchParams);
  // console.log("this from props:", totalHarga);
  // console.log("this from props:", jenisPembayaran);
  // console.log("this from props:", bank);

  // console.log(bank);
  return (
    <div className="container mx-auto h-screen">
      <ToastContainer />
      <div className="flex justify-center  items-center flex-col h-1/2 ">
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
      </div>
      <div className="detail w-max  md:w-1/2 mx-auto">
        <div className="flex justify-between">
          <span className=" text-slate-500 px-4 py-2 rounded-md">
            Metode Pembayaran:
          </span>
          <span className=" text-slate-900 font-semibold px-4 py-2 rounded-md whitespace-nowrap">
            {searchParams.jenisPembayaran}
          </span>
        </div>
        <div className="flex justify-between  ">
          <span className=" text-slate-500 px-4 py-2 rounded-md">
            Nama Bank:
          </span>
          <span className=" text-slate-900 font-semibold px-4 py-2 rounded-md">
            {searchParams.bank.split("-")[0]}
          </span>
        </div>
        <div className="flex justify-between  ">
          <span className=" text-slate-500 px-4 py-2 rounded-md">
            No. Rekening
          </span>
          <span className=" text-slate-900 flex items-center font-semibold px-4 py-2 rounded-md">
            {searchParams.bank.split("-")[1]}
            <CopyToClipboard
              text={searchParams.bank.split("-")[1]}
              onCopy={() => successMessage("berhasi dicopy")}
            >
              <DocumentDuplicateIcon
                className={`h-4 w-4 text-gray-500 ml-2 cursor-pointer disabled:text-gray-300 `}
              />
            </CopyToClipboard>
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
        <div className="flex justify-between  ">
          <span className=" text-slate-500 px-4 py-2 rounded-md">
            Total Yang Harus Dibayar
          </span>
          <span className="flex items-center text-slate-900 font-semibold px-4 py-2 rounded-md">
            {searchParams.totalHarga}
            <CopyToClipboard
              text={searchParams.totalHarga}
              onCopy={() => successMessage(`${searchParams.totalHarga} dicopy`)}
            >
              <DocumentDuplicateIcon
                className={`h-4 w-4 text-gray-500 ml-2 cursor-pointer disabled:text-gray-300 `}
              />
            </CopyToClipboard>
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
