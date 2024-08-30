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
};

const Tweets = ({ allTweets }: Props) => {
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
          </div>
        );
      })}
    </div>
  );
};
export default Tweets;
