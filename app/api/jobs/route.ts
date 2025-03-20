import SampleData from "@/models/SampleData";

export async function GET() {
  const URL = "https://jsonplaceholder.typicode.com/posts";

  const response = await fetch(URL);
  console.log(response);
  const json = (await response.json()) as SampleData[];
  console.log(json);

  // Return JSON response
  return new Response(JSON.stringify(json), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
