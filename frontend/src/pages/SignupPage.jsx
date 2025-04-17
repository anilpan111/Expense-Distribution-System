import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import userAPI from "../APIcalls/UserAPIs";
import {CircularProgress} from "@nextui-org/react";
import { login } from "../store/Slices/authSlice";
import { useDispatch } from "react-redux";

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerUser = async (userData) => {
    console.log("User data",userData);
    try {
      setError(false);
      setLoading(true);
      const responseData = await userAPI.signUp(userData);
      if (responseData) {
        const currentUser = await userAPI.getCurrentUser();
        console.log("Registered User:", currentUser);
        dispatch(login(currentUser.data))
        navigate("/chats");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.response.data.message);
      console.error("ERR:", error);
    }
  };

  return (
    <>
      <div className="w-full  bg-colorLevel1 h-screen pt-32 ">
        <div className="text-colorLevel3 bg-colorLevel2 bg-opacity-80 md:w-[30%] rounded-xl md:max-w-[45%] h-auto md:h-auto  md:mx-auto mx-8 mb-10 py-4 px-8 shadow-2xl z-10 relative ">
          {/* {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-xl z-0">
              <h1 className="text-5xl font-bold text-colorLevel3">
                Signing up...
              </h1>
            </div>
          )} */}

          <div className="w-full h-14 justify-center flex">
            <h1 className="text-3xl font-bold font-myFont pt-6">
              Start with FairShare
            </h1>
          </div>

          <form
            action=""
            onSubmit={handleSubmit(registerUser)}
            className="font-myFont w-full mt-8"
          >
            <div className="w-full">
              <input
                type="text"
                className="w-full border-b-2 bg-inherit pl-2 text-white font-light focus:outline-none focus:ring-0"
                id="name"
                placeholder="Full Name"
                {...register("fullName", {
                  required: true,
                })}
              />
            </div>
            <div className="w-full mt-8">
              <input
                type="text"
                placeholder="Mobile Number"
                className="w-full border-b-2 bg-inherit pl-2 text-white font-light focus:outline-none focus:ring-0"
                id="mobileNo"
                {...register("mobileNo", {
                  required: true,
                })}
              />
            </div>
            <div className="w-full mt-8">
              <input
                type="text"
                className="w-full border-b-2 bg-inherit pl-2 text-white font-light focus:outline-none focus:ring-0"
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
            </div>
            <div className="w-full mt-8">
              <input
                type="password"
                className="w-full border-b-2 bg-inherit pl-2 text-white font-light focus:outline-none focus:ring-0"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
              />
            </div>
            <div className="w-full mt-8">
              <input
                type="password"
                className="w-full border-b-2 bg-inherit pl-2 text-white font-light focus:outline-none focus:ring-0"
                id="reEnteredPassword"
                placeholder="Re enter Password"
                {...register("reEnteredPassword", {
                  required: true,
                })}
              />
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full mt-8">
                <h2>Profile Picture</h2>
                <input
                  type="file"
                  id="avatar"
                  name="photo"
                  accept="image/*"
                  required
                  placeholder="Upload profile picture"
                  className="block w-full text-sm text-colorLevel3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  {...register("avatar", {
                    required: true,
                  })}
                />
              </div>
              <div className="w-full mt-8">
              <h2>Cover Picture</h2>
                <input
                  type="file"
                  id="coverImage"
                  name="photo"
                  accept="image/*"
                  placeholder="Upload cover image"
                  className="block w-full text-sm text-colorLevel3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  {...register("coverImage", {
                    required: true,
                  })}
                />
              </div>
            </div>
            {error && (
              <h1 className="text-center pt-3 text-red-500">{errorMessage}</h1>
            )}
            <div className="w-full flex justify-center mt-6">
              <button
                className="rounded-lg px-14 py-3 bg-colorLevel1 text-white"
                type="submit"
              >
                {
                  loading ? (<CircularProgress color="primary" aria-label="Loading..."/>) : "Signup"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
