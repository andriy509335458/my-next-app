"use client";

import { fetchDataFromStrapi } from "@/lib/strapi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

async function fetchStrapiLabel(dataUrl: string) {
  console.log("fetchStrapiLabel", dataUrl);

  const data = await fetchDataFromStrapi<
    | {
        Title: string;
      }
    | {
        Name: string;
      }
  >(dataUrl);

  const humanReadableLabel = data.Title || data.Name;

  console.log("fetchStrapiLabel for ", dataUrl, humanReadableLabel);
  return humanReadableLabel;
}

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment);

  const [labels, setLabels] = useState<string[]>([]);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    // set label to uppercase first letter
    const label = decodeURIComponent(segment);

    // get human readable label from Strapi
    const humanReadableLabel = labels[index];

    return (
      <li key={href} className="inline">
        <Link href={href} className="text-blue-600 hover:underline">
          {humanReadableLabel || label}
        </Link>
        {index < segments.length - 1 && " / "}
      </li>
    );
  });

  useEffect(() => {
    const fetchLabels = async () => {
      const resolvedLabels = await Promise.all(
        segments.map(async (segment, index) => {
          try {
            const urlSoFar = "/" + segments.slice(0, index + 1).join("/");
            const label = await fetchStrapiLabel(urlSoFar);
            return label;
          } catch (error) {
            return segment; // In case of error, fallback to the slug
          }
        })
      );
      setLabels(resolvedLabels);
    };

    fetchLabels();
  }, []);

  return (
    <div>
      <nav aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="inline">
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            {segments.length > 0 && " / "}
          </li>
          {breadcrumbs}
        </ol>
      </nav>
      <div>{children}</div>
    </div>
  );
}
