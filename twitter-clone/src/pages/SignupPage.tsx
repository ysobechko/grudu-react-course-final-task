import { useContext, useState, BaseSyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthContext";
import AuthForm from "../components/AuthForm";
import { API_URL } from "../constants";

interface FormData {
  email: string;
  password: string;
  username: string;
  fullName: string;
}

const SignupPage = () => {
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleSignup = async (
    { username, fullName, email, password }: FormData,
    event: BaseSyntheticEvent | undefined
  ) => {
    event?.preventDefault();

    setErrorMessage(null);

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: username, name: fullName, email, password }),
      });

      if (response.status === 201) {
        const data = await response.json();

        logIn(data);
        navigate("/");
      } else {
        throw new Error();
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  const formFooter = (
    <>
      Already have an account?
      <Link
        to="/login"
        className="ml-1 text-blue-500 hover:text-blue-700 font-bold"
      >
        Log In
      </Link>
    </>
  );

  return (
    <AuthForm
      onSubmit={handleSubmit(handleSignup)}
      headerTitle="Sign Up"
      footer={formFooter}
    >
      {/* Email field */}
      <label
        htmlFor="email"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Email
      </label>
      <input
        type="text"
        id="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address",
          },
        })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-300"
      />
      {errors.email && (
        <p className="text-red-500 mt-2">{errors.email.message}</p>
      )}
      {/* Password field */}
      <label
        htmlFor="password"
        className="block text-gray-700 text-sm font-bold mb-2 mt-4"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be at least 8 characters",
          },
          maxLength: {
            value: 256,
            message: "Password should not exceed 256 characters",
          },
        })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-300"
      />
      {errors.password && (
        <p className="text-red-500 mt-2">{errors.password.message}</p>
      )}
      {/* Username field */}
      <label
        htmlFor="username"
        className="block text-gray-700 text-sm font-bold mb-2 mt-4"
      >
        Username
      </label>
      <input
        type="text"
        id="username"
        {...register("username", {
          required: "User name is required",
          minLength: {
            value: 1,
            message: "Username should be at least 8 characters",
          },
          maxLength: {
            value: 256,
            message: "Usernae should not exceed 256 characters",
          },
        })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-300"
      />
      {errors.username && (
        <p className="text-red-500 mt-2">{errors.username.message}</p>
      )}
      {/* Full name field */}
      <label
        htmlFor="fullName"
        className="block text-gray-700 text-sm font-bold mb-2 mt-4"
      >
        Full Name
      </label>
      <input
        type="text"
        id="fullName"
        {...register("fullName", {
          required: "Full name is required",
          minLength: {
            value: 1,
            message: "Full name should be at least 8 characters",
          },
          maxLength: {
            value: 256,
            message: "Full name should not exceed 256 characters",
          },
        })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-300"
      />
      {errors.fullName && (
        <p className="text-red-500 mt-2">{errors.fullName.message}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Sign Up
      </button>
    </AuthForm>
  );
};

export default SignupPage;
