"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { formatRupiah } from "@/utils/formatMatauang";
import Link from "next/link";
import { motion } from "framer-motion";

const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: "bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
    },
  }).then((res) => res.json());

const AllProduct = ({ brand, category }) => {
  const searchParams = useSearchParams();
  const brandFromParams = searchParams.get("brand");
  const categoryFromParams = searchParams.get("category");
  const router = useRouter();
  const [brandFilter, setBrandFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  //handle search from home page
  useEffect(() => {
    //cek jika ada brand dari params
    if (brandFromParams) {
      //set brand filter dari params
      setBrandFilter((state) => [...state, brandFromParams]);
      //jika ada category dari params
    } else if (categoryFromParams) {
      //set category dari params
      setCategoryFilter((state) => [...state, categoryFromParams]);
    }
  }, [brandFromParams, categoryFromParams]);

  // console.log(categoryFilter);

  //query mencari brand
  const queryBrand = brandFilter?.map(
    (brand) => `filters[brands][title][$contains]=${brand}`
  );

  //query mencari category
  const queryCategory = categoryFilter?.map(
    (cat) => `filters[categories][title][$contains]=${cat}`
  );

  //fetching api dengan swr dengan query berdasarkan brand dan category input dari user
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_PRODUCT}&${queryBrand.join(
      "&"
    )}&${queryCategory.join("&")}`,
    fetcher
  );

  //function handle checked dari brand
  const handleBrand = (e) => {
    if (brandFilter.includes(e.target.value)) {
      setBrandFilter(brandFilter.filter((item) => item != e.target.value));
    } else {
      setBrandFilter((state) => [...state, e.target.value]);
    }
  };

  //function handle checked dari category
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
    router.replace(`/products/${id}`);
  };

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 100 },
  };

  return (
    <>
      <div className="grid md:items-start grid-cols-1  md:grid-cols-5 overflow-hidden gap-3  p-2">
        <div className="hidden md:grid bg-white shadow-md shadow-slate-100 col-span-1 w-full max-h-screen p-4 ">
          <h1 className="font-semibold text-slate-800">Kategory product</h1>
          <ToastContainer />

          <div className="wrapp-kategory container overscroll-contain overflow-auto md:h-fit md:max-h-48 p-4">
            {/* example value kategory  */}
            {category?.data.map((item) => (
              <div className="flex items-center mb-4" key={item.id}>
                <input
                  type="checkbox"
                  name="categoryFilter"
                  checked={categoryFilter.includes(item.attributes.title)}
                  value={item.attributes.title}
                  onChange={handleCat}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded-3xl focus:ring-blue-500"
                />
                <label
                  htmlFor="default-checkbox"
                  className={`ml-2 text-sm font-medium text-gray-400 transition-all ${
                    categoryFilter.includes(item.attributes.title)
                      ? "text-gray-700"
                      : ""
                  }  `}
                >
                  {item.attributes.title}
                </label>
              </div>
            ))}
          </div>
          <h1 className="font-semibold text-slate-800">Brand</h1>
          <div className="wrapp-kategory container overscroll-contain overflow-auto md:h-48 p-4">
            {/* example value kategory  */}
            {/* <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="brandFilter"
                value={""}
                onChange={handleBrand}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded-3xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                // className={`ml-2 text-sm font-medium text-gray-400 ${
                //   brandFilter?.includes(item.attributes.title)
                //     ? "text-gray-700"
                //     : ""
                // }  `}
              >
                All
              </label>
            </div> */}

            {brand?.data.map((item) => (
              <div className="flex items-center mb-4" key={item.id}>
                <input
                  type="checkbox"
                  name="brandFilter"
                  checked={brandFilter.includes(item.attributes.title)}
                  value={item.attributes.title}
                  onChange={handleBrand}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded-3xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className={`ml-2 text-sm font-medium text-gray-400 transition-all ${
                    brandFilter.includes(item.attributes.title)
                      ? "text-gray-700"
                      : ""
                  }  `}
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
        {isLoading && <h1>loading ....</h1>}
        {error && <h1>something went wrong !!!</h1>}
        {!products?.data.length && <h1>product belum ada ...</h1>}
        <div className="grid grid-cols-2  md:grid-cols-5 md:col-span-4 gap-4 w-full h-fit overflow-hidden  ">
          {products?.data.map((item, i) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 1 }}
              className="card p-1 overflow-hidden flex flex-col shadow-md bg-white rounded-md pb-4"
              key={item.id}
            >
              <h1>{isLoading}</h1>
              <Link href={`/products/${item.id}`}>
                <div className=" cursor-pointer">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_API_IMAGE +
                      item.attributes.image.data.attributes.url
                    }
                    alt={item.attributes.title}
                    width={200}
                    height={200}
                    priority={true}
                    placeholder="blur"
                    blurDataURL={
                      process.env.NEXT_PUBLIC_API_IMAGE +
                      item.attributes.image.data.attributes.url
                    }
                    className="object-cover"
                  />
                </div>

                <div
                  className="cursor-pointer mt-2"
                  onClick={() => handleToProduct(item.id)}
                >
                  <h1 className="text-sm ">
                    {item.attributes.title.length > 20
                      ? item.attributes.title.substring(0, 20) + "..."
                      : item.attributes.title}
                  </h1>

                  <div className="w-fit mt-2 ">
                    <h1 className="text-sm  font-semibold text-slate-900">
                      {formatRupiah(item.attributes.price)}
                    </h1>
                    <h1
                      className={`text-sm text-slate-900 ${
                        item.attributes.stock <= 1
                          ? "bg-red-100"
                          : "bg-green-100"
                      } bg-green-200 w-fit px-2 rounded-md`}
                    >
                      sisa stock {item.attributes.stock}
                    </h1>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProduct;
