"use client";

import { ChangeEvent, FormEvent, createContext, useState } from "react";
import { PostRequest } from "../utils/services";
import { useRouter } from "next/navigation";

const context = createContext<ContextType | null>(null);

export const UserContextWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const apiUrl = "https://custom-auth-backend.vercel.app/";
  // "https://custom-auth-backend.vercel.app/" || "http://localhost:5000";

  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);
  const [dbToken, setDbToken] = useState<TokenType | null>(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [logInInfo, setLogInInfo] = useState({
    email: "",
    password: "",
  });
  const [logInError, setLogInError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [logInLoading, setLogInLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [token, setToken] = useState({
    emailToken: "",
  });
  const [verifyError, setVerifyError] = useState("");

  // verifying a user from the frontend

  const submitVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoadingVerify(true);
    setVerifyError("");

    const response = await PostRequest(
      `${apiUrl}api/v1/authenticate`,
      JSON.stringify({ token, userEmail: user?.email })
    );

    setLoadingVerify(false);

    if (response.error) {
      return setVerifyError(response.message);
    }

    setUser(response.apiToken.user);
    setDbToken(response.jwtoken);
    router.replace("/home");
  };

  // loging in a user from the frontend

  const sumbitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLogInLoading(true);
    setLogInError("");

    const response = await PostRequest(
      `${apiUrl}api/v1/user/login`,
      JSON.stringify(logInInfo)
    );

    setLogInLoading(false);

    if (response.error) {
      return setLogInError(response.message);
    }

    setUser(response.user);
    setDbToken(response.emailToken);
    router.replace("/verify-email-token");
  };

  // creating a user from the frontend

  const submitRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setRegisterLoading(true);
    setRegisterError("");

    const response = await PostRequest(
      `${apiUrl}api/v1/user/register`,
      JSON.stringify(registerInfo)
    );

    setRegisterLoading(false);

    if (response.error) {
      return setRegisterError(response.message);
    }

    console.log(
      "this is our response coming from https://custom-auth-backend.vercel.app/api/v1/user/register :-"
    );
    console.log(response);

    setUser(response.user);
    setDbToken(response.emailToken);
    router.replace("/verify-email-token");
  };

  // handling the verify inputs

  const updateVerify = (event: ChangeEvent<HTMLInputElement>) => {
    setToken((prev) => {
      return {
        ...prev,
        emailToken: event.target.value,
      };
    });
  };

  // handling the login inputs

  const updateLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setLogInInfo((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  // handling the inputs when creating a user

  const updateRegister = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  // signing out a user

  const signout = () => {
    setUser(null);
  };

  return (
    <context.Provider
      value={{
        user,
        sumbitLogin,
        submitRegister,
        updateLogin,
        updateRegister,
        logInError,
        registerError,
        logInLoading,
        registerLoading,
        setRegisterError,
        setLogInError,
        signout,
        loadingVerify,
        token,
        submitVerify,
        updateVerify,
        verifyError,
        setVerifyError,
        dbToken,
      }}
    >
      {children}
    </context.Provider>
  );
};
export default context;
