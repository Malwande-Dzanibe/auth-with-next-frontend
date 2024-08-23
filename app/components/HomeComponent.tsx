"use client";

import { useContext, useEffect, useState } from "react";
// import { redirect } from "next/navigation";
import context from "../context/userContextWrapper";
import Link from "next/link";

const HomeComponent = () => {
  const { user, sendTweets, updatePost, postLoading, post } = useContext(
    context
  ) as ContextType;

  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
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
    );
  }

  return (
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
        {loading && <p>Loading...</p>}
        <p>this is where the tweets are going to be </p>
      </div>
    </div>
  );
};

export default HomeComponent;
