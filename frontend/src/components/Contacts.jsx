import React, { useEffect, useState } from "react";
import CreateGroup from "./CreateGroup";
import conversationAPIs from "../APIcalls/conversations";
import { MdGroups2 } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { loadChats } from "../store/Slices/eventSlice";

function Contacts() {
  const [conversationHistory, setConversationHistory] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const allContacts = await conversationAPIs.getAllConversations();

        if (allContacts) {
          setConversationHistory(allContacts.data);
          // console.log("Conversations:", allContacts.data);
        }
      } catch (error) {
        console.log("ERR:", error); 
      }
    })();
  }, []);

  // console.log("Existing users:", existingUsers);
  return (
    <div className="h-full overflow-y-auto w-full md:w-[35%] bg-colorLevel1 flex flex-col overflow-x-hidden">
      <div className="flex items-center   bg-colorLevel1 w-full justify-around  pl-4 pr-4  top-0 z-10 h-18 border-b-2">
        <h1 className="items-center flex font-myFont text-2xl font-bold py-5 text-colorLevel3">
          Chats
        </h1>
        <CreateGroup className="flex  items-center" />
      </div>

      <div className="w-full  text-colorLevel3 pb-40">
        <ul className="mx-3">
          {conversationHistory.map((conversation) => {
            const latestUpdate = new Date(conversation.updatedAt);

            const formatedDate = latestUpdate.toLocaleDateString("en-GB");

            const formattedTime = latestUpdate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return conversation.isGroup ? (
              <li
                className="flex mt-3 cursor-pointer  hover:bg-colorLevel2 rounded-md w-full "
                key={conversation._id}
                onClick={() =>
                  dispatch(loadChats({ ...conversation, dataType: "contact" }))
                }
              >
                <img
                  src={conversation?.chatIcon}
                  alt="Profile pic"
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex justify-between px-4 mx-1  w-full border-b-2 border-colorLevel2">
                  <div className="mt-1">
                    <h1 className="font-myFont font-bold text-xl">
                      {conversation.chatName}
                    </h1>
                    <p className="font-myFont truncate">{conversation?.description}</p>
                    <p className="font-myFont text-[12px]">
                      New <span className="pl-2">{formattedTime}</span>{" "}
                      <span className="pl-2">{formatedDate}</span>{" "}
                    </p>
                  </div>
                  {conversation.isGroup ? (
                    <MdGroups2 size={25} />
                  ) : (
                    <IoPerson size={25} />
                  )}
                </div>
              </li>
            ) : (
              <li
                className="flex mt-3 cursor-pointer  hover:bg-colorLevel2 rounded-md w-full "
                key={conversation._id}
                onClick={() =>
                  dispatch(loadChats({ ...conversation, dataType: "contact" }))
                }
              >
                <img
                  src={conversation?.chatIcon}
                  alt="Profile pic"
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex justify-between px-4 mx-1  w-full border-b-2 border-colorLevel2">
                  <div className="mt-1">
                    <h1 className="font-myFont font-bold text-xl">
                      {conversation.chatName}
                    </h1>
                    <p className="font-myFont text-sm">
                      New <span className="pl-2">{formattedTime}</span>{" "}
                      <span className="pl-2">{formatedDate}</span>{" "}
                    </p>
                  </div>
                  {conversation.isGroup ? (
                    <MdGroups2 size={25} />
                  ) : (
                    <IoPerson size={25} />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Contacts;
