import About from "@/components/About";
import BannerDisplay from "@/components/BannerDisplay";
import React from "react";

function page() {
  return (
    <div className="grid container mx-auto ">
      <BannerDisplay />
      <About />
    </div>
  );
}

export default page;
