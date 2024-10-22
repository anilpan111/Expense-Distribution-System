import React,{useEffect, useState} from "react";

import Contacts from "../components/Contacts";
import Conversations from "../components/Conversations";
import LandingPage from "./LandingPage";
import ChatIntroduction from "../components/ChatIntroduction";
import {useSelector} from 'react-redux'
import ChatsNavbar from "../components/ChatsNavbar";


function ChatsPage() {
  const chatStatus = useSelector( (state)=>state.event.status);

  

  

  // console.log("Chat status:",chatData)

  return (
    <div className="bg-colorLevel1 h-screen overflow-hidden w-full ">
      <ChatsNavbar/>
      <div className="flex h-full  overflow-hidden">
        <Contacts/>
        
        {
          chatStatus ? (<Conversations/>) : (<ChatIntroduction className=' flex '/>)
        }
      </div>
    </div>
  );
}

export default ChatsPage;
