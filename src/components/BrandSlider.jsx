"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

const BrandSlider = ({ data }) => {
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

  return (
    <div>
      <Swiper
        loop={false}
        spaceBetween={5}
        // slidesPerView={2.5}
        slidesPerView={windowSize.width < 640 ? 2.5 : 3.5}
        // navigation={true}
        // modules={[Navigation]}
        className="mySwiper"
      >
        {data?.data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="py-10 flex gap-5 items-center justify-center ">
              <Image
                src={
                  process.env.NEXT_PUBLIC_API_IMAGE +
                  item.attributes.img.data.attributes.url
                }
                alt={item.attributes.title}
                width={200}
                height={200}
                className=" w-auto md:h-20 h-10  object-fill "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSlider;
