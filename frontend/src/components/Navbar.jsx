import React,{useState} from 'react'
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Navbar() {
    const navigate =useNavigate();
    const [nav,setNav] =useState(false);

    const userStatus = useSelector( (state) => state.auth.status)
    const userData = useSelector( (state) => state.auth.userData)


    const handleNav = ()=>{
        setNav(!nav)
    }

    const navItems =[
        {
            name: "Home",
            navigate: "/",
            status: true
        },
        {
            name:"Login",
            navigate: "/login",
            status:!userStatus,
        },
        {
            name:"Signup",
            navigate:"/signup",
            status:!userStatus,
        },
        {
            name:"About",
            navigate: "/about",
            status: true
        },
        {
            name:"Contact",
            navigate:"/contact",
            status: true
        }
    ]
  return (

    <div className='text-white w-full z-10 bg-colorLevel1 h-20 flex justify-between items-center  mx-auto fixed top-0 px-24'>
        <h1 className='w-auto  text-colorLevel4 text-3xl font-bold cursor-pointer'
        onClick={()=>navigate(navItems.navigate)}
        >FairShare</h1>


        {/* <div className='w-full mx-4 max-w-[40rem] h-10 border-2 rounded-r-xl flex'>
            <input type="text" placeholder='Search' className='items-center flex w-[90%] h-full px-4 bg-colorLevel1 border-none'/>
            <CiSearch size={30} className='flex mx-auto my-auto'/>
        </div> */}
        <ul className='hidden md:flex'>

            { navItems.map((item)=>
            item.status ? (
                <li className='p-4 cursor-pointer hover:text-colorLevel3' key={item.name}
                onClick={()=>navigate(item.navigate)}
                >{item.name}</li>
            ) :null

            )}


            <li className='p-4 cursor-pointer hover:text-colorLevel3'
            onClick={()=>navigate("/profile")}
            >
                <img src={userData ? userData?.avatar : '/defaultDP.jpg'} alt="Profile"  className="w-10 h-10  rounded-full border-2 border-white"/>
            </li>
        </ul>
        <div onClick={handleNav} className='block md:hidden cursor-pointer'>
            {!nav ? <AiOutlineMenu size={30}/> : < AiOutlineClose size={30}/>}
        </div>
        <div className={nav ? 'fixed top-0 left-0 w-[60%] h-full bg-colorLevel2 border-r border-r-white ease-in-out duration-500 z-10 ' : 'fixed left-[-100%] ease-in-out duration-500'}>
        <h1 className='w-full text-colorLevel3 text-3xl font-bold m-4  '>TrailTube</h1>
        <ul className='p-4 uppercase '>
            {navItems.map((item)=>(
                item.status ? (
                    <li className='p-4 border-b border-b-gray-600 cursor-pointer '
                    key={item.name}
                    onClick={()=>{
                        navigate(item.navigate)
                        handleNav()
                    }}
                    >{item.name} </li>
                ): null
            ))}

            <li className='p-4 border-b border-b-gray-600 flex '
            onClick={()=>{
                navigate("/profile")
                handleNav()

            }}
            >
                <p className='text-bold mr-4'>You</p>
                <img src={userData ? userData?.avatar : '/defaultDP.jpg'} alt="Profile"  className="w-10 h-10  rounded-full border-2 border-white"/>
            </li>
        </ul>
        </div>
    </div>
  )
}

export default Navbar
