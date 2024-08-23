type UserType = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmpassword: string;
};

type TokenType = {
  emailToken: string;
  isValid: false;
  type: string;
  expiration: Date;
  userId: string;
};

type ContextType = {
  user: UserType | null;
  sumbitLogin: FormEvent<HTMLFormElement>;
  submitRegister: FormEvent<HTMLFormElement>;
  updateRegister: (one: ChangeEvent<HTMLInputElement>) => void;
  updateLogin: (one: ChangeEvent<HTMLInputElement>) => void;
  logInError: string;
  registerError: string;
  logInLoading: boolean;
  registerLoading: boolean;
  setRegisterError: Dispatch<SetStateAction<string>>;
  setLogInError: Dispatch<SetStateAction<string>>;
  signout: () => void;
  loadingVerify: boolean;
  token: { emailToken: string };
  submitVerify: FormEvent<HTMLFormElement>;
  updateVerify: (one: ChangeEvent<HTMLInputElement>) => void;
  verifyError: string;
  setVerifyError: Dispatch<SetStateAction<string>>;
  sendTweets: FormEvent<HTMLFormElement>;
  updatePost: (one: ChangeEvent<HTMLInputElement>) => void;
  setPostLoading: Dispatch<SetStateAction<boolean>>;
  setTweetError: Dispatch<SetStateAction<string>>;
  postLoading: boolean;
  post: {
    content: string;
  };
};
