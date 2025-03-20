import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import { redirect } from "next/navigation";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/dbConnect";

export async function getCurrentlyLoggedInUser() {
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

  return user; // Return the user document or null if not found
}

export default async function PrivatePage() {
  const cookies_ = await cookies();
  const token = cookies_.get("token")?.value;
  const payload = token ? verifyJWT(token) : null;

  if (!payload) {
    // Redirect to login
    redirect("/login");
  }

  await connectToDB();
  const user = await User.findOne({ email: payload.email });

  return <div>Welcome, {user?.email}</div>;
}
