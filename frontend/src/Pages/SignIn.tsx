import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../Context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const location = useLocation()
  const queryClient = useQueryClient()
    const {showToast} = useAppContext()
    const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({
        message: "Sign In Successfully",
        type: "SUCCESS",
      })
      await queryClient.invalidateQueries("validateToken")
      navigate(location.state?.from?.pathname || "/")
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      })
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="container w-[90vw]">

    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        E-mail
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "email is required" })}
          />
        {errors.email && (
          <span className="text-red-600"> {errors.email.message} </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 charaters",
            },
          })}
          />
        {errors.password && (
          <span className="text-red-600"> {errors.password.message} </span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm ">
            No Registered ? <Link className="underline font-semibold" to={"/signup"}>Create An Acconut</Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 text-xl"
          >
          Login
        </button>
      </span>
    </form>
          </div>
  );
};

export default SignIn;
