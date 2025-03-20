"use client";

import SampleData from "@/models/SampleData";
import Card from "@/ui/Card";
import { useEffect, useState } from "react";

export default function Home() {
  const [sampleData, setSampleData] = useState<SampleData[]>();

  useEffect(() => {
    async function onMount() {
      const response = await fetch("api/jobs");
      const data = await response.json();

      setSampleData(data);
    }

    onMount();
  }, []);

  return (
    <div>
      {sampleData &&
        sampleData.map((el) => {
          return <Card key={el.id} title={el.title} body={el.body} />;
        })}
    </div>
  );
}
