"use client";

import { useParams } from "next/navigation";

import React, { useEffect } from "react";
import { notFound } from "next/navigation";

type Params = {
  id: string;
  name: string | number;
  slug: string;
};

export default function Job() {
  const params = useParams() as Params;
  const slug = params.slug;

  const id = params.id;
  const name = params.name;

  useEffect(() => {
    console.log("id", id);
    console.log("name", name);
  }, [id, name]);

  // if id is not a number, return 404
  //   if (typeof name === "number") {
  //     return notFound();
  //   }

  // If `name` is a number, return 404
  if (!isNaN(parseFloat(name))) {
    return notFound();
  }

  return (
    <div>
      <div>page</div>
      <div>{id}</div>

      <div>{name}</div>
      <div>{slug}</div>
    </div>
  );
}
