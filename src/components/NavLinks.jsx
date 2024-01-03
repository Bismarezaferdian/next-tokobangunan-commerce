"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const path = usePathname();
  return (
    <div>
      <div className="hidden md:flex gap-10  ">
        <div className="relative">
          <button className=" text-slate-500">
            <Link href="/">Home</Link>
          </button>
          {path == "/" && (
            <motion.div className="underline" layoutId="underline" />
          )}
        </div>
        <div className="relative">
          <button className=" text-slate-500">
            <Link href="/products">Product</Link>
          </button>
          {path == "/products" && (
            <motion.div className="underline" layoutId="underline" />
          )}
        </div>
        <div className="relative">
          <button className=" text-slate-500">
            <Link href="/about">About</Link>
          </button>
          {path == "/about" && (
            <motion.div className="underline" layoutId="underline" />
          )}
        </div>
        <div className="relative">
          <button className=" text-slate-500">
            <Link href="/contact">Contact</Link>
          </button>
          {path == "/contact" && (
            <motion.div className="underline" layoutId="underline" />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
