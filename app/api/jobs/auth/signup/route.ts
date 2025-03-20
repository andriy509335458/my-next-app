import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user in DB
  await db.user.create({
    data: { email, password: hashedPassword },
  });

  return NextResponse.json({ message: "User created" }, { status: 201 });
}
