import { errorMessage, successMessage } from "../notification";

const useCartStore = (set, get) => ({
  //initial state
  cartID: null,
  products: [],
  qty: 0,
  weight: 0,
  totalPrice: 0,

  //function add to cart add accept parameter item
  addToCart: async (item) => {
    //get state pada product
    const products = get().products;
    //apakah product baru sudah ada di dalam keranjang
    const productInCart = products.find((product) => product.id === item.id);
    //jika product sudah ada di cart
    if (productInCart) {
      const updateState = products.map((product) =>
        product.id === item.id
          ? {
              ...product,
              //update qty and price in products
              qty: product.qty + item.qty,
              price: product.price + item.price,
            }
          : product
      );
      set((state) => ({
        //update initial state
        products: updateState,
        // qty: state.qty + item.qty,
        weight: state.weight + item.weight * item.qty,
        totalPrice: state.totalPrice + item.price,
      }));
      // successMessage("product dimasukan keranjang !");
    } else {
      //jika tidak ada di cart update cart
      set((state) => ({
        products: [...state.products, item],
        qty: state.qty + 1,
        weight: state.weight + item.weight * item.qty,
        totalPrice: state.totalPrice + item.price,
      }));
    }
    //UPDATE DI DATABASE
    //setelah update di localstate selesai update database
    const data = {
      data: {
        products: get().products,
        qty: get().qty,
        weight: get().weight,
        totalPrice: get().totalPrice,
        //add user relation di database
        users_permissions_users: item.userID,
      },
    };

    //ambil id cart
    const cartid = get().cartID;
    //jika cart id tidak null artynya cust punya cart
    //update cart database
    if (cartid !== null) {
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

      //handle jika put database berhasil/tidak
      if (res.ok) {
        successMessage("product dimasukan keranjang !");
      } else {
        errorMessage("product tidak bisa dimasukan keranjang !");
      }
      //jika cartid null artynya customer belum punya cart
    } else {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseCart = await res.json();
      //handle jika post database berhasil/tidak

      if (res.ok) {
        set(() => ({
          cartID: responseCart.data.id,
        }));
        successMessage("product dimasukan keranjang !");
      } else {
        errorMessage("product tidak bisa dimasukan keranjang !");
      }
    }

    // set((state) => ({ products: [], qty: 0, weight: 0, totalPrice: 0 }));
  },

  updateCart: (item) => {
    set(() => ({
      cartID: item[0].id,
      products: item[0].attributes.products,
      qty: item[0].attributes.qty,
      weight: item[0].attributes.weight,
      totalPrice: item[0].attributes.totalPrice,
    }));
  },

  deleteCart: async (item) => {
    //get pproduct in state
    const products = get().products;
    //get product after delete
    const deleteProduct = products.filter((cart) => cart.id !== item.id);
    //update state
    set((state) => ({
      products: deleteProduct,
      qty: state.qty - 1,
      weight: state.weight - item.weight * item.qty,
      totalPrice: state.totalPrice - item.price,
    }));
    //update in database
    const data = {
      data: {
        products: get().products,
        qty: get().qty,
        weight: get().weight,
        totalPrice: get().totalPrice,
        users_permissions_users: item.userID,
      },
    };

    const cartid = get().cartID;
    if (cartid !== null) {
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

      //handle jika put database berhasil/tidak
      if (res.ok) {
        successMessage("product telah dihapus");
      } else {
        errorMessage("product tidak bisa dihapus !");
      }
    } else {
      errorMessage("user tidak ada ");
    }
  },

  resetCart: async (cartID) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/carts/${cartID}`,
        {
          method: "DELETE",
        }
      );

      //handle jika delete database berhasil/tidak
      if (res.ok) {
        set(() => ({
          cartID: null,
          products: [],
          qty: 0,
          weight: 0,
          totalPrice: 0,
        }));
        // successMessage("product telah dihapus");
      }
    } catch (error) {
      errorMessage(error);
    }
  },
});

export default useCartStore;
