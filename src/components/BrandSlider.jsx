"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import path from "path";
import { motion } from "framer-motion";

const BrandSlider = ({ data }) => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  // console.log(data);
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

  const image = data.data.map((item) =>
    console.log(item.attributes.img.data[0].attributes.url)
  );

  // image.map((item) => console.log(item[0].attributes.url));

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
            <Link
              href={{
                pathname: "/products",
                query: { brand: item.attributes.tilte },
              }}
            >
              <motion.div
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.5 },
                }}
                whileTap={{ scale: 0.6 }}
                className="py-10 flex gap-5 items-center justify-center "
              >
                <Image
                  // default
                  // src={
                  //   process.env.NEXT_PUBLIC_API_IMAGE +
                  //   item.attributes.img.data.attributes.url
                  // }
                  //use claudinary
                  src={item.attributes.img.data[0].attributes.url}
                  alt={item.attributes.tilte}
                  width={200}
                  height={200}
                  placeholder="blur"
                  blurDataURL={item.attributes.img.data[0].attributes.url}
                  className=" w-auto md:h-20 h-10  object-fill "
                />
              </motion.div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSlider;
