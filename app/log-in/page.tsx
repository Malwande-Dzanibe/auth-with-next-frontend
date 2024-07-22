"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";
import context from "../context/userContextWrapper";

const LoginComponent = () => {
  const usingContext = useContext(context) as ContextType;

  const { sumbitLogin, updateLogin, logInError, logInLoading, setLogInError } =
    usingContext;

  useEffect(() => {
    setLogInError("");
  }, []);

  return (
    <div>
      <div className="mess">
        <p>{logInError ? logInError : null}</p>
      </div>
      <form onSubmit={sumbitLogin}>
        <input
          type="email"
          placeholder="email"
          name="email"
          required
          onChange={(e) => updateLogin(e)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
          onChange={(e) => updateLogin(e)}
        />
        <Link className="blue" href={"/update-password"}>
          <p>Forgot password?</p>
        </Link>
        <section className="buttons-wrapper">
          <button>{logInLoading ? "Logging In ..." : "Log In"}</button>
          <p>or</p>
          <Link className="blue" href={"/sign-up"}>
            Create Account
          </Link>
        </section>
      </form>
    </div>
  );
};
export default LoginComponent;
