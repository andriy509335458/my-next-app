// "use client";

import React from "react";
import { notFound } from "next/navigation";

// import { useParams } from "next/navigation";

export default function Job({ params }) {
  //   const params = useParams();
  const slug = params.slug;
  const id = params.id;

  // if id is not a number, return 404
  if (isNaN(id)) {
    return notFound();
  }

  return (
    <div>
      <div>page</div>
      <div>{id}</div>
      <div>{slug}</div>
    </div>
  );
}
