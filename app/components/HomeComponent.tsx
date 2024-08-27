"use client";

import { useContext, useEffect, useState } from "react";
// import { redirect } from "next/navigation";
import context from "../context/userContextWrapper";
import Link from "next/link";

type TweetType = {
  content: string;
  id: string;
  user: {
    name: string;
    surname: string;
  };
};

const HomeComponent = () => {
  const { user, sendTweets, updatePost, postLoading, post } = useContext(
    context
  ) as ContextType;

  const [allTweets, setAllTweets] = useState<TweetType[]>([]);
  const [isClient, setIsClient] = useState(false);

  console.log("it rendered outside");
  console.log(allTweets);

  useEffect(() => {
    const getTweets = async () => {
      const response = await fetch(
        "https://custom-auth-backend.vercel.app/api/v1/user/tweets"
      );

      const data = await response.json();

      console.log("it rendered inside");

      setAllTweets(data);
    };

    getTweets();
  }, [post]);

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  if (!user) {
    return (
      isClient && (
        <h1
          style={{
            color: "gray",
            fontSize: "12px",
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
          , to register an account. <br />
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

  return (
    isClient && (
      <div>
        <h4 style={{ color: "red", fontSize: "12px" }}>
          Thank You For Verifying Your Account And Thank You For Visiting This
          Demo Project{" "}
        </h4>
        <form onSubmit={sendTweets}>
          <textarea
            placeholder="Leave a comment"
            name="content"
            required
            value={post.content}
            onChange={(e) => updatePost(e)}
          />
          <button type="submit">{postLoading ? "Posting..." : "Post"}</button>
        </form>
        <div className="tweets-wrapper">
          {allTweets.map((tweet) => {
            return (
              <div className="one-tweet" key={tweet.id}>
                <h6 style={{ color: " #00b294", fontSize: "12px" }}>
                  {tweet.user.name} {tweet.user.surname}
                </h6>
                <p>{tweet.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default HomeComponent;
