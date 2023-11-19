"use client";
import { useRouter } from "next/navigation";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto  ">
      <div className="grid grid-flow-row p-4 md:grid-rows-2 md:grid-cols-4  h-full ">
        <div className=" grid row-span-2 relative w-full justify-items-start ">
          <h1 className="font-semibold text-xl text-red-900 py-4">
            <Link href="/">Mega Utama</Link>
          </h1>
          <div className="w-full relative">
            <div className="flex text-start items-start flex-col">
              <PhoneIcon className="relative h-6 w-6  text-gray-500" />
              <h1 className="font-light"> Whatsapp</h1>
              <p className="font-bold">0895-6021-79788</p>
            </div>
          </div>
          <div className="w-full">
            <PhoneIcon className="relative h-6 w-6  text-gray-500" />
            <h1 className="font-light"> Telphone</h1>
            <p className="font-bold"> 021-485849300</p>
          </div>
          <div className="w-full">
            <EnvelopeIcon className="h-6 w-6 text-gray-500" />
            <h1 className="font-light">Email</h1>
            <p className="font-bold">megautama@gmail.com</p>
          </div>
        </div>
        {/* <div className="">
          <h1>section 1</h1>
        </div> */}
        <div className="row-span-2 w-full md:col-start-2 col-span-4">
          <div className="  grid md:grid-cols-4 grid-cols-2 row-span-1 w-full  gap-4 pt-4 ">
            <div className="grid justify-items-start gap-2 w-full ">
              <h1 className="font-bold text-sm">Umum</h1>
              <button className="text-slate-500 hover:text-slate-700">
                <Link href="/about">Tentang kami</Link>
              </button>
              <button className="text-slate-500 hover:text-slate-700">
                <Link href="/contact"> Hubungi kami</Link>
              </button>
              <button className="text-slate-500 hover:text-slate-700">
                Informasi toko
              </button>
            </div>
            <div className="grid justify-items-start gap-2 w-full ">
              <h1 className="font-semibold">KETENTUAN</h1>
              <button className="text-slate-500 hover:text-slate-700">
                FAQ
              </button>
              <button className="text-slate-500 hover:text-slate-700">
                Syarat dan ketentuan
              </button>
              <button className="text-slate-500 hover:text-slate-700">
                Kebijakan privasi
              </button>
            </div>
            <div className="grid justify-items-start gap-2 w-full ">
              <h1 className="font-semibold">Ikuti Kami di </h1>
              <button>Instagram</button>
              <button>Shopee</button>
              <button>Tokopedia</button>
            </div>
            {/* <div className="grid justify-items-start gap-2 w-full ">
              <h1 className="font-semibold">Ikuti Kami di </h1>
              <button>Instagram</button>
              <button>Shopee</button>
              <button>Tokopedia</button>
            </div> */}
          </div>
          <div className="grid row-span-1 grid-cols-2 gap-7 w-full pt-10">
            <div className="">
              <h1 className="font-semibold">Alamat Toko</h1>
              <p className="text-slate-500">
                Ruko Grand Poris, Jl. Raya Poris Indah, RT.004/RW.008, Cipondoh
                Indah, Kec. Cipondoh, Kota Tangerang, Banten 15122
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
