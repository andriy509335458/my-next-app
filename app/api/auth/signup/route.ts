import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/dbConnect";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  await connectToDB();
  // Save user in DB
  await User.create({ email, password: hashedPassword });

  console.log("User created");

  return NextResponse.json({ message: "User created" }, { status: 201 });
}
