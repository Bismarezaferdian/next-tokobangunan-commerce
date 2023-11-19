import Image from "next/image";
import Mega from "../../public/megautama.png";
import Brand from "@/components/Brand.jsx";
import ProductDisplay from "@/components/ProductDisplay";
import ImgDisplay from "@/components/ImgDisplay";
import BannerDisplay from "@/components/BannerDisplay";
import Category from "@/components/Category";
import About from "@/components/About";
import { parseCookies } from "nookies";

export default function Home() {
  const token = parseCookies();
  console.log(token);
  return (
    <div className="container mx-auto overflow-hidden">
      <Image src={Mega} alt="toko" priority={true} />
      <div>
        <Category />
        <Brand />
        <ProductDisplay />
        <BannerDisplay />
        <ImgDisplay />
        <About />
      </div>
    </div>
  );
}
