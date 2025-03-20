"use client";

import Link from "next/link";
import React from "react";
import Dropdown from "./Dropdown";

export default function Navbar() {
  return (
    <div>
      Navbar
      <Dropdown
        dropdownContent={
          <div className="flex flex-col absolute ">
            <Link href="/">Home</Link>
            <Link href="/jobs"> Jobs </Link>
          </div>
        }
      />
      {/* <div className="flex justify-around m-4">
        <Link href="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link href="/jobs" className="hover:text-blue-500">
          {" "}
          Jobs{" "}
        </Link>
      </div> */}
    </div>
  );
}
