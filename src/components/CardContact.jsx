"use client";
import WrapLayout from "@/app/WrapLayout";
import { motion } from "framer-motion";
import {
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  HomeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

const CardContact = () => {
  return (
    // <WrapLayout>
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 m-2  ">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.1 }}
        className="flex flex-col justify-center md:w-72 w-full h-44 shadow-md p-4"
      >
        <PhoneIcon className="h-6 w-6 text-gray-500" />
        <h1>Telphone</h1>
        <p>021-485849300</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.1, duration: 0.5 }}
        className="flex flex-col justify-center  md:w-72 w-full h-44 shadow-md p-4"
      >
        <DevicePhoneMobileIcon className="h-6 w-6 text-gray-500" />
        <h1>Whatsapp</h1>
        <p>0895-6021-79788</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.1 }}
        className="flex flex-col justify-center md:w-72 w-full h-44 shadow-md p-4"
      >
        <EnvelopeIcon className="h-6 w-6 text-gray-500" />
        <h1>Email</h1>
        <p>megautama@gmail.com</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        className="flex flex-col justify-center md:w-72 w-full h-44 shadow-md p-4"
      >
        <HomeIcon className="h-6 w-6 text-gray-500" />
        <h1>Alamat</h1>
        <p>
          Ruko Grand Poris, Jl. Raya Poris Indah, RT.004/RW.008, Cipondoh Indah,
          Kec. Cipondoh, Kota Tangerang, Banten 15122
        </p>
      </motion.div>
    </div>
    // </WrapLayout>
  );
};

export default CardContact;
