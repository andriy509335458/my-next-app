import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import { redirect } from "next/navigation";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/dbConnect";

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
