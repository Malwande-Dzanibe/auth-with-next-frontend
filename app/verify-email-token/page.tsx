"use client";

import { useContext, useEffect } from "react";
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
    dbToken,
  } = useContext(context) as ContextType;

  useEffect(() => {
    setVerifyError("");
  }, []);

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

  return (
    <div>
      <div className="mess">
        <p>{verifyError ? verifyError : null}</p>
      </div>
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
        <section className="buttons-wrapper">
          <button disabled={loadingVerify}>
            {loadingVerify ? "Verifying ..." : "Verify"}
          </button>
        </section>
      </form>
    </div>
  );
};
export default VerifyEmail;
