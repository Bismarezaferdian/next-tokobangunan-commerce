import Image from "next/image";
import Example from "../../public/megautama.png";
import WrapLayout from "@/app/WrapLayout";

const ImgDisplay = () => {
  return (
    <WrapLayout>
      <div className="grid overflow-hidden">
        <div className="">
          <h1 className="font-semibold text-base md:text-lg  pb-4">
            Mega Utama
          </h1>
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-4 ">
          <div className="row-span-2 items-center rounded-lg overflow-hidden">
            <Image
              src={Example}
              alt="example"
              className="h-full object-cover"
            />
          </div>
          <div className="row-span-1 rounded-lg overflow-hidden">
            <Image
              src={Example}
              alt="example"
              className="object-cover h-full"
            />
          </div>
          <div className="row-span-1 rounded-lg overflow-hidden">
            <Image src={Example} alt="example" className="h-full" />
          </div>
        </div>
      </div>
    </WrapLayout>
  );
};

export default ImgDisplay;
