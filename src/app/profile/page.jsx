"use client";
import { combineStore } from "@/utils/zustand/store";
import React, { useEffect, useRef, useState } from "react";
import { successMessage } from "@/utils/notification";
import { ToastContainer } from "react-toastify";

const Profile = () => {
  const { login } = combineStore();
  const [dataUser, setDataUser] = useState();
  //   const [users, setDataUsers] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await combineStore.persist.rehydrate();
      setDataUser(combineStore.getState().user);
    };
    fetchData();
  }, []);

  const handleDataUser = (e) => {
    setDataUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${dataUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUser),
        }
      );

      const response = await res.json();

      const { role, ...data } = response;

      if (res.ok) {
        login(data);
        successMessage("data berhasil diubah !");
      }
    } catch (error) {
      alert(error);
    }
  };

  // console.log(user);
  return (
    <div className="min-h-screen container mx-auto ">
      <ToastContainer />
      <h1 className="text-lg font-semibold">Profil saya</h1>
      <div className="alamat">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold my-4"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={dataUser?.username}
            onChange={handleDataUser}
            placeholder="user name...."
            className="focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-500 focus:outline-none"
          />
          <label
            htmlFor="phonenumber"
            className="block text-gray-700 text-sm font-bold mt-4"
          >
            No. Telp
          </label>
          <input
            type="text"
            id="phonenumber"
            name="phoneNumber"
            onChange={handleDataUser}
            defaultValue={dataUser?.phoneNumber}
            placeholder="no telp...."
            className="focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-500 focus:outline-none"
          />
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mt-4"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleDataUser}
            defaultValue={dataUser?.email}
            // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:border-fuchsia-300 focus:outline-none"
            className="focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-500 focus:outline-none"
          />
          <label
            htmlFor="alamat"
            className="block text-gray-700 text-sm font-bold mt-8"
          >
            Alamat
          </label>

          <textarea
            id="alamat"
            name="address"
            rows="5"
            defaultValue={dataUser?.address}
            onChange={handleDataUser}
            placeholder="alamat lengkap...."
            className=" mb-4 focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
          ></textarea>
          {/* <div className=" items-center"> */}

          {/* </div> */}
          <button className="btn-primary medium" onClick={handleUpdate}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
