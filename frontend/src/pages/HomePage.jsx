import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@nextui-org/react";
import LoginPopup from "../components/LoginPopup";
import NextuiNavbar from "../components/NextuiNavbar";
import {ReactTyped} from 'react-typed'




function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* <Navbar/> */}
      <NextuiNavbar />

      <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full md:px-10 bg-white">
        <div className=" h-full w-full">
        <div className='text-black'>
            <div className='md:h-screen w-full max-w-[800px] flex flex-col justify-center text-center mx-auto mt-32 md:mt-0 px-4 md:px-0'>
                <p className='text-[#00df9a] p-2 md:text-3xl sm:text-2xl'>Seamlessly distribute expenses and settle up.</p>
                <h1 className='font-bold md:text-7xl sm:text-6xl text-4xl  md:py-6'>SHARING MADE SIMPLE</h1>
                <div className='flex items-center justify-center'>
                    <p className='md:text-3xl sm:text-xl text-xl py-1 font-bold'>Flexible distribution among </p>
                    <ReactTyped
                        className='md:text-3xl sm:text-xl text-xl py-1 pl-2 font-bold'
                        strings={[
                            "Trips", "Roommates", "Grocery", "Dining Out"
                        ]}
                        typeSpeed={120}
                        backSpeed={140}
                        loop
                    />
                </div>
                <div>
                    <p className='md:text-3xl sm:text-2xl text-[18px] py-1 font-bold text-gray-500'>Effortlessly track group expenses and ensure everyone knows who owes what—no more confusion.</p>
                    <button className='rounded-md bg-[#00df9a] mx-auto my-6 px-6 py-2 text-black  font-bold cursor-pointer hover:bg-[#256d56]'
                    onClick={()=>navigate("/signUp")}   
                    >Get Started</button>
                </div>
            </div>
        </div>
        </div>
        <div className="bg-white h-full w-full">
        <div className='text-white'>
            <div className='md:h-screen w-full max-w-[800px]  flex flex-col justify-center text-center mx-auto'>
                <img src="./image12.jpg" alt="Display image"  className="mx-auto content-center flex"/>
            </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
