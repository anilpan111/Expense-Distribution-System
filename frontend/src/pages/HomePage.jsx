import React from "react";
import { useNavigate } from "react-router-dom";
import NextuiNavbar from "../components/NextuiNavbar";
import {ReactTyped} from 'react-typed'




function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <NextuiNavbar  className='border-b-2 border-white'/>

      <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full md:px-10 bg-colorLevel1">
        <div className=" h-full w-full">
        <div className='text-colorLevel3'>
            <div className='md:h-screen w-full max-w-[800px] flex flex-col justify-center text-center mx-auto mt-32 md:mt-0 px-4 md:px-0'>
                <p className='text-colorLevel3 p-2 md:text-3xl sm:text-2xl'>Seamlessly distribute expenses and settle up.</p>
                <h1 className='font-bold md:text-7xl sm:text-6xl text-4xl  md:py-6'>SHARING MADE SIMPLE</h1>
                <div className='flex items-center justify-center'>
                    <p className='md:text-3xl sm:text-xl text-xl py-1 font-bold'>Flexible distribution among </p>
                    <ReactTyped
                        className='md:text-3xl sm:text-xl text-xl py-1 pl-2 font-bold text-colorLevel5'
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
                    <button className='rounded-md bg-colorLevel5 mx-auto my-6 px-6 py-2 text-colorLevel3  font-bold cursor-pointer hover:bg-colorLevel4'
                    onClick={()=>navigate("/signUp")}   
                    >Get Started</button>
                </div>
            </div>
        </div>
        </div>
        <div className="bg-colorLevel1 h-full w-full">
        <div className='text-colorLevel3'>
            <div className='md:h-screen w-full max-w-[800px]  flex flex-col justify-center text-center mx-auto'>
                <img src="./expenseLogo.png" alt="Display image"  className="mx-auto content-center flex"/>
            </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
