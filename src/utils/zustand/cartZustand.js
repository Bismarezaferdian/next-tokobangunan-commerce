// import { toast } from "react-toastify";
// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { successMessage } from "../notification";

// const useCartStore = create(
//   persist(
//     (set, get) => ({
//       products: [],
//       qty: 0,
//       weight: 0,
//       totalPrice: 0,

//       addToCart: (item) => {
//         const products = get().products;
//         // console.log(products);
//         // console.log(item);
//         //apakah product baru sudah ada di dalam keranjang
//         const productInCart = products.find(
//           (product) => product.id === item.id
//         );

//         if (productInCart) {
//           const updateState = products.map((product) =>
//             product.id === item.id
//               ? {
//                   ...item,
//                   qty: product.qty + item.qty,
//                   price: product.price + item.price * item.qty,
//                 }
//               : item
//           );

//           set((state) => ({
//             products: updateState,
//             // qty: state.qty + item.qty,
//             weight: state.weight + item.weight * item.qty,
//             totalPrice: state.totalPrice + item.price * item.qty,
//           }));
//           // successMessage("product dimasukan keranjang !");
//         } else {
//           set((state) => ({
//             products: [...state.products, item],
//             qty: state.qty + 1,
//             weight: state.weight + item.weight * item.qty,
//             totalPrice: state.totalPrice + item.price * item.qty,
//           }));
//         }
//         successMessage("product dimasukan keranjang !");

//         // set((state) => ({ products: [], qty: 0, weight: 0, totalPrice: 0 }));
//       },
//     })
//     // {
//     //   name: "product", // Specify a name for persistence
//     //   skipHydration: true,
//     // }
//   )
// );

// export default useCartStore;

import { errorMessage, successMessage } from "../notification";

const useCartStore = (set, get) => ({
  cartID: null,
  products: [],
  qty: 0,
  weight: 0,
  totalPrice: 0,

  addToCart: async (item) => {
    const products = get().products;

    //apakah product baru sudah ada di dalam keranjang
    const productInCart = products.find((product) => product.id === item.id);

    if (productInCart) {
      const updateState = products.map((product) =>
        product.id === item.id
          ? {
              ...item,
              qty: product.qty + item.qty,
              price: product.price + item.price * item.qty,
            }
          : item
      );

      set((state) => ({
        products: updateState,
        // qty: state.qty + item.qty,
        weight: state.weight + item.weight * item.qty,
        totalPrice: state.totalPrice + item.price * item.qty,
      }));

      // successMessage("product dimasukan keranjang !");
    } else {
      set((state) => ({
        products: [...state.products, item],
        qty: state.qty + 1,
        weight: state.weight + item.weight * item.qty,
        totalPrice: state.totalPrice + item.price * item.qty,
      }));
    }

    const data = {
      data: {
        products: get().products,
        qty: get().qty,
        weight: get().weight,
        totalPrice: get().totalPrice,
      },
    };

    console.log(data);

    const cartid = get().cartID;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/carts/${cartid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (res.ok) {
      successMessage("product dimasukan keranjang !");
    } else {
      errorMessage("product tidak bisa dimasukan keranjang !");
    }
    // set((state) => ({ products: [], qty: 0, weight: 0, totalPrice: 0 }));
  },

  updateCart: (item) => {
    console.log(item[0].id);
    set((state) => ({
      cartID: item[0].id,
      products: item[0].attributes.products,
      qty: item[0].attributes.qty,
      weight: item[0].attributes.weight,
      totalPrice: item[0].attributes.totalPrice,
    }));
  },
});

export default useCartStore;
