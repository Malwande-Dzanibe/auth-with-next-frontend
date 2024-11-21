"use client";

import { useContext, useEffect, useState } from "react";
// import { redirect } from "next/navigation";
import context from "../context/userContextWrapper";
import Link from "next/link";
import Tweets from "./Tweets";

const HomeComponent = () => {
  const {
    user,
    sendTweets,
    updatePost,
    postLoading,
    post,
    tweetError,
    dbToken,
    email2,
    handleSendConfirm,
    updateSendConfirm,
    sendConfirmError,
    sendConfirmLoader,
    editingLoader,
    isEditing,
    loader,
    allTweets,
  } = useContext(context) as ContextType;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  if (loader && !user) {
    return (
      isClient && (
        <div>
          <p>SAWUBONA</p>
        </div>
      )
    );
  }

  if (loader) {
    return (
      isClient && (
        <div>
          {tweetError && (
            <h4 style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
              {tweetError}
            </h4>
          )}
          <form onSubmit={sendTweets}>
            <textarea
              placeholder="Leave a comment"
              name="content"
              required
              value={post.content}
              onChange={(e) => updatePost(e)}
            />
            {isEditing ? (
              <button type="submit">
                {editingLoader ? "Editing..." : "Edit"}
              </button>
            ) : (
              <button type="submit">
                {postLoading ? "Posting..." : "Post"}
              </button>
            )}
          </form>
          <p>loading...</p>
        </div>
      )
    );
  }

  if (user && !dbToken) {
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
            href="/verify-email-token"
          >
            Click here
          </Link>
          , to verify your account.
        </h1>
      )
    );
  }

  if (email2) {
    return (
      isClient && (
        <div>
          <div className="mess">
            {sendConfirmError ? sendConfirmError : null}
          </div>
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
      )
    );
  }

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
        {tweetError && (
          <h4 style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
            {tweetError}
          </h4>
        )}
        <form onSubmit={sendTweets}>
          <textarea
            placeholder="Leave a comment"
            name="content"
            required
            value={post.content}
            onChange={(e) => updatePost(e)}
          />
          {isEditing ? (
            <button type="submit">
              {editingLoader ? "Editing..." : "Edit"}
            </button>
          ) : (
            <button type="submit">{postLoading ? "Posting..." : "Post"}</button>
          )}
        </form>
        <Tweets allTweets={allTweets} user={user} />
      </div>
    )
  );
};

export default HomeComponent;
