import { useState, useEffect, useContext } from "react";
import DOMPurify from "dompurify";
import Header from "../components/Header";
import { API_URL } from "../constants";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthContext";

interface FormData {
  tweet: string;
}

interface Tweet {
  id: string;
  author_id: string;
  text: string;
}

const TweetsPage = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const tweetField = watch("tweet");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/tweets?_sort=date&_order=desc`);
      const data = await response.json();
      setTweets(data);
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${API_URL}/tweets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author_id: user!.id,
          text: data.tweet,
          date: new Date().toISOString(),
        }),
      });

      if (response.status === 201) {
        fetchData();
        reset();
      } else {
        setErrorMessage("Something went wrong");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-screen-lg mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <textarea
            {...register("tweet", { required: true })}
            maxLength={140}
            className="w-full p-2 mb-2 border rounded-md"
            placeholder="What’s happening?"
          />
          <div className="text-right">
            <button
              type="submit"
              className={`bg-blue-500 text-white p-2 rounded ${
                !tweetField ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!tweetField}
            >
              Tweet
            </button>
          </div>
        </form>
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
