"use client";

import {
  ChangeEvent,
  FormEvent,
  createContext,
  useEffect,
  useState,
} from "react";
import { PostRequest } from "../utils/services";
import { useRouter } from "next/navigation";
import { SendTweet } from "../utils/sendTweet";

const context = createContext<ContextType | null>(null);

export const UserContextWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const apiUrl = "https://custom-auth-backend.vercel.app/";
  // "https://custom-auth-backend.vercel.app/" || "http://localhost:5000/";

  const getUserLS = () => {
    let result;
    if (typeof window !== "undefined") {
      result = localStorage.getItem("user2");
    } else if (result === undefined || result === null) {
      result = null;
    }

    return result ? JSON.parse(result) : null;
  };

  const getdbTokenLS = () => {
    let result;
    if (typeof window !== "undefined") {
      result = localStorage.getItem("dbToken");
    } else if (result === undefined || result === null) {
      result = "";
    }

    return result ? JSON.parse(result) : "";
  };

  const getEmail2 = () => {
    let result;
    if (typeof window !== "undefined") {
      result = localStorage.getItem("email2");
    } else if (result === undefined || result === null) {
      result = "";
    }

    return result ? JSON.parse(result) : "";
  };

  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(getUserLS());
  const [dbToken, setDbToken] = useState<string>(getdbTokenLS());
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [post, setPost] = useState({
    content: "",
  });
  const [logInInfo, setLogInInfo] = useState({
    email: "",
    password: "",
  });
  const [logInError, setLogInError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [logInLoading, setLogInLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [token, setToken] = useState({
    emailToken: "",
  });
  const [verifyError, setVerifyError] = useState("");
  const [tweetError, setTweetError] = useState("");
  const [check, setCheck] = useState("");
  const [sendEmail, setSendEmail] = useState({
    email: "",
  });
  const [sendEmailError, setSendEmailError] = useState("");
  const [sendEmailLoader, setSendEmailLoader] = useState(false);
  const [email2, setEmail2] = useState(getEmail2());
  const [sendConfirmInfor, setSendConfirmInfor] = useState({
    password: "",
    confirmpassword: "",
    email: "",
  });
  const [sendConfirmError, setSendConfirmError] = useState("");
  const [sendConfirmLoader, setSendConfirmLoader] = useState(false);

  // verifying a user from the frontend

  const submitVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoadingVerify(true);
    setVerifyError("");

    const response = await PostRequest(
      `${apiUrl}api/v1/authenticate`,
      JSON.stringify({ token, userEmail: user?.email || email2 })
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

  // creating a user

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

    setUser(response.user);

    router.replace("/verify-email-token");
  };

  // handle sending tweets

  const sendTweets = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPostLoading(true);
    setTweetError("");

    const response = await SendTweet(
      `${apiUrl}api/v1/tweet`,
      JSON.stringify(post),
      dbToken
    );

    setPost({
      content: "",
    });

    setPostLoading(false);

    if (response.error) {
      return setTweetError(response.message);
    }
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

  const updatePost = (event: ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => {
      return {
        ...prev,
        content: event.target.value,
      };
    });
  };

  const updateSendEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setSendEmail((prev) => {
      return {
        ...prev,
        email: event.target.value,
      };
    });
  };

  const handleSendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendEmailLoader(true);
    setSendEmailError("");

    const response = await PostRequest(
      `${apiUrl}api/v1/user/send-email`,
      JSON.stringify(sendEmail)
    );

    setSendEmailLoader(false);

    if (response.error) {
      return setSendEmailError(response.message);
    }

    setEmail2(response);

    router.replace("/verify-email-token");
  };

  const handleSendConfirm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSendConfirmError("");
    setSendConfirmLoader(true);

    const response = await fetch(`${apiUrl}api/v1/user/confirm`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendConfirmInfor, email2),
    });

    const data = await response.json();

    setSendConfirmLoader(false);

    if (!response.ok) {
      let message;
      if (data.message) {
        message = data.message;
      }

      setSendConfirmError(message);
      return;
    }

    setUser(data);
    removeEmail();
    router.replace("/home");
  };

  const updateSendConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    setSendConfirmInfor((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
        email: email2,
      };
    });
  };

  // signing out a user

  const signout = () => {
    setUser(null);
    setDbToken("");
    setEmail2("");
    localStorage.removeItem("email2");
    localStorage.removeItem("dbToken");
    localStorage.removeItem("user2");
  };

  useEffect(() => {
    localStorage.setItem("user2", JSON.stringify(user));
    localStorage.setItem("dbToken", JSON.stringify(dbToken));
    localStorage.setItem("email2", JSON.stringify(email2));
  }, [user, email2]);

  const removeEmail = () => {
    setEmail2("");
    localStorage.removeItem("email2");
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
        sendTweets,
        updatePost,
        setPostLoading,
        setTweetError,
        postLoading,
        post,
        tweetError,
        dbToken,
        check,
        handleSendEmail,
        updateSendEmail,
        sendEmailError,
        sendEmailLoader,
        handleSendConfirm,
        updateSendConfirm,
        sendConfirmError,
        sendConfirmLoader,
        email2,
      }}
    >
      {children}
    </context.Provider>
  );
};
export default context;
