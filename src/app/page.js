import Brand from "@/components/Brand.jsx";
import ProductDisplay from "@/components/ProductDisplay";
import ImgDisplay from "@/components/ImgDisplay";
import BannerDisplay from "@/components/BannerDisplay";
import Category from "@/components/Category";
import About from "@/components/About";
import Hero from "@/components/Hero";

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
