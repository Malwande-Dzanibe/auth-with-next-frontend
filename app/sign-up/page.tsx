"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";
import context from "../context/userContextWrapper";

const SignUp = () => {
  const usingContext = useContext(context) as ContextType;

  const {
    submitRegister,
    updateRegister,
    registerError,
    registerLoading,
    setRegisterError,
  } = usingContext;

  useEffect(() => {
    setRegisterError("");
  }, []);

  return (
    <div>
      <div className="mess">
        <p>{registerError ? registerError : null}</p>
      </div>
      <form onSubmit={submitRegister}>
        <input
          type="text"
          placeholder="name"
          name="name"
          required
          onChange={(e) => updateRegister(e)}
        />
        <input
          type="text"
          placeholder="surname"
          name="surname"
          required
          onChange={(e) => updateRegister(e)}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          required
          onChange={(e) => updateRegister(e)}
        />
        <input
          type="password"
          placeholder="password"
          name="confirmpassword"
          required
          onChange={(e) => updateRegister(e)}
        />
        <input
          type="password"
          placeholder="confirm password"
          name="password"
          required
          onChange={(e) => updateRegister(e)}
        />
        <section className="buttons-wrapper">
          <button>
            {registerLoading ? "Creating Account ..." : "Create Account"}
          </button>
          <p>or</p>
          <Link className="blue" href={"/log-in"}>
            Log In
          </Link>
        </section>
      </form>
    </div>
  );
};
export default SignUp;
