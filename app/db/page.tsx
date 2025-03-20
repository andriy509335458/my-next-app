"use client";

import React, { useEffect, useState } from "react";

export default function DbData() {
  const [data, setData] = useState<object[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/db/data");
      const data = await response.json();

      console.log(data);
      setData(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      {data.map((el, i) => {
        return (
          <div
            style={{
              padding: "10px",
              border: "1px solid black",
              margin: "10px",
            }}
            key={i}
          >
            {JSON.stringify(el)}
          </div>
        );
      })}
    </div>
  );
}
