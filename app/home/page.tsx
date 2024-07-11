"use client";

import { useContext, useEffect, useState } from "react";
import context from "../context/userContextWrapper";
import Link from "next/link";

const page = () => {
  const { user, dbToken } = useContext(context) as ContextType;
  const [users, setUsers] = useState<
    {
      name: string;
      surname: string;
      email: string;
    }[]
  >([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("http://localhost:5000/user");
      const data = await response.json();

      setUsers(data);
    };

    getUsers();
  }, [user]);

  if (!user) {
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

  return (
    <div style={{ color: "red" }}>
      {users.map((user) => {
        return (
          <article
            key={user.email}
            style={{
              background: "#00b294",
              color: "black",
              margin: "20px",
              padding: "20px",
            }}
          >
            <h4>{`Name : ${user.name}`}</h4>
            <h4>{`Surname : ${user.surname}`}</h4>
            <h4>{`Email : ${user.email}`}</h4>
          </article>
        );
      })}
    </div>
  );
};
export default page;
