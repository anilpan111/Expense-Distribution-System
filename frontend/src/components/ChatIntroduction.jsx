import React from 'react'
import {ReactTyped} from 'react-typed'

function ChatIntroduction() {
  return (
    <div className='text-white md:flex hidden content-center mx-auto my-auto'>
            <div className='h-screen w-full max-w-[800px] mt-[-96px] flex flex-col justify-center text-center mx-auto  '>
                <p className='text-colorLevel3 p-2 md:text-3xl sm:text-2xl'>GROWING WITH DATA ANALYTICS</p>
                <h1 className='font-bold md:text-7xl sm:text-6xl text-4xl  md:py-6'>Grow with data.</h1>
                <div className='flex items-center justify-center'>
                    <p className='md:text-4xl sm:text-3xl text-xl py-1 font-bold'>Fast,Flexible financing</p>
                    <ReactTyped
                        className='md:text-4xl sm:text-3xl text-xl py-1 pl-2 font-bold'
                        strings={[
                            "BTB", "BTC", "SCSS"
                        ]}
                        typeSpeed={120}
                        backSpeed={140}
                        loop
                    />
                </div>
                <div>
                    <p className='md:text-3xl sm:text-2xl text-[18px] py-1 font-bold text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, consequatur.</p>
                    <button className='rounded-md bg-[#00df9a] mx-auto my-6 px-6 py-2 text-black  font-bold cursor-pointer hover:bg-[#256d56]'>Get Started</button>
                </div>
            </div>
        </div>
  )
}

export default ChatIntroduction
