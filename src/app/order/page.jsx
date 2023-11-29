"use client";
import { combineStore } from "@/utils/zustand/store";
import Image from "next/image";
import React, { useEffect } from "react";

function Order() {
  const { products, qty, weight, totalPrice, user, updateCart, deleteCart } =
    combineStore();

  useEffect(() => {
    combineStore.persist.rehydrate();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex gap-2">
        <div className=" flex flex-col detail-transaksi w-full gap-2 ">
          <div className="alamat bg-slate-50 py-4 ">
            <h1 className=" text-sm text-slate-600 ">Detail pengiriman</h1>
            <p>
              alamat: jl.ks tubun,kel palmerah, jakarta barat, jakarta , kode
              pos 112334
            </p>
            <p>A/N: BISMA REZA FERDIAN</p>
            <p>telp: 082211777272</p>
          </div>
          <div className="detail-barang py-4 bg-slate-50 ">
            <h1 className="text-sm text-slate-600 ">Detail Barang</h1>
            {products.map((item) => (
              <div className="flex w-full border-b-2" key={item.id}>
                <div className="card-content flex gap-1 w-fit ">
                  <div className="desc-product">
                    <p className="card text-slate-700 font-semibold ">
                      pro {item.title}
                    </p>
                    <p className="card text-sm ">
                      jumlah:{" "}
                      {item.qty > 1 ? item.qty + "pcs" : item.qty + "pc"}
                    </p>
                    <p className="card text-sm">berat: {item.weight} kg</p>
                    <p
                      className={`text-sm text-slate-500 ${
                        item.stock <= 1 ? "bg-red-200" : "bg-green-200"
                      } bg-green-200 w-fit px-2 rounded-md`}
                    >
                      stock: {item.stock}
                    </p>
                    <p className="card ">Rp.{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="daftar-bank bg-slate-50 py-4 w-full h-fit">
          <h1>pilih pembayaran bank transfer</h1>
          <div className="bank">
            <p>Bank bca</p>
            <p>2838484</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;

// import User from "../models/UserModel.js";
// import argon2 from "argon2";

// // function login
// export const Login = async (req, res) => {
//   const user = await User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   });
//   if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
//   const match = await argon2.verify(user.password, req.body.password);
//   if (!match) return res.status(400).json({ msg: "Password salah" });
//   req.session.userId = user.uuid;
//   const uuid = user.uuid;
//   const name = user.name;
//   const email = user.email;
//   const role = user.role;
//   res.status(200).json({ uuid, name, email, role });
// };

// // function get user login (berhubungan dengan frontend)
// export const Me = async (req, res) => {
//   if (!req.session.userId) {
//     return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
//   }
//   const user = await User.findOne({
//     attributes: ["uuid", "name", "email", "role"],
//     where: {
//       uuid: req.session.userId,
//     },
//   });
//   if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
//   res.status(200).json(user);
// };

// // function logout
// export const Logout = async (req, res) => {
//   req.session.destroy((err) => {
//     if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
//     res.status(200).json({ msg: "Anda telah logout" });
//   });
// };
