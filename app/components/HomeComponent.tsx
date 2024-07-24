"use client";

import { useContext, useEffect } from "react";
// import { redirect } from "next/navigation";
import context from "../context/userContextWrapper";
import Link from "next/link";

const HomeComponent = () => {
  const { user, dbToken } = useContext(context) as ContextType;

  console.log(
    "this is the dbtoken coming from the HomeComponent in the compo :-"
  );
  console.log(dbToken);
  console.log(
    "this is the dbtoken coming from the HomeComponent int the compo:-"
  );
  console.log(user);

  if (!user || !dbToken) {
    return (
      <h1
        style={{
          color: "gray",
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

  return (
    <div>
      <h4 style={{ color: "red" }}>
        Thank You For Verifying Your Account And Thank You For Visiting This
        Demo Project{" "}
      </h4>
    </div>
  );
};

export default HomeComponent;
