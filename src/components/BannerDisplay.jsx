import Image from "next/image";
import Banner from "../../public/elastex.jpg";
import WrapLayout from "@/app/WrapLayout";

const BannerDisplay = () => {
  return (
    <WrapLayout>
      <div className=" overflow-hidden h-fit">
        <div className="py-4">
          <div className="flex items-center ">
            <h1 className="font-semibold text-base md:text-lg whitespace-nowrap ">
              Kenapa harus Mega Utama ?
            </h1>
          </div>
        </div>
        <div className="grid  md:grid-cols-2 grid-cols-1  ">
          <div className="max-h-fit ">
            {/* <Image src={Banner} alt="" /> */}
            <div className="flex flex-col md:text-center justify-end h-full  p-2 md:p-10 items-center">
              <h1 className="text-base font-semibold md:text-xl ">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum,
                accusamus.
              </h1>
              <h1 className="text-sm md:text-base py-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                rem laudantium quod sit quidem sint asperiores dolor sed
                molestiae qui.
              </h1>
              <button className="btn-primary medium flex justify-center">
                View products
              </button>
            </div>
          </div>
          <div className="max-h-fit">
            {/* <Image src={Banner} alt="" /> */}
            <div className="flex flex-col md:text-center justify-end h-full  p-2 md:p-10 items-center">
              <h1 className="text-base font-semibold md:text-xl ">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum,
                accusamus.
              </h1>
              <h1 className="text-sm md:text-base py-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                rem laudantium quod sit quidem sint asperiores dolor sed
                molestiae qui.
              </h1>
              <button className="btn-primary medium flex justify-center">
                View products
              </button>
            </div>
          </div>
        </div>
      </div>
    </WrapLayout>
  );
};

export default BannerDisplay;
