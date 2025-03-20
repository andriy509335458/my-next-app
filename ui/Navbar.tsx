"use client";

import Link from "next/link";
import React from "react";
import Dropdown from "./Dropdown";

export default function Navbar() {
  return (
    <div style={{ margin: "20px", width: "fit-content" }}>
      Navbar
      <Dropdown
        headerText="Links"
        dropdownContent={
          <div
            className="flex flex-col absolute"
            style={{ backgroundColor: "white", padding: "5px" }}
          >
            <Link href="/">Home</Link>
            <Link href="/jobs"> Jobs </Link>
          </div>
        }
      />
    </div>
  );
}
