"use client";
import { easeInOut, motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const WrapLayout = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const mainControl = useAnimation();

  useEffect(() => {
    // console.log(isInView);
    if (isInView) {
      mainControl.start("visible");
    } else {
      mainControl.start("hidden");
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={"hidden"}
      animate={mainControl}
      transition={{ duration: 1.5, delay: 0.5, ease: easeInOut }}
    >
      {children}
    </motion.div>
  );
};

export default WrapLayout;
