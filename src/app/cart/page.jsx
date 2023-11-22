import React from "react";

const Cart = () => {
  return (
    //ketika user login , get data cart lalu updte ke state
    //navbar cart icon get jumlah cart from state untuk update ke qty cart navbar
    //cart page get data from state untuk menampilkan yang ada di halalman cart
    <div className="container flex flex-col w-screen  mx-auto">
      {/* <div className="basis-3/4 bg-emerald-400 w-full">test</div>
      <div className="basis-1/4 bg-green-300 w-full">
        test Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
        exercitationem dolor vero.
      </div> */}
      <div className="w-full border-b-2">
        <div className="card "> item</div>
      </div>
      <div className="w-full border-b-2">
        <div className="card "> item</div>
      </div>
      <div className="w-full border-b-2">
        <div className="card "> item</div>
      </div>
    </div>
  );
};

export default Cart;
