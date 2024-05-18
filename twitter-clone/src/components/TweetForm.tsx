import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  tweet: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

const TweetForm: React.FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const tweetField = watch("tweet");

  const onSubmitForm = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="mb-6">
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
  );
};

export default TweetForm;
