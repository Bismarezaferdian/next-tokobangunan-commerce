"use client";
import Image from "next/image";
import Mega from "../../public/megautama.png";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <div className="bg-black w-screen ">
        <div className=" flex justify-center flex-col absolute left-1/2 text-slate-200 -translate-x-1/2 top-[14vh]  md:top-[18vh] lg:top-[34vh] z-50 text-center  ">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className=""
          >
            <h1 className="text-xl md:text-5xl lg:text-7xl font-semibold md:font-medium  whitespace-nowrap">
              {" "}
              Toko Cat Mega Utama
            </h1>
            <p className="text-sm md:text-3xl md:mt-2">
              Terlengkap Tersedia Berbagai Merk Cat
            </p>
            <Link href={"/products"}>
              <button className=" text-green-700 md:mt-4 ">
                <span className=" text-xs md:text-xl  ">View Product</span>
              </button>
            </Link>
          </motion.div>
        </div>
        <Image
          src={Mega}
          alt="toko"
          priority={true}
          // sizes="(max-heigth:200px)"
          style={{ color: "transparent", opacity: "0.3" }}
        />
        {/* <h1 className="z-40 text-white absolute translate-x-40 opacity-100">
          test
        </h1> */}
      </div>
    </div>
  );
};

export default Hero;
