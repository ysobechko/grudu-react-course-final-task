import { useState, useEffect, useContext, useCallback } from "react";
import DOMPurify from "dompurify";
import Header from "../components/Header";
import TweetForm from "../components/TweetForm";
import { AuthContext } from "../components/AuthContext";
import { createTweet, fetchTweets } from "../api";

type FormData = {
  tweet: string;
};

type Tweet = {
  id: string;
  author_id: string;
  text: string;
};

const TweetsPage = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleErrors = () => {
    setErrorMessage("Something went wrong");
  };
  const fetchData = useCallback(async () => {
    try {
      const data = await fetchTweets();
      setTweets(data);
    } catch (error) {
      handleErrors();
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await createTweet({ author_id: user!.id, text: data.tweet });

      fetchData();
    } catch (error) {
      handleErrors();
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-screen-lg mt-6">
      <TweetForm onSubmit={onSubmit} />
        {errorMessage && <p className="text-red-500 mt-6">{errorMessage}</p>}
        {!errorMessage &&
          tweets.map((tweet) => (
            <div key={tweet.id} className="border rounded-md p-4 mb-4">
              <div className="font-bold mb-2">{tweet.author_id}</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(tweet.text),
                }}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default TweetsPage;
