import { connectToDB } from "@/lib/dbConnect";
import SampleComment from "@/lib/models/Comment";
import mongoose from "mongoose";

export async function GET(): Promise<Response> {
  await connectToDB();

  const findResult = await SampleComment.find();

  return new Response(JSON.stringify(findResult), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
