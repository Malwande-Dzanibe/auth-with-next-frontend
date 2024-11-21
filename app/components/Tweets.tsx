"use client";

import { useContext } from "react";
import context from "../context/userContextWrapper";

type TweetType = {
  content: string;
  id: string;
  user: {
    name: string;
    surname: string;
  };
};

type Props = {
  allTweets: TweetType[];
  user: UserType;
};

const Tweets = ({ allTweets, user }: Props) => {
  const usingContext = useContext(context) as ContextType;

  const { handleDeleteComment, handleEditComment, loader } = usingContext;

  if (loader) {
    return <p>loading...</p>;
  }

  return (
    // <h4>Amazing work</h4>
    <div className="tweets-wrapper">
      {allTweets.map((tweet) => {
        return (
          <div className="one-tweet" key={tweet.id}>
            <h6 style={{ color: " #00b294", fontSize: "12px" }}>
              {tweet.user.name} {tweet.user.surname}
            </h6>
            <p>{tweet.content}</p>
            {user.name == tweet.user.name &&
            user.surname == tweet.user.surname ? (
              <div className="buttons-wrapperr">
                <button
                  className="editt"
                  onClick={() => handleEditComment(tweet)}
                >
                  edit
                </button>
                <button
                  className="deletee"
                  onClick={() => handleDeleteComment(tweet)}
                >
                  delete
                </button>
              </div>
            ) : (
              <p style={{ marginBottom: "10px" }}>{null}</p>
            )}
            <hr />
          </div>
        );
      })}
    </div>
  );
};
export default Tweets;
