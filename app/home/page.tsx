"use client";

import { useContext, useEffect, useState } from "react";
import context from "../context/userContextWrapper";
import Link from "next/link";

const HomeComponent = () => {
  const { user, dbToken } = useContext(context) as ContextType;

  console.log("this is the dbtoken coming from the HomeComponent :-");
  console.log(dbToken);
  console.log("this is the user coming from the HomeComponent :-");
  console.log(user);

  if (!user || !dbToken) {
    return (
      <h1
        style={{
          color: "gray",
          padding: "20px",
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
        , to log in if you already have an acount
      </h1>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h4 style={{ color: "red", fontSize: "12px" }}>
        Thank You For Verifying Your Account And Thank You For Visiting This
        Demo Project{" "}
      </h4>
      <textarea placeholder="Leave a comment" />
    </div>
  );
};
export default HomeComponent;
