"use client";

import { useContext, useEffect } from "react";
// import { redirect } from "next/navigation";
import context from "../context/userContextWrapper";
import Link from "next/link";

const HomeComponent = () => {
  const { user, dbToken } = useContext(context) as ContextType;

  if (!user || !dbToken) {
    return (
      <h1
        style={{
          color: "gray",
          fontSize: "12px",
        }}
      >
        <Link
          style={{
            color: "blue",
            textDecoration: "underline",
          }}
          href="/sign-up"
        >
          Click here
        </Link>
        , to register an account. <br />
        <Link
          style={{
            color: "blue",
            textDecoration: "underline",
          }}
          href="/log-in"
        >
          Click here
        </Link>
        , to log in if you already have one
      </h1>
    );
  }

  return (
    <div>
      <h4 style={{ color: "red", fontSize: "12px" }}>
        Thank You For Verifying Your Account And Thank You For Visiting This
        Demo Project{" "}
      </h4>
      <textarea placeholder="Leave a comment" />
    </div>
  );
};

export default HomeComponent;
