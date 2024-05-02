"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { formatRupiah } from "@/utils/formatMatauang";
import Link from "next/link";
import { calcLength, motion } from "framer-motion";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/outline";

const fetcher = (url) =>
  fetch(url, {
    // headers: {
    //   Authorization: "bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
    // },
  }).then((res) => res.json());

const AllProduct = ({ brand, category }) => {
  console.log(brand);
  const searchParams = useSearchParams();
  const brandFromParams = searchParams.get("brand");
  const categoryFromParams = searchParams.get("category");
  const router = useRouter();
  const [brandFilter, setBrandFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 772) {
      setFilter(true);
    }
  }, []);

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

  // brand.map((item) => console.log(item));
  //query mencari brand
  const queryBrand = brandFilter?.map(
    (brand) => `filters[brands][tilte][$contains]=${brand}`
  );

  //query mencari category
  const queryCategory = categoryFilter?.map(
    (cat) => `filters[categories][title][$contains]=${cat}`
  );

  console.log(brandFilter);

  //fetching api dengan swr dengan query berdasarkan brand dan category input dari user
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_PRODUCT}
  &${queryBrand.join("&")}&${queryCategory.join("&")}`,
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
    <div>
      <ToastContainer />

      <div className=" md:hidden h-fit">
        <div className="desc">
          <h1>Semua Produk</h1>
        </div>
        <div className=" flex flex-1 justify-between px-2 ">
          <div className="search flex justify-center items-center gap-2">
            <input
              type="text"
              id="seach"
              className="rounded-lg text-sm py-2 px-2 border-none shadow-md shadow-slate-300"
              placeholder="search..."
            />
            <motion.div
              whileTap="visible"
              variants={variants}
              className="filter bg-white flex justify-center items-center p-2 rounded-lg shadow-md shadow-slate-300 "
              onClick={() => setFilter(!filter)}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
            </motion.div>
          </div>
        </div>
      </div>
      <div className=" grid md:items-start grid-cols-1  md:grid-cols-5 overflow-hidden gap-3 p-2">
        <motion.div
          initial="hidden"
          animate={filter ? "visible" : "hidden"}
          transition={{ type: "spring", bounce: 0.5 }}
          variants={variants}
          className={`${
            filter ? "absolute" : "hidden"
          } translate-x-full rounded-t-3xl md:rounded-none  md:relative md:grid bg-white shadow-xl md:shadow-none shadow-slate-600 col-span-1 w-full   p-4 z-50 `}
        >
          <div className="flex md:hidden w-full justify-end ">
            <XCircleIcon className="h-6 w-6 text-gray-500" />
          </div>
          <h1 className="font-semibold text-slate-800">Kategory product</h1>

          <div className="wrapp-kategory container overscroll-contain overflow-auto md:h-fit md:max-h-48 p-4">
            {/* example value kategory  */}
            {category?.data.map((item) => (
              <div className="flex items-center mb-4" key={item.id}>
                <input
                  type="checkbox"
                  id={item.attributes.title}
                  name="categoryFilter"
                  checked={categoryFilter.includes(item.attributes.title)}
                  value={item.attributes.title}
                  onChange={handleCat}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded-3xl focus:ring-blue-500"
                />
                <label
                  htmlFor={item.attributes.title}
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
            {brand?.data.map((item) => (
              <div className="flex items-center mb-4" key={item.id}>
                <input
                  type="checkbox"
                  name="brandFilter"
                  id={item.attributes.title}
                  checked={brandFilter.includes(item.attributes.tilte)}
                  value={item.attributes.tilte}
                  onChange={handleBrand}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded-3xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={item.attributes.tilte}
                  className={`ml-2 text-sm font-medium text-gray-400 transition-all ${
                    brandFilter.includes(item.attributes.tilte)
                      ? "text-gray-700"
                      : ""
                  }  `}
                >
                  {item.attributes.tilte}
                </label>
              </div>
            ))}
          </div>

          <h1 className="font-semibold text-slate-800">Harga</h1>
          <div className="wrapp-kategory container overscroll-contain overflow-auto md:h-48 p-4">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="default-checkbox"
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
        </motion.div>

        {/* product */}
        {isLoading && <h1>loading ....</h1>}
        {error && <h1>something went wrong !!!</h1>}
        {!products?.data.length && <h1>product belum ada ...</h1>}
        <div className="grid grid-cols-2 top-0 md:grid-cols-5 md:col-span-4 gap-4 w-full  overflow-hidden">
          {products?.data.map((item, i) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 1 }}
              className={` card p-1 overflow-hidden flex flex-col shadow-md bg-white rounded-md pb-4`}
              key={item.id}
            >
              <h1>{isLoading}</h1>
              <Link href={`/products/${item.id}`}>
                <div className=" cursor-pointer">
                  <Image
                    // src={item.attributes.image.data[0].attributes.url}
                    src={
                      process.env.NEXT_PUBLIC_API_IMAGE +
                      item.attributes.image.data.attributes.url
                    }
                    alt={item.attributes.title}
                    width={200}
                    height={200}
                    priority={true}
                    // objectFit
                    placeholder="blur"
                    // blurDataURL={item.attributes.image.data[0].attributes.url}
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
                      className={`text-xs text-slate-900 ${
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
    </div>
  );
};

export default AllProduct;
