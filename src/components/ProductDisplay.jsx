import Link from "next/link";
import ProductSlider from "./ProductSlider";
import WrapLayout from "@/app/WrapLayout";

const getData = async () => {
  const res = await fetch("http://localhost:1337/api/products?populate=*", {
    cache: "no-store",
    headers: {
      Authorization: "bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
    },
  });

  if (!res.ok) {
    throw new Error(Error);
  }

  return res.json();
};

const ProductDisplay = async () => {
  const datas = await getData();
  // console.log(datas);

  return (
    <WrapLayout>
      <div>
        <div className="flex justify-between items-center overflow-hidden pt-4 ">
          <h1 className="font-semibold text-base md:text-lg whitespace-nowrap">
            Product Terbaru
          </h1>
          <button className="">
            <Link href="/products">
              <p className="text-emerald-600 font-semibold">lihat semua</p>
            </Link>
          </button>
        </div>
        <ProductSlider data={datas} />
      </div>
    </WrapLayout>
  );
};

export default ProductDisplay;
