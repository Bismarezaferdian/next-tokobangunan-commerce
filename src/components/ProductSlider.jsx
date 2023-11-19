"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

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

  return (
    <div>
      <div className="">
        <Swiper
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
                    src={
                      process.env.NEXT_PUBLIC_API_IMAGE +
                      item.attributes.image.data.attributes.url
                    }
                    alt={item.attributes.title}
                    width={200}
                    height={200}
                    priority={true}
                  />
                </div>
                <p className="font-bold">
                  {item.attributes.title.length > 20
                    ? item.attributes.title.substring(0, 20) + "..."
                    : item.attributes.title}
                </p>
                <p>{item.attributes.price}</p>
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
