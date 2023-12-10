import { NextResponse } from "next/server";
export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RAJAONGKIR_URL}/province`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          key: process.env.NEXT_PUBLIC_RAJAONGKIR_KEY,
        },
      }
    );

    if (!res.ok) {
      // Handle non-successful responses
      console.error(`Error: ${res.status} - ${res.statusText}`);
      return Response.json(
        { error: "Failed to fetch data" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}
