"use client";
import { STRAPI_URL, STRAPI_TOKEN } from "@/lib/constants/strapi";
import { fetchDataFromStrapi } from "@/lib/strapi";
import React, { useEffect, useState } from "react";

type Category = {
  id: number;
  Name: string;
  documentId: string;
};

export default function AllCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await fetchDataFromStrapi<Category[]>("/categories");

        const data = categories;
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      AllCategories
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <a href={`/categories/${category.documentId}`}>{category.Name}</a>
          </div>
        ))}
      </div>
    </div>
  );
}
