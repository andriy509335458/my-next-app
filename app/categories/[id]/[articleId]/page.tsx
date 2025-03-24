"use client";
import { fetchDataFromStrapi } from "@/lib/strapi";
import RichTextRenderer from "@/ui/RichTextRenderer";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Params = {
  id: string;
  articleId: string;
};

type Article = {
  id: number;
  Title: string;
  Body: any;
};

export default function ArticlePage() {
  const params = useParams() as Params;
  const { id, articleId } = params;

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await fetchDataFromStrapi<Article>(
          `/articles/${articleId}`
        );
        console.log(data);
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  return (
    <div>
      <h1>Article Details</h1>
      {article ? (
        <div className="card bg-white shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">{article.Title}</h2>
          <div className="text-gray-700">
            <RichTextRenderer content={article.Body} />
          </div>
        </div>
      ) : (
        <p>Loading article...</p>
      )}
    </div>
  );
}
