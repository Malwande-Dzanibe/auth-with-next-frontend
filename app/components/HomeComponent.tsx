"use client";

import { useContext, useEffect } from "react";
// import { redirect } from "next/navigation";
import context from "../context/userContextWrapper";
import Link from "next/link";

const HomeComponent = () => {
  const { user, dbToken } = useContext(context) as ContextType;

  if (!user) {
    return (
      <h1>
        <Link
          style={{
            color: "blue",
            textDecoration: "underline",
          }}
          href="/sign-up"
        >
          Click here
        </Link>
        , to register for an account. <br />
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

  if (!dbToken?.isValid) {
    return (
      <p>
        <h1>
          <Link
            style={{
              color: "blue",
              textDecoration: "underline",
            }}
            href="/verify-email-token"
          >
            Click here
          </Link>
          , to verify your account
        </h1>
      </p>
    );
  }
};

export default HomeComponent;
