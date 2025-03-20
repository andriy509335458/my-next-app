import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookies_ = await cookies();

  // Clear the token cookie
  cookies_.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}
