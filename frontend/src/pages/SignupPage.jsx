import React from "react";
import { useState } from "react";
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import userAPI from "../APIcalls/UserAPIs";

function SignupPage() {
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const registerUser = async (userData)=>{
    // console.log("User data",userData)
    try {
      setError(false);
      setLoading(true);
      const responseData = await userAPI.signUp(userData);
      if(responseData){
        const currentUser = await userAPI.getCurrentUser();
        console.log("Registered User:",currentUser);
        navigate("/")
      }
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.response.data.message)
      console.error("ERR:",error)
    }
  };

  return (
    <>
      <div className="w-full ">
        <img src="https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Background" className="object-cover fixed top-0 z-0 h-full w-full" />
        <div className="text-colorLevel3 bg-colorLevel2 bg-opacity-80 md:w-[30%] rounded-xl md:max-w-[45%] h-auto md:h-auto mt-32 md:mx-auto mx-8 mb-10 py-4 px-8 shadow-2xl z-10 relative ">
        {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-xl z-0">
          <h1 className="text-5xl font-bold text-colorLevel3">Signing up...</h1>
        </div>
        )}

        

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
            className="w-full border-b-2 bg-inherit pl-2 text-white font-light"
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
            className="w-full border-b-2 bg-inherit pl-2 text-white font-light"
            id="mobileNo"
            {...register("mobileNo", {
              required: true,
            })}
          />
        </div>
        <div className="w-full mt-8">
          
          <input
            type="text"
            className="w-full border-b-2 bg-inherit pl-2 text-white font-light"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
        </div>
        <div className="w-full mt-8">
         
          <input
            type="password"
            className="w-full border-b-2 bg-inherit pl-2 text-white font-light"
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
            className="w-full border-b-2 bg-inherit pl-2 text-white font-light"
            id="reEnteredPassword"
            placeholder="Re enter Password"
            {...register("reEnteredPassword", {
              required: true,
            })}
          />
        </div>
        <div className="w-full mt-8">
          
          <input
            type="file"
            id="avatar"
            name="photo"
            accept="image/*"
            required
            placeholder="Upload profile picture"
            className="w-full  bg-inherit pl-2 text-white font-light"
            {...register("avatar", {
              required: true,
            })}
          />
        </div>
        <div className="w-full mt-8">
          
          <input
            type="file"
            id="coverImage"
            name="photo"
            accept="image/*"
            placeholder="Upload cover image"
            className="w-full  bg-inherit pl-2 text-white font-light"
            {...register("coverImage", {
              required: true,
            })}
          />
        </div>
        {error && (
          <h1 className="text-center pt-3 text-red-500">{errorMessage}</h1>
        )}
        <div className="w-full flex justify-center mt-6">
          <button
            className="rounded-lg px-14 py-3 bg-colorLevel1 text-white"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      </div>
      </div>
    </>
  )
}

export default SignupPage
