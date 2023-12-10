export async function POST(request) {
  const { origin, destination, weight, courier } = await request.json();

  try {
    const res = await fetch("https://api.rajaongkir.com/starter/cost", {
      method: "POST",
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
        Accept: "application/json",
        key: process.env.NEXT_PUBLIC_RAJAONGKIR_KEY,
      },
      body: JSON.stringify({
        origin: origin,
        destination: destination,
        weight: weight,
        courier: courier,
      }),
    });

    if (!res.ok) {
      // Handle non-successful responses
      console.error(`Error: ${res.status} - ${res.statusText}`);
      return Response.json(
        { error: "Failed to fetch data" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return Response.json(data.rajaongkir?.results, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
}
