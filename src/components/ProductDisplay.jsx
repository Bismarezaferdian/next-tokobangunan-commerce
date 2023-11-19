import Nippon from "../../public/nipponcat.jpeg";
import Link from "next/link";
import ProductSlider from "./ProductSlider";

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
  console.log(datas);

  return (
    <div>
      <div className="">
        <div className="flex justify-between items-center ">
          <h1 className="font-semibold flex justify-start text-lg ">Product</h1>
          <button className="">
            <Link href="/">lihat semua</Link>
          </button>
        </div>
        <ProductSlider data={datas} />
      </div>
    </div>
  );
};

export default ProductDisplay;
