"use client";
import React, { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: "bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
    },
  }).then((res) => res.json());

const AllProduct = ({ brand, category }) => {
  const router = useRouter();
  const [brandFilter, setBrandFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const queryBrand = brandFilter.map(
    (brand) => `filters[brands][title][$contains]=${brand}`
  );

  const queryCategory = categoryFilter.map(
    (cat) => `filters[categories][title][$contains]=${cat}`
  );

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_PRODUCT}&${queryBrand.join(
      "&"
    )}&${queryCategory.join("&")}`,
    fetcher
  );

  const handleBrand = (e) => {
    if (brandFilter.includes(e.target.value)) {
      setBrandFilter(brandFilter.filter((item) => item != e.target.value));
    } else {
      setBrandFilter((state) => [...state, e.target.value]);
    }
  };

  const handleCat = (e) => {
    if (categoryFilter.includes(e.target.value)) {
      setCategoryFilter(
        categoryFilter.filter((item) => item != e.target.value)
      );
    } else {
      setCategoryFilter((state) => [...state, e.target.value]);
    }
  };

  const handleToProduct = (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <>
      <div className="grid md:items-start grid-cols-1  md:grid-cols-5 overflow-hidden gap-3">
        <div className="hidden md:grid bg-slate-200 col-span-1 w-full max-h-screen p-4 ">
          <h1 className="font-semibold text-slate-800">Kategory product</h1>
          <ToastContainer />

          <div className="wrapp-kategory container overscroll-contain overflow-auto md:h-fit md:max-h-48 p-4">
            {/* example value kategory  */}
            {category?.data.map((item) => (
              <div className="flex items-center mb-4" key={item.id}>
                <input
                  type="checkbox"
                  name="category"
                  value={item.attributes.title}
                  onChange={handleCat}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded-3xl focus:ring-blue-500"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  {item.attributes.title}
                </label>
              </div>
            ))}
          </div>
          <h1 className="font-semibold text-slate-800">Brand</h1>
          <div className="wrapp-kategory container overscroll-contain overflow-auto md:h-48 p-4">
            {/* example value kategory  */}
            {brand?.data.map((item) => (
              <div className="flex items-center mb-4" key={item.id}>
                <input
                  type="checkbox"
                  name="brand"
                  value={item.attributes.title}
                  onChange={handleBrand}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded-3xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-700 "
                >
                  {item.attributes.title}
                </label>
              </div>
            ))}
          </div>

          <h1 className="font-semibold text-slate-800">Harga</h1>
          <div className="wrapp-kategory container overscroll-contain overflow-auto md:h-48 p-4">
            {/* example value kategory  */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="default-checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded-3xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Default checkbox
              </label>
            </div>
            {/* example value kategory  */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="default-checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded-3xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Default checkbox
              </label>
            </div>
            {/* example value kategory  */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="default-checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded-3xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Default checkbox
              </label>
            </div>
          </div>
        </div>

        {/* product */}

        <div className="grid grid-cols-4  md:grid-cols-6 md:col-span-4 gap-4 w-full h-fit overflow-hidden ">
          {data?.data.map((item) => (
            <div
              className="card ovenpmrflow-hidden  flex flex-col items-center"
              key={item.id}
            >
              <div className="">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API_IMAGE +
                    item.attributes.image.data.attributes.url
                  }
                  alt={item.attributes.title}
                  width={200}
                  height={200}
                  priority={true}
                  className="object-cover"
                />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => handleToProduct(item.id)}
              >
                {/* <Link href={`/products/${item.id}`}> */}
                <h1 className="text-sm font-semibold">
                  {item.attributes.title.length > 20
                    ? item.attributes.title.substring(0, 20) + "..."
                    : item.attributes.title}
                </h1>
                {/* </Link> */}
                <h1 className="text-sm font-light">
                  Rp.{item.attributes.price}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProduct;
