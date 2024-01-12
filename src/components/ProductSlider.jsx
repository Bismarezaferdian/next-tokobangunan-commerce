"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { formatRupiah } from "@/utils/formatMatauang";

const ProductSlider = ({ data }) => {
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

  console.log(data);

  return (
    <div>
      <div className="">
        <Swiper
          loop={false}
          slidesPerView={windowSize.width < 640 ? 2.5 : 3.5}
          autoplay={{
            delay: 1200,
            disableOnInteraction: false,
          }}
          draggable={true}
          modules={[Autoplay]}
          spaceBetween={10}
          passiveListeners={false}
        >
          {data?.data?.map((item) => (
            <SwiperSlide key={item.id} cz-shortcut-listen="false">
              <div className=" rounded-md text-center py-10">
                <div className="flex  md:h-auto justify-center overflow-hidden rounded-md">
                  <Image
                    src={item.attributes.image.data[0].attributes.url}
                    alt={item.attributes.title}
                    width={200}
                    height={200}
                    priority={true}
                  />
                </div>
                <p className="">
                  {item.attributes.title.length > 20
                    ? item.attributes.title.substring(0, 15) + "..."
                    : item.attributes.title}
                </p>
                <p className="font-semibold">
                  {formatRupiah(item.attributes.price)}
                </p>
                {/* <button className="btn-primary">detail</button> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
