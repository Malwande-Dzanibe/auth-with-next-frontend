"use client";

import { useContext } from "react";
import context from "../context/userContextWrapper";

const ConfirmPage = () => {
  const usingContext = useContext(context) as ContextType;

  const {
    handleSendConfirm,
    updateSendConfirm,
    sendConfirmError,
    sendConfirmLoader,
  } = usingContext;

  return (
    <div>
      <div className="mess">{sendConfirmError ? sendConfirmError : null}</div>
      <form onSubmit={handleSendConfirm}>
        <input
          type="password"
          placeholder="new password"
          name="password"
          required
          onChange={(event) => updateSendConfirm(event)}
        />

        <input
          type="password"
          placeholder="confirm password"
          name="confirmpassword"
          required
          onChange={(event) => updateSendConfirm(event)}
        />
        <button className="on-nav">
          {sendConfirmLoader ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};
export default ConfirmPage;
