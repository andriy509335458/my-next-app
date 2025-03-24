import { strapi } from "@strapi/client";
import { STRAPI_URL, STRAPI_TOKEN } from "./constants/strapi";

const client = strapi({
  baseURL: STRAPI_URL,
  auth: STRAPI_TOKEN,
});

// export const strapiClient = createClient("http://localhost:1337/api", {
//   headers: {
//     Authorization: `Bearer c3740badc7c714130828805fb7ce44afaf1f73c5e10d705e569c15a31eaa12581c2db2768013a158be0c93a8f0283ae941742941f28a805f4304022cb00a1d284df747777b33a9d52d12d1c063c690176252bb9a56c1ab0e1a9a58ca9dd20ec55967804b8974cd4ac696a87829250a2e8754415e9a5258629311dbb6c863e4a3`,
//   },
// });

export async function fetchDataFromStrapi<ResponseT>(
  dataPath: string
): Promise<ResponseT> {
  try {
    const response = await fetch(`${STRAPI_URL}${dataPath}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${dataPath}`);
    }

    const data = (await response.json()) as { data: ResponseT[] };
    return data.data as unknown as ResponseT;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
