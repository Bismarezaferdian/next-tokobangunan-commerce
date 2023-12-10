import React, { useEffect, useState } from "react";
import { getCity, getCost, getProvince } from "@/utils/getData";
import { combineStore } from "@/utils/zustand/store";

const Shipping = ({ weight }) => {
  //data semua service dari expedisi(eq. reg/yes) beserta harganya
  const [cost, setCost] = useState([]);
  const [costInfo, setCostInfo] = useState();
  const [select, setSelect] = useState();

  const handleSelects = (e) => {
    setSelect((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //province
  const { province, isLoading, error } = getProvince();

  //city
  const { city, cityLoading, cityError } = getCity(select?.province);

  useEffect(() => {
    if (select?.city && weight && select?.courier) {
      const fetchData = async () => {
        try {
          // Memeriksa apakah data yang diperlukan sudah tersedia
          if (select?.city && weight && select?.courier) {
            const data = await getCost(select?.city, weight, select?.courier);
            // console.log(data?.data);
            setCostInfo(data[0].costs);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [select?.city, weight, select?.courier]);

  console.log(select);
  return (
    <div
      className="bg-slate-50 p-4"
      // className={`${
      //   expedisi === "expedisi" ? "flex" : "hidden"
      // } flex-col bg-slate-50 p-4`}
    >
      <div className=" ">
        <label
          htmlFor="province"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Pilih Provinsi
        </label>
        <select
          onChange={handleSelects}
          id="province"
          name="province"
          //   size={option ? "4" : "0"}
          className="bg-slate-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 overscroll-contain "
        >
          <option value={""} onClick={() => setOption(!option)}>
            Provinsi
          </option>
          {isLoading && <option>loading...</option>}
          {error && <option>coba beberapa saat lagi !</option>}
          {province?.rajaongkir?.results.map((item, index) => (
            <option value={item.province_id} className="" key={index}>
              {item.province}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <label
          htmlFor="kota"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Pilih kota
        </label>
        <select
          onChange={handleSelects}
          id="kota"
          name="city"
          //   size={option ? "4" : "0"}
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 overscroll-contain "
        >
          <option value={""} onClick={() => setOption(!option)}>
            Kota
          </option>
          {cityLoading && <option>loading...</option>}
          {cityError && <option>coba beberapa saat lagi !</option>}
          {city?.map((item, index) => (
            <option value={item.city_id} className="" key={index}>
              {item.city_name}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Pilih Jasa Kirim
        </label>
        <select
          onChange={handleSelects}
          id="countries"
          name="courier"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="">Jasa Kirim</option>
          <option value="jne">JNE</option>
          <option value="tiki">TIKI</option>
          <option value="pos">POS INDONESIA</option>
        </select>
      </div>
      <div className="">
        <label
          htmlFor="cost"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Pilih Jenis Layanan
        </label>
        <select
          onChange={handleSelects}
          id="cost"
          name="cost"
          // size={option ? "4" : "0"}
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 overscroll-contain "
        >
          <option value="">Service</option>
          {costInfo?.map((item, index) => (
            <option value={item} key={index}>
              {item.service}
            </option>
          ))}
        </select>
      </div>
      å
    </div>
  );
};

export default Shipping;
