import WrapLayout from "@/app/WrapLayout";
import CategorySlider from "./categorySlider";

const Category = () => {
  return (
    <WrapLayout>
      <div className="">
        <div className=" flex justify-between items-center py-4">
          <h1 className="font-semibold text-base md:text-lg whitespace-nowrap">
            Category Teratas
          </h1>
        </div>
        <CategorySlider />
      </div>
    </WrapLayout>
  );
};

export default Category;
