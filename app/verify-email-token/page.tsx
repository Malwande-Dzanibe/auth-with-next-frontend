"use client";

import { useContext, useEffect, useState } from "react";
import context from "../context/userContextWrapper";
import Link from "next/link";

const VerifyEmail = () => {
  const {
    loadingVerify,
    submitVerify,
    updateVerify,
    verifyError,
    user,
    setVerifyError,
    check,
    email2,
  } = useContext(context) as ContextType;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setVerifyError("");
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);

  if (!user) {
    return (
      isClient && (
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
      )
    );
  }

  if (email2) {
    return (
      isClient && (
        <div>
          <div className="mess">
            <p>{verifyError ? verifyError : null}</p>
          </div>
          <p style={{ color: "white", textAlign: "center" }}>{check}</p>
          <form onSubmit={submitVerify}>
            <input
              type="text"
              placeholder="email token"
              name="emailToken"
              required
              onChange={(event) => updateVerify(event)}
            />
            <Link className="blue" href={"/verify-email-token"}>
              <p>Resend Email Token?</p>
            </Link>
            <button disabled={loadingVerify}>
              {loadingVerify ? "Verifying ..." : "Verify"}
            </button>
          </form>
        </div>
      )
    );
  }

  return (
    isClient && (
      <div>
        <div className="mess">
          <p>{verifyError ? verifyError : null}</p>
        </div>
        <p style={{ color: "white", textAlign: "center" }}>{check}</p>
        <form onSubmit={submitVerify}>
          <input
            type="text"
            placeholder="email token"
            name="emailToken"
            required
            onChange={(event) => updateVerify(event)}
          />
          <Link className="blue" href={"/verify-email-token"}>
            <p>Resend Email Token?</p>
          </Link>
          <button disabled={loadingVerify}>
            {loadingVerify ? "Verifying ..." : "Verify"}
          </button>
        </form>
      </div>
    )
  );
};
export default VerifyEmail;
