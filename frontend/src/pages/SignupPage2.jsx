import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import userAPI from "../APIcalls/UserAPIs";
import { CircularProgress } from "@nextui-org/react";
import { login } from "../store/Slices/authSlice";
import { useDispatch } from "react-redux";
import { RiImageAddFill } from "react-icons/ri";

function SignupPage2() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const coverImage = watch("coverImage");
  const profileImage = watch("avatar");

  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const handleCoverClick = () => {
    coverInputRef.current?.click();
  };

  const handleProfileClick = () => {
    profileInputRef.current?.click();
  };

  const registerUser = async (userData) => {
    try {
      setError(false);
      setLoading(true);
      const responseData = await userAPI.signUp(userData);
      if (responseData) {
        const currentUser = await userAPI.getCurrentUser();
        dispatch(login(currentUser.data));
        navigate("/chats");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-colorLevel1 relative overflow-auto">
        
        {/* Cover Image */}
        <div
          className="w-full bg-gray-400 relative cursor-pointer border-b-4"
          style={{ height: "55%" }}
          onClick={handleCoverClick}
        >
          {coverImage && coverImage.length > 0 && (
            <img
              src={URL.createObjectURL(coverImage[0])}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
          {!coverImage  && (
          <p className="text-4xl font-bold text-center pt-8">+Add Cover Image</p>
          )}
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            {...register("coverImage", { required: true })}
            className="hidden"
            ref={coverInputRef}
            onChange={(e) => setValue("coverImage", e.target.files)}
          />
        </div>

        {/* Profile Image */}
        <div className="absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-52 h-52 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center relative cursor-pointer border-4 border-black"
            onClick={handleProfileClick}
          >
            {profileImage && profileImage.length > 0 ? (
              <img
                src={URL.createObjectURL(profileImage[0])}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <button className="text-white font-bold">
                <RiImageAddFill size={30}  className="bg-black"/>
              </button>
            )}
          </div>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            {...register("avatar", { required: true })}
            className="hidden"
            ref={profileInputRef}
            onChange={(e) => setValue("avatar", e.target.files)}
          />
        </div>

        {/* Form Section */}
        <div className="text-colorLevel3  bg-opacity-80 md:w-[30%] rounded-xl md:max-w-[45%] mx-auto mt-32 mb-10 py-8 px-8 shadow-2xl relative z-10">
          {/* <div className="w-full flex justify-center">
            <h1 className="text-3xl font-bold font-myFont pt-2">
              Start with FairShare
            </h1>
          </div> */}

          <form
            onSubmit={handleSubmit(registerUser)}
            className="font-myFont w-full mt-8"
          >
            <div className="w-full">
              <input
                type="text"
                className="w-full border-b-2 bg-inherit pl-2 text-white font-light focus:outline-none focus:ring-0"
                id="name"
                placeholder="Full Name"
                {...register("fullName", { required: true })}
              />
            </div>

            <div className="w-full mt-8">
              <input
                type="text"
                placeholder="Mobile Number"
                className="w-full border-b-2 bg-inherit pl-2 text-white font-light focus:outline-none focus:ring-0"
                id="mobileNo"
                {...register("mobileNo", { required: true })}
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
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be valid",
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
                {...register("password", { required: true })}
              />
            </div>

            <div className="w-full mt-8">
              <input
                type="password"
                className="w-full border-b-2 bg-inherit pl-2 text-white font-light focus:outline-none focus:ring-0"
                id="reEnteredPassword"
                placeholder="Re-enter Password"
                {...register("reEnteredPassword", { required: true })}
              />
            </div>

            {error && (
              <h1 className="text-center pt-3 text-red-500">{errorMessage}</h1>
            )}

            <div className="w-full flex justify-center mt-6">
              <button
                className="rounded-lg px-14 py-3 bg-colorLevel2 text-white"
                type="submit"
              >
                {loading ? (
                  <CircularProgress color="primary" aria-label="Loading..." />
                ) : (
                  "Signup"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupPage2;
