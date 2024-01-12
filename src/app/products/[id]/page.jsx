import SingleProduct from "@/components/SingleProduct";

const getProduct = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}?populate=image`,
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

const product = async ({ params }) => {
  const product = await getProduct(params.id);
  // console.log(product);
  return (
    <div className="flex container mx-auto h-fit ">
      <SingleProduct product={product} />
    </div>
  );
};

export default product;
