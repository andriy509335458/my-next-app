"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Params = {
  id: string;
};

type Category = {
  id: number;
  documentId: string;
  Name: string;
  articles: Article[];
};

type Article = {
  id: number;
  documentId: string;
  Title: string;
  Body: any;
};

export default function Category() {
  const params = useParams() as Params;
  const id = params.id;

  const [category, setCategory] = useState<Category>();
  const strapiUrl = "http://localhost:1337/api";
  const strapiToken =
    "c3740badc7c714130828805fb7ce44afaf1f73c5e10d705e569c15a31eaa12581c2db2768013a158be0c93a8f0283ae941742941f28a805f4304022cb00a1d284df747777b33a9d52d12d1c063c690176252bb9a56c1ab0e1a9a58ca9dd20ec55967804b8974cd4ac696a87829250a2e8754415e9a5258629311dbb6c863e4a3";

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `${strapiUrl}/categories/${id}?populate=articles`, // Include populate query parameter
          {
            headers: {
              Authorization: `Bearer ${strapiToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = (await response.json()) as { data: Category[] };
        console.log(data);
        setCategory(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, [id]);

  return (
    <div>
      Category:
      <div>{category && <div key={category.id}>{category.Name}</div>}</div>
      <div>Category Articles: </div>
      <div className="card bg-white shadow-md rounded-lg p-4 mb-4">
        {category &&
          category.articles.map((article) => (
            <div key={article.id}>
              <a
                href={`/categories/${category.documentId}/${article.documentId}`}
              >
                {article.Title}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
