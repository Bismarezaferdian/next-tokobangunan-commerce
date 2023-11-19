import AllProduct from "@/components/AllProduct";

const getDataProduct = async () => {
  const res = await fetch("http://localhost:1337/api/products?populate=*", {
    cache: "no-store",
    headers: {
      Authorization: "bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
    },
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};
const getDataBrand = async () => {
  const res = await fetch("http://localhost:1337/api/brands?populate=*", {
    cache: "no-store",
    // headers: {
    //   Authorization: "bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
    // },
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};
const getDataCategory = async () => {
  const res = await fetch("http://localhost:1337/api/categories?populate=*", {
    cache: "no-store",
    headers: {
      Authorization: "bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
    },
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const Products = async () => {
  // const dataProduct = getDataProduct();
  const dataBrand = getDataBrand();
  const dataCategory = getDataCategory();

  const [brand, category] = await Promise.all([dataBrand, dataCategory]);

  return (
    <div className="grid container mx-auto min-h-screen ">
      <AllProduct category={category} brand={brand} />
    </div>
  );
};

export default Products;
