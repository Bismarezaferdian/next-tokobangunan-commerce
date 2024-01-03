"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getCategory } from "@/utils/getData";
import { useEffect, useState } from "react";
import Link from "next/link";

const CategorySlider = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const { category, categoryError, categoryLoading } = getCategory();

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

  return (
    <div className="flex justify-between gap-4 h-auto">
      <Swiper
        loop={false}
        spaceBetween={5}
        slidesPerView={windowSize.width < 640 ? 2.5 : 3.5}
        // slidesPerView={4.3}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {category?.data.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              href={{
                pathname: "/products",
                query: { category: item.attributes.title },
              }}
            >
              <div className="  w-full py-8">
                <div className="flex flex-col items-center justify-center bg-slate-100 rounded-md   capitalize font-medium text-zinc-500  cursor-pointer w-full h-36">
                  <h1>{item.attributes.title}</h1>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
