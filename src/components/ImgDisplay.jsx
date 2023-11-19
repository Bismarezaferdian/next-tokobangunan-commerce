import Image from "next/image";
import Example from "../../public/megautama.png";

const ImgDisplay = () => {
  return (
    <div className="grid ">
      <div className="p-4">
        <div className="flex items-center justify-center">
          <h1 className="font-semibold text-lg pt-16 pb-8">Mega Utama</h1>
        </div>
      </div>
      <div className="grid grid-rows-2 grid-flow-col gap-4">
        <div className="row-span-2 bg-red-300 items-center ">
          <Image src={Example} alt="example" className="h-full object-cover" />
        </div>
        <div className="row-span-1 bg-emerald-400 ">
          <Image src={Example} alt="example" className="object-cover h-full" />
        </div>
        <div className="row-span-1 bg-yellow-400 ">
          <Image src={Example} alt="example" className="h-full" />
        </div>
      </div>
    </div>
  );
};

export default ImgDisplay;
