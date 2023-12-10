// import useSWR from "swr";

import useSWR from "swr";

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
  } = useSWR(`http://localhost:3000/api/ongkir/province`, fecther);
  return { province, isLoading, error };
};
export const getCity = (city_ID) => {
  const {
    data: city,
    isLoading: cityLoading,
    error: cityError,
  } = useSWR(`http://localhost:3000/api/ongkir/city?id=${city_ID}`, fecther);
  return { city, cityLoading, cityError };
};

export const getCost = async (destination, weight, courier) => {
  const res = await fetch("http://localhost:3000/api/ongkir/cost", {
    method: "POST",
    body: JSON.stringify({
      origin: "501",
      destination: destination,
      weight: 5000,
      courier,
    }),
  });
  const data = await res.json();
  //   const data = await res.json();
  return data;
};
