import React from "react";

import Contacts from "../components/Contacts";
import Conversations from "../components/Conversations";
import ChatIntroduction from "../components/ChatIntroduction";
import {useSelector} from 'react-redux'
import ChatsNavbar from "../components/ChatsNavbar";


function ChatsPage() {
  const chatStatus = useSelector( (state)=>state.event.status);

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
