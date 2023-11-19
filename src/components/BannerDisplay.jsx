import Image from "next/image";
import Banner from "../../public/elastex.jpg";

const BannerDisplay = () => {
  return (
    <div className="h-screen">
      <div className="p-4">
        <div className="flex items-center justify-center">
          <h1 className="font-semibold  text-lg pt-16 pb-8">
            Kenapa harus Mega Utama ?
          </h1>
        </div>
      </div>
      <div className="grid  md:grid-cols-2 grid-cols-1 h-96 ">
        <div className=" w-full bg-emerald-500 ">
          {/* <Image src={Banner} alt="" /> */}
          <div className="flex flex-col text-center justify-end h-full bg-gray-400 p-10 items-center">
            <h1 className="text-xl ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum,
              accusamus.
            </h1>
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo rem
              laudantium quod sit quidem sint asperiores dolor sed molestiae
              qui.
            </h1>
            <button className="btn-primary medium">View products</button>
          </div>
        </div>
        <div className=" w-full ">
          <div className="flex flex-col bg-lime-600 text-center justify-end h-full p-10 items-center ">
            <h1 className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
              magni.
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
              voluptas. Quo ea quod ab esse reiciendis dolorum amet quibusdam
              nesciunt!
            </p>
            <button className="btn-primary medium">View Products</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerDisplay;
