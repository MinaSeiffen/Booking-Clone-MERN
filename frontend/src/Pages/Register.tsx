import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {showToast} = useAppContext()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const mutation = useMutation(apiClient.register , {
    onSuccess: async() => {
      showToast({message: "Registration Successful", type: "SUCCESS"})
      await queryClient.invalidateQueries("validateToken")
        navigate("/")
    },
    onError: (error:Error) => {
      showToast({message: error.message, type: "ERROR"})
    }
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  });

  return (
    <form className="flex flex-col gap-5 container" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-10">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && ( <span className="text-red-600"> {errors.firstName.message} </span> )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "Last Name is required" })}
          />
          {errors.lastName && ( <span className="text-red-600"> {errors.lastName.message} </span> )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        E-mail
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "email is required" })}
        />
        {errors.email && ( <span className="text-red-600"> {errors.email.message} </span> )}
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
        {errors.password && ( <span className="text-red-600"> {errors.password.message} </span> )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "this field is required";
              } else if (watch("password") !== val) {
                return "Password does not match";
              }
            },
          })}
        />
        {errors.confirmPassword && ( <span className="text-red-600"> {errors.confirmPassword.message} </span> )}
      </label>
      <span className="flex justify-between">
      <span className="text-sm ">
            Have an account ? <Link className="underline font-semibold" to={"/signin"}>Login here</Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
