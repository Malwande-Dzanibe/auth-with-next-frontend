"use client";

import { useContext } from "react";
import context from "../context/userContextWrapper";

const UpdatePassword = () => {
  const usingContext = useContext(context) as ContextType;

  const { handleSendEmail, updateSendEmail, sendEmailError, sendEmailLoader } =
    usingContext;

  return (
    <div>
      <div className="mess">
        {" "}
        <p>{sendEmailError ? sendEmailError : null}</p>
      </div>
      <form onSubmit={handleSendEmail}>
        <input
          type="email"
          placeholder="email"
          name="email"
          required
          onChange={(event) => updateSendEmail(event)}
        />

        <button>{sendEmailLoader ? "Sending..." : "Send"}</button>
      </form>
    </div>
  );
};
export default UpdatePassword;
