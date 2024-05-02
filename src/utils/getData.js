// import useSWR from "swr";

import useSWR from "swr";
import { errorMessage, successMessage } from "./notification";

// const fetcher = (url) =>
//   fetch(url, {
//     headers: {
//       Authorization: "bearer " + process.env.API_TOKEN,
//     },
//   }).then((res) => res.json());

// export const getItem = () => {
//   const { data, error, isLoading } = useSWR(
//     `http://localhost:1337/api/products?populate=*`,
//     fetcher
//   );

//   return {
//     data: data,
//     isLoading: isLoading,
//     isError: error,
//   };
// };
const fecther = (url) => fetch(url).then((res) => res.json());

export const getProvince = () => {
  const {
    data: province,
    isLoading,
    error,
  } = useSWR(`https://megautama.netlify.app/api/ongkir/province`, fecther);
  return { province, isLoading, error };
};
export const getCity = (city_ID) => {
  const {
    data: city,
    isLoading: cityLoading,
    error: cityError,
  } = useSWR(
    `https://megautama.netlify.app/api/ongkir/city?id=${city_ID}`,
    fecther
  );
  return { city, cityLoading, cityError };
};

export const getCost = async (destination, weight, courier) => {
  const res = await fetch("https://megautama.netlify.app/api/ongkir/cost", {
    method: "POST",
    body: JSON.stringify({
      origin: "501",
      destination: destination,
      weight: 1000,
      courier,
    }),
  });
  const data = await res.json();
  //   const data = await res.json();
  return data;
};

export const updateStok = async (idProduct, data) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${idProduct}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          stock: data,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = (userID) => {
  const param = `?populate=*&filters[users_permissions_users][id][$eq]=${userID}`;
  const {
    data: order,
    mutate,
    isLoading,
    // error,
  } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}/orders` + param], fecther);

  return { order, mutate, isLoading };
};

export const updateStatusPesanan = async (orderID, data) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            status: data,
          },
        }),
      }
    );
    // if (res.ok) {
    //   successMessage("success update status");
    // }
  } catch (error) {
    errorMessage(error);
  }
};

export const getCategory = () => {
  const {
    data: category,
    error: categoryError,
    isLoading: categoryLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?populate=*`,
    fecther
  );

  return { category, categoryError, categoryLoading };
};

export const getBrands = () => {
  const {
    data: brands,
    error: brandsError,
    isLoading: brandsLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/brands?populate=*`, fecther);
  return { brands, brandsError, brandsLoading };
};
