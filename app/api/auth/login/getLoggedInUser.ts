import { connectToDB } from "@/lib/dbConnect";
import { verifyJWT } from "@/lib/jwt";
import User from "@/lib/models/User";
import { cookies } from "next/headers";

export async function getLoggedInUser() {
  const cookies_ = await cookies();
  const token = cookies_.get("token")?.value;

  if (!token) {
    return null; // No token found
  }

  const payload = verifyJWT(token);

  if (!payload) {
    return null; // Invalid token
  }

  await connectToDB();
  const user = await User.findOne({ email: payload.email });

  return { email: user?.email, password: user?.password }; // Return the user document or null if not found
}
