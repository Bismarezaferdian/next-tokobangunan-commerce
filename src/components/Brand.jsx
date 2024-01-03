import WrapLayout from "@/app/WrapLayout";
import BrandSlinder from "./BrandSlider";

const getData = async () => {
  const res = await fetch("http://localhost:1337/api/brands?populate=*", {
    cache: "no-store",
    headers: {
      Authorization:
        "bearer " +
        "bf9de459709ceb9aba2a76f72e2dbccecb838b124bad17e8b4d3027ba5e1910dcf787fbc03de4eef7cbc09eb3f95a3a6a8baebc1a92f6cf21e006d5b9b3bc0d4706fabf32a6be394399acb87c2f0aa7bc9f3848c2329308debdcfa2e1f3938b70fe21d0746ab76569635fb8885264e985e425c3565f71b2666e7d80b77c31e89",
    },
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const Brand = async () => {
  const data = await getData();

  return (
    <WrapLayout>
      <div>
        <div className="flex justify-between items-center py-4">
          <h1 className="font-semibold text-base md:text-lg whitespace-nowrap">
            Brand pilihan
          </h1>
        </div>
        <BrandSlinder data={data} />
      </div>
    </WrapLayout>
  );
};

export default Brand;
