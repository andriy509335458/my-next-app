import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signJWT } from "@/lib/jwt"; // helper to sign JWT
import { cookies } from "next/headers";
import User from "@/lib/models/User";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = await User.find({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = signJWT({ id: user.id, email: user.email });

  // Set cookie
  const cookies_ = await cookies();
  cookies_.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json({ message: "Logged in" });
}
