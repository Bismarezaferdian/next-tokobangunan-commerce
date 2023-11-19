"use client";
import {
  CloudIcon,
  CubeIcon,
  HomeModernIcon,
  ShieldCheckIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const Category = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
  }, []);
  //tempopary
  const data = [
    { id: 1, category: "Cat dinding", icon: HomeModernIcon },
    { id: 2, category: "cat besi", icon: ShieldCheckIcon },
    { id: 3, category: "cat Plafon", icon: Square3Stack3DIcon },
    { id: 4, category: "cat Exterior", icon: CloudIcon },
    { id: 5, category: "cat iterior", icon: CubeIcon },
    { id: 6, category: "cat iterior", icon: CubeIcon },
    { id: 7, category: "cat iterior", icon: CubeIcon },
  ];

  return (
    <div className="">
      <div className=" flex justify-between items-center ">
        <h1 className="font-semibold flex justify-start text-lg">
          Category Teratas
        </h1>
        <div className="">lihat semua</div>
      </div>
      <div className="flex justify-between gap-4 h-auto ">
        <Swiper
          loop={false}
          spaceBetween={5}
          slidesPerView={windowSize.width < 640 ? 2.5 : 3.5}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="py-10">
                <button className="flex flex-col items-center justify-center bg-slate-100 rounded-md px-8 py-2 capitalize font-medium text-zinc-500  cursor-pointer w-full h-36">
                  <item.icon className="h-6 w-6 text-gray-500 text-center" />
                  <div className="">{item.category}</div>
                </button>
              </div>
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>
          <Image src={Avian} alt="avian" />
        </SwiperSlide> */}
        </Swiper>
        {/* <button className="flex flex-col items-center justify-center bg-slate-100 rounded-md px-8 py-2 capitalize font-medium text-zinc-500  cursor-pointer w-1/2 h-36">
        <HomeModernIcon className="h-6 w-6 text-gray-500 text-center" />
        <div className="">cat dinding</div>
      </button>
      <button className="flex flex-col items-center justify-center bg-slate-100 rounded-md px-8 py-2 capitalize font-medium text-zinc-500 w-1/2 h-36">
        <ShieldCheckIcon className="h-6 w-6 text-gray-500" />
        <div className="">cat Besi</div>
      </button>
      <button className="flex flex-col items-center justify-center bg-slate-100 rounded-md px-8 py-2 capitalize font-medium text-zinc-500 w-1/2 h-36">
        <Square3Stack3DIcon className="h-6 w-6 text-gray-500" />
        <div className="">cat Plafon</div>
      </button>
      <button className="flex flex-col items-center justify-center bg-slate-100 rounded-md px-8 py-2 capitalize font-medium text-zinc-500 w-1/2 h-36">
        <CloudIcon className="h-6 w-6 text-gray-500" />
        <div className="">cat Exterior</div>
      </button>
      <button className="flex flex-col items-center justify-center bg-slate-100 rounded-md px-8 py-2 capitalize font-medium text-zinc-500 w-3/4 h-36">
        <CubeIcon className="h-6 w-6 text-gray-500" />

        <div className="">cat iterior</div>
      </button> */}
      </div>
    </div>
  );
};

export default Category;
