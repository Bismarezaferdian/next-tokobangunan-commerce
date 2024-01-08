import Brand from "@/components/Brand.jsx";
import ProductDisplay from "@/components/ProductDisplay";
import ImgDisplay from "@/components/ImgDisplay";
import BannerDisplay from "@/components/BannerDisplay";
import Category from "@/components/Category";
import About from "@/components/About";
import { parseCookies, setCookie } from "nookies";
import WrapLayout from "./WrapLayout";
import Hero from "@/components/Hero";

const getDataCart = async (userID) => {
  const res = await fetch(
    `http://localhost:1337/api/carts?populate=*&filters[users_permissions_users][id][$eq]=${userID}`,
    {
      cache: "no-store",
      // headers: {
      //   Authorization: "bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
      // },
    }
  );
  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

export default async function Home() {
  return (
    <div>
      <Hero />
      <div className="container px-2 mx-auto overflow-hidden backdrop-opacity-20 ">
        <div>
          <Category />
          <Brand />
          <BannerDisplay />
          <ProductDisplay />
          <ImgDisplay />
          <About />
        </div>
      </div>
    </div>
  );
}
