"use client";

import { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const getTweets = async () => {
      const response = await fetch(
        "https://custom-auth-backend.vercel.app/api/v1/user/tweets"
      );

      const data = await response.json();

      setAllTweets(data);
    };

    const tweetss = setInterval(() => {
      getTweets();
    }, 1000);

    return () => clearInterval(tweetss);
  }, []);

  if (!user) {
    return (
      <h1
        style={{
          color: "gray",
          padding: "20px",
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
        , to log in if you already have an acount
      </h1>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
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
  );
};
export default HomeComponent;
