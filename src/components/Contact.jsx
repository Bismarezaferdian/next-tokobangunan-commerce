"use client";
import { motion } from "framer-motion";
import {
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  HomeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

const CardContact = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 m-2  ">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="flex flex-col justify-center md:w-72 w-full h-44 shadow-md p-4"
      >
        <PhoneIcon className="h-6 w-6 text-gray-500" />
        <h1>Telphone</h1>
        <p>021-485849300</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="flex flex-col justify-center  md:w-72 w-full h-44 shadow-md p-4"
      >
        <DevicePhoneMobileIcon className="h-6 w-6 text-gray-500" />
        <h1>Whatsapp</h1>
        <p>0895-6021-79788</p>
      </motion.div>
      <div className="flex flex-col justify-center md:w-72 w-full h-44 shadow-md p-4">
        <EnvelopeIcon className="h-6 w-6 text-gray-500" />
        <h1>Email</h1>
        <p>megautama@gmail.com</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
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
  );
};

export default CardContact;
