export async function GET(request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const id = searchParams.get("id");
  // console.log(id);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RAJAONGKIR_URL}/city?province=${id}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        key: process.env.NEXT_PUBLIC_RAJAONGKIR_KEY,
      },
    }
  );
  const data = await res.json();

  return Response.json(data.rajaongkir.results);
}
