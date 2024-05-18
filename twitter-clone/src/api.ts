import { API_URL } from "./constants";
import { TweetData, UserData } from "./types";

// This function fetches user data from the API by email
export const getUserByEmail = async (email: string) => {
  const response = await fetch(`${API_URL}/users/${email}`);

  if (response.status === 200) {
    const data = await response.json();

    if (data.length !== 0) {
      return data[0];
    }
  }

  handleError(response);
};

// This function creates a new user
export const createUser = async (userData: UserData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 201) {
    return await response.json();
  }

  handleError(response);
};

// This function creates a new tweet
export const createTweet = async (tweetData: TweetData) => {
  const response = await fetch(`${API_URL}/tweets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...tweetData,
      date: new Date().toISOString(),
    }),
  });

  if (response.status === 201) {
    return await response.json();
  }

  handleError(response);
};

// This function fetches tweets from the API
export const fetchTweets = async () => {
  const response = await fetch(`${API_URL}/tweets?_sort=date&_order=desc`);

  if (response.status === 200) {
    return await response.json();
  }

  handleError(response);
};

const handleError = (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
