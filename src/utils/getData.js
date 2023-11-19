// import useSWR from "swr";

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
