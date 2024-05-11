import { useContext, useState, BaseSyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthContext";
import AuthForm from "../components/AuthForm";
import { API_URL } from "../constants";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleLogin = async (
    formData: FormData,
    event: BaseSyntheticEvent | undefined
  ) => {
    event?.preventDefault();

    setErrorMessage(null);

    try {
      const response = await fetch(`${API_URL}/users/${formData.email}`);

      if (response.status === 200) {
        const data = await response.json();

        if (data.length !== 0) {
          const user = data[0];

          if (user.password === formData.password) {
            const { password, ...rest } = user;
            logIn(rest);
            navigate("/");
            return;
          }
        }

        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  const formFooter = (
    <>
      Don’t have an account?
      <Link
        to="/signup"
        className="ml-1 text-blue-500 hover:text-blue-700 font-bold"
      >
        Sign up
      </Link>
    </>
  );

  return (
    <AuthForm
      onSubmit={handleSubmit(handleLogin)}
      headerTitle="Log In"
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
        {...register("password", { required: "Password is required" })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-300"
      />
      {errors.password && (
        <p className="text-red-500 mt-2">{errors.password.message}</p>
      )}

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Log in
      </button>
    </AuthForm>
  );
};

export default LoginPage;
