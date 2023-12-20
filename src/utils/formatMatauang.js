export const formatRupiah = (nominal) => {
  const result = nominal?.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return result;
};

export const formatTanggal = (date) => {
  const tanggal = new Date(date);
  const result = tanggal.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return result;
};
