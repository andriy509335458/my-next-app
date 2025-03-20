"use client";

import Link from "next/link";
import React from "react";
import Dropdown from "./Dropdown";

export default function Navbar({ user }: { user: { email: string } | null }) {
  return (
    <div style={{ margin: "20px", width: "fit-content" }}>
      Navbar {user ? ` - Logged in as ${user.email}` : ""}
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
      <Link
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        href="/auth/login"
      >
        Login
      </Link>
      <Link
        className="mx-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        href="/auth/signup"
      >
        Register
      </Link>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={async () => {
          await fetch("/api/auth/logout", {
            method: "POST",
          });
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
}
