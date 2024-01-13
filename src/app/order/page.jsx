"use client";
import Shipping from "@/components/shipping";
import { formatRupiah } from "@/utils/formatMatauang";
import { updateStok } from "@/utils/getData";
import { successMessage } from "@/utils/notification";
import { combineStore } from "@/utils/zustand/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function Order({ searchParams }) {
  const router = useRouter();
  //di ambil dari state management zustand
  const { products, qty, weight, totalPrice, user, resetCart, cartID } =
    combineStore();
  const [validation, setValidation] = useState(false);
  const [expedisi, setExpedisi] = useState(null);
  //menampung biaya ongkir
  const [cost, setCost] = useState();
  //menampung select dari component shipping/ data jasa expedisi
  const [select, setSelect] = useState();
  //data dari input user
  const [dataOrder, setDataOrder] = useState({
    totalHarga: 0,
    jenisPembayaran: undefined,
    bank: undefined,
    product: undefined,
    pengiriman: undefined,
    //add user relation di database
    users_permissions_users: null,
  });

  //setiap kali page direload setDataOrder product dan users_permissions_users dari zustand
  useEffect(() => {
    const fetchData = async () => {
      await combineStore.persist.rehydrate();
      //cek apakah ada data di searchParams.products
      if (!searchParams.products) {
        //jika tidak ada update data order dari cart
        setDataOrder((prev) => ({
          ...prev,
          totalHarga: totalPrice,
          //tidak bisa ambil dari combineStore karna reyhydrate
          product: combineStore.getState().products,
          users_permissions_users: combineStore.getState().user.id,
        }));
      } else {
        //jika ada data dari searchParams
        const dataProduct = JSON.parse(searchParams.products);
        //jumlahkan semua harga pproduct
        const totalHarga = dataProduct.product
          .map((item) => item.price)
          .flat()
          .reduce((acc, curr) => acc + curr, 0);
        //upudate dataOrder dari seacrhParams/history order
        setDataOrder((prev) => ({
          ...prev,
          totalHarga: totalHarga,
          product: dataProduct.product,
          users_permissions_users: combineStore.getState().user.id,
        }));
      }
    };

    fetchData();
  }, []);

  //ketika ada perubahan pada totalPrice dan cost
  //set cost dari input user yang memilih pengiriman
  useEffect(() => {
    if (
      //cost di ambil dari data ongkos kirim
      (totalPrice !== undefined && cost !== null && cost) ||
      cost?.cost[0]?.value !== undefined
    ) {
      setDataOrder((prev) => ({
        ...prev,
        //update total harga di tambah ongkos kirim
        totalHarga:
          //cost di ambil dari cost toko dan jasa expedisi
          dataOrder.totalHarga + (cost?.toko || cost?.expedisi?.cost[0]?.value),
        //update data dari jasa pengiriman
        pengiriman: select,
      }));
    }
  }, [totalPrice, cost]);

  //handle user select
  const handleSelect = (e) => {
    if (e.target.value === "toko") {
      setCost((prev) => ({
        ...prev,
        [e.target.name]: 100000,
      }));
    }
    setExpedisi(e.target.value);
  };
  console.log(select);

  const handleDataOrder = (e) => {
    setDataOrder((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const runValidation = () => {
    setValidation(!validation);
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    //post order

    if (
      !dataOrder.jenisPembayaran ||
      !dataOrder.bank ||
      dataOrder.totalPrice === 0
    ) {
      runValidation();
    } else {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: dataOrder }),
        });
        //handle jika post database berhasil/tidak
        console.log(res);
        if (res.ok) {
          products.map((item) => updateStok(item.id, item.stock - item.qty));
          resetCart(cartID);
          successMessage("pesanan berhasil !");
          router.push(
            `/payment?totalHarga=${dataOrder.totalHarga}&jenisPembayaran=${dataOrder.jenisPembayaran}&bank=${dataOrder.bank}`
          );
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  };
  // console.log(JSON.parse(select.cost));

  console.log(dataOrder);

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="flex gap-2">
        <div className=" flex flex-col detail-transaksi w-full gap-2 ">
          <div className="alamat bg-slate-50 p-4 ">
            <h1 className=" text-sm font-semibold ">Detail pengiriman</h1>
            <p className="text-sm text-slate-600">{user.username}</p>
            <p className="text-sm text-slate-600">{user.address}</p>
            <p className="text-sm text-slate-600">{user.phoneNumber}</p>
            <Link href="/profile">
              <button className="text-xs flex  text-slate-900 mt-2 px-2 py-1 rounded-sm border border-slate-900 hover:bg-slate-100">
                ubah alamat
              </button>
            </Link>
          </div>

          <div className="detail-barang p-4 bg-slate-50 ">
            <h1 className="text-sm font-semibold ">Detail Barang</h1>
            {dataOrder?.product?.map((item, index) => (
              <div className="flex w-full border-b-2" key={item.id}>
                <div className="card-content flex gap-1 w-fit ">
                  <div className="desc-product flex">
                    <div className="">
                      <p className="card text-slate-700 text-xs ">
                        {index + 1}.
                      </p>
                    </div>
                    <div className="">
                      <p className="card text-slate-700 font-semibold text-xs ">
                        {item.title}
                      </p>
                      <p className="card text-xs text-slate-600">
                        Jumlah:{" "}
                        {item.qty > 1 ? item.qty + "pcs" : item.qty + "pc"}
                      </p>
                      <p className="card text-xs text-slate-600">
                        berat: {item.weight} kg
                      </p>
                      <p
                        className={`text-xs text-slate-500 ${
                          item.stock <= 1 ? "bg-red-200" : "bg-green-200"
                        } bg-green-200 w-fit px-2 rounded-md`}
                      >
                        stock: {item.stock}
                      </p>
                      <p className="card ">Rp.{item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 p-4">
            <h1 className=" text-sm font-semibold"> Pengiriman</h1>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Pilih Pengiriman
            </label>
            <select
              onChange={handleSelect}
              id="toko"
              name="toko"
              className="bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={""}>jenis pengiriman</option>
              <option value="toko">pengiriman toko</option>
              <option value="expedisi">pengiriman expedisi</option>
            </select>
            {expedisi === "toko" && (
              <span className="font-light italic text-xs text-red-600">
                Max jarak 10 km dari toko, dikirim hari yang sama
              </span>
            )}
            {validation && (
              <span className="font-light italic text-xs text-red-600">
                Jenis Pengiriman Harus Dipilih
              </span>
            )}
          </div>

          {expedisi === "expedisi" && (
            <Shipping
              weight={weight}
              setCost={setCost}
              cost={cost}
              setSelect={setSelect}
              select={select}
            />
          )}
        </div>
        <div className="daftar-bank w-full h-fit">
          <div className="bg-slate-50 p-4">
            <h1 className=" text-sm font-semibold">pembayaran</h1>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Pilih metode pembayaran
            </label>
            <select
              onChange={handleDataOrder}
              id="jenisPembayaran"
              name="jenisPembayaran"
              className="bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={""}>jenis pembayaran</option>
              <option value="Transfer Bank">Transfer bank manual</option>
              <option value="VA">Virtual account</option>
            </select>
            {dataOrder?.jenisPembayaran === "VA" && (
              <span className="font-light italic text-xs text-red-600">
                maaf jenis pembayaran ini belum tersedia sekarang
              </span>
            )}
            {!dataOrder.jenisPembayaran && validation && (
              <span className="font-light italic text-xs text-red-600">
                Jenis Pembayaran Harus Dipilih
              </span>
            )}
            {dataOrder?.jenisPembayaran === "Transfer Bank" && (
              <div className="py-4">
                <label
                  htmlFor="bank"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Pilih Bank
                </label>
                <select
                  onChange={handleDataOrder}
                  id="bank"
                  name="bank"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="">-Pilih Bank-</option>
                  <option value="bca-123456789">Bank BCA</option>
                  <option value="mandiri-1234556">Bank MANDIRI</option>
                  <option value="bri-1234455">Bank BRI</option>
                </select>
                {!dataOrder.bank && validation && (
                  <span className="font-light italic text-xs text-red-600">
                    Bank Harus Dipilih
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="alamat bg-slate-50 p-4 mt-4">
            {/* <h1 className=" text-sm font-semibold ">Total Harga</h1>
            <div className="flex justify-between">
              <p className="text-sm  text-slate-600">
                Harga sebelum ppn
                <span className="font-light italic">
                  ( {qty} {`${qty > 1 ? "items" : "item"}`}):
                </span>
              </p>
              <p className="text-sm font-semibold">
                {formatRupiah(dataOrder?.totalHarga)}
              </p>
            </div> */}
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-slate-600">ppn: </p>
              <p>free</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-slate-600">
                Biaya pengiriman:{" "}
                <span className="font-light italic">( {weight}kg):</span>
              </p>

              <p className="text-sm font-semibold">
                {cost?.expedisi !== undefined
                  ? formatRupiah(cost?.expedisi.cost[0]?.value)
                  : formatRupiah(cost?.toko)}
                {/* {cost !== null ? formatRupiah(cost.cost[0].value) : 0} */}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm  text-slate-600">
                Harga sebelum ppn
                <span className="font-light italic">
                  ( {qty} {`${qty > 1 ? "items" : "item"}`}):
                </span>
              </p>
              <p className="text-sm font-semibold">
                {formatRupiah(dataOrder?.totalHarga)}
              </p>
            </div>
          </div>
          <div className="flex justify-end p-4">
            <Link
              href={{
                // pathname: path,
                query: {
                  totalHarga: dataOrder.totalHarga,
                  jenisPembayaran: dataOrder.jenisPembayaran,
                  bank: dataOrder.bank,
                },
                // type: "replace",
              }}
            >
              <button
                type="button"
                className="btn-primary medium"
                onClick={handleOrder}
              >
                Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default withRouter(Order);
export default Order;
