import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import userAPI from "../APIcalls/UserAPIs";
import { CircularProgress } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { login } from "../store/Slices/authSlice";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();


  const dispatch = useDispatch();

  const loginUser = async (userData) => {
    try {
      setSuccess(false);
      setError(false);
      setLoading(true);
      const loginData = await userAPI.login(userData);

      if (loginData) {
        const currentUser = await userAPI.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser.data))
          setUser(currentUser.data.fullName);
          setLoading(false);
          setSuccess(true);
        }
      }
    } catch (error) {
      console.error("ERR:",error)
      setLoading(false);
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="w-full bg-colorLevel1 h-screen pt-32 ">
        <div className="text-colorLevel3 bg-colorLevel2 bg-opacity-80 md:w-[30%] rounded-xl md:max-w-[45%] h-auto md:h-[70vh]  md:mx-auto mx-8 mb-10 py-4 px-8 shadow-2xl z-10 relative">


          {success && (
            <div className="fixed inset-0 bg-colorLevel1 bg-opacity-75 flex items-center justify-center z-10">
              <div className="bg-colorLevel1 p-8 rounded-xl shadow-2xl text-center">
                <h1 className="text-5xl font-bold text-colorLevel3">
                  Welcome again <span className="text-colorLevel3">{user}</span>{" "}
                  !
                </h1>

                <button
                  className="mt-8 px-8 py-3 bg-colorLevel5 text-white rounded-lg"
                  onClick={() => {
                    setSuccess(false);
                    navigate("/chats");
                  }}
                >
                  Start chatiing
                </button>
              </div>
            </div>
          )}

          <div className="w-full h-14 justify-center flex">
            <h1 className="text-3xl font-bold font-myFont pt-6">
              Welcome Back
            </h1>
          </div>

          <form
            action=""
            onSubmit={handleSubmit(loginUser)}
            className="font-myFont w-full mt-20 px-12"
          >
            <div className="w-full mt-8">
              <input
                type="text"
                className="w-full border-b-2 bg-inherit pl-1 text-white font-light focus:outline-none focus:ring-0"
                id="mobileNo"
                placeholder="Phone No"
                {...register("mobileNo", {
                  required: true,
                })}
              />
            </div>
            <div className="w-full mt-8">
              <input
                type="password"
                className="w-full border-b-2 bg-inherit pl-1 text-white font-light focus:outline-none focus:ring-0"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
              />
            </div>

            {error && (
              <h1 className="text-center pt-3 text-red-500">{errorMessage}</h1>
            )}



            <div className="w-full flex justify-center mt-16">
              <button
                type="submit"
                className="rounded-lg px-14 py-3 bg-colorLevel1 text-colorLevel3"
              >
                {
                  !loading ?"Login" :(<CircularProgress color="primary" aria-label="Loading..."/>)
                }
              </button>
            </div>
            <p className="mt-4 flex justify-center cursor-pointer hover:text-colorLevel1"
            onClick = {()=>navigate("/forgotPassword")}
            >Forgot password</p>

            <p className="text-white font-myFont text-md mt-8">
              Don't have an account!{" "}
              <span
                className="font-bold cursor-pointer text-colorLevel1"
                onClick={() => navigate("/signUp")}
              >
                Create one
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
