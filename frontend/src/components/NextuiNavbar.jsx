import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useNavigate } from "react-router-dom";

import {io} from "socket.io-client"

function NextuiNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const socket = io("http://localhost:8000",{
      withCredentials: true
    })

    socket.on("connect",()=>{
      console.log("user connected:",socket.id)
    })
  },[])

  

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="text-white bg-colorLevel5">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand
         onClick={()=>navigate('/')}
         className="cursor-pointer"
         >
          <AcmeLogo />
          <p className="font-bold text-inherit">FairShare</p>
        </NavbarBrand>
      </NavbarContent>

      
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link  onClick={()=>navigate("/signUp")} className="cursor-pointer">Sign up</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary"  onClick={()=>navigate("/login")} variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
          <NavbarMenuItem >
            <Link
              color="foreground"
              className="w-full"
              // onClick={()=>navigate("/signUp")}
              onClick={()=>navigate("/expenseDistribution")}
              size="lg"
            >
              Sign up
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem >
            <Link
              color="foreground"
              className="w-full"
              href="https://anilpan.netlify.app"
              target="blank"
              size="lg"
            >
              About
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem >
            <Link
              color="foreground"
              className="w-full"
              
              size="lg"
            >
              Contact
            </Link>
          </NavbarMenuItem>

          
      </NavbarMenu>
    </Navbar>
  );
}

export default NextuiNavbar;
