import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineDescription } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector,useDispatch } from "react-redux";
import singleChatAPIs from "../APIcalls/singleChatAPIs";
import { chatHistory } from "../store/Slices/chatSlice";
import {
  DatePicker,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import conversationAPIs from "../APIcalls/conversations";
import groupChatAPIs from "../APIcalls/groupChatAPIs";
import { useNavigate } from "react-router-dom";

import {io} from "socket.io-client"


function Conversations() {

  const socketRef =useRef(null);
  const [simpleMessage, setSimpleMessage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [allChats, setAllChats] = useState(null);
  const dispatch = useDispatch()
  const items = [
    {
      key: "contact",
      label: "Contat info",
    },
    {
      key: "group",
      label: "Group info",
    },
    {
      key: "search",
      label: "Search",
    },
    {
      key: "profile",
      label: "Profile",
    },
  ];

  const jsDate = new Date(
    selectedDate?.year,
    selectedDate?.month - 1,
    selectedDate?.day
  );
  const chatData = useSelector((state) => state.event.userEvents);
  const loggedUser = useSelector((state) => state.auth.userData);


  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //Sending a simple message
  const sendSimpleMessage = async () => {
    const receiver = () => {
      if (chatData.dataType === "navbar") {
        return [chatData._id];
      } else {
        const idArray = chatData?.members?.filter(
          (memberId) => memberId !== loggedUser._id
        );
        return idArray;
      }
    };

    const receiverArray = receiver();

    const chatDetails = {
      message: simpleMessage,
      receiverArray,
      chatName:
        chatData.dataType === "navbar"
          ? chatData.fullName.trim()
          : chatData.chatName,
    };


    try {
      if (chatData.dataType === "navbar") {
        const response = await singleChatAPIs.sendSimpleChat(chatDetails);
          if (response) {
            console.log("Response for single chat:", response);

            setSimpleMessage("");

            
          }
      } else {
        if (chatData.members.length > 2) {
          const response = await groupChatAPIs.sendSimpleMessage(chatDetails);

          if (response) {
            console.log("Response from simple group chat:", response);
            setSimpleMessage("");

            //sending new messasge to the server
            socketRef.current.emit("new message",response.data);
            // console.log("message emmited")

          }
        } else {
          const response = await singleChatAPIs.sendSimpleChat(chatDetails);
          if (response) {
            setSimpleMessage("");
          }
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //sending expense message
  const sendExpenseMessage = async () => {
    const receiver = () => {
      if (chatData.dataType === "navbar") {
        return [chatData._id];
      } else {
        const idArray = chatData?.members?.filter(
          (memberId) => memberId !== loggedUser._id
        );
        return idArray;
      }
    };

    const receiverArray = receiver();

    const chatDetails = {
      amount,
      description,
      place,
      expenseDate: jsDate,
      chatName:
        chatData.dataType === "navbar"
          ? chatData.fullName.trim()
          : chatData.chatName,
      receiverArray,
    };

    try {
      if(chatData.dataType === 'navbar'){
        const response = await singleChatAPIs.sendExpenseChat(chatDetails);
  
          if (response) {
            console.log("Response from expense message:", response);
          }
  
          setAmount("");
          setDescription("");
          setPlace("");
          setSelectedDate(null);
      }else{
        if (chatData.members.length > 2) {
          const response = await groupChatAPIs.sendExpenseMessage(chatDetails);
          if (response) {
            console.log("Response from gc expense message:", response);

            //sending new message to server
            socketRef.current.emit("new message",response.data);
          }
          setAmount("");
          setDescription("");
          setPlace("");
          setSelectedDate(null);
        } else {
          const response = await singleChatAPIs.sendExpenseChat(chatDetails);
  
          if (response) {
            console.log("Response from expense message:", response);
          }
  
          setAmount("");
          setDescription("");
          setPlace("");
          setSelectedDate(null);
        }
      }
    } catch (error) {
      console.log("ERR:", error);
    }
  };

  //fetching all chat history

  useEffect(() => {
    // Check if chatData exists (is truthy)
    if (chatData) {
      const loadAllChats = async () => {
        const receiver = () => {
          if (chatData.dataType === "navbar") {
            return [chatData._id];
          } else {
            const idArray = chatData?.members?.filter(
              (memberId) => memberId !== loggedUser._id
            );
            return idArray;
          }
        };

        const members = receiver();

        const chatName =
          chatData.dataType === "navbar"
            ? chatData.fullName.trim()
            : chatData.chatName;

        try {
          const response = await conversationAPIs.getAllChats({
            members,
            chatName,
          });

          if (response) {
            // setAllChats(response.data);

            //integrating web socket io

            if(!socketRef.current){

              socketRef.current = io("http://localhost:8000",{
                withCredentials: true
              })
              
              socketRef.current.on("connect",()=>{
                console.log("user connected:",socketRef.current.id)
  
                //join group
                socketRef.current.emit("join group",chatData._id)
  
                //send previous chats to the server
                socketRef.current.emit("previous chats",response.data)
  
                socketRef.current.on("display chats",(chats)=>{
                  setAllChats(chats);
  
                })
              })

            }

            
        
            
          }
        } catch (error) {
          console.log("ERR:", error);
        }
      };

      // Execute the function when chatData is true
      loadAllChats();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null; // Reset the ref to null
      }
    };

    
  }, [chatData, loggedUser._id]);

  // console.log("all chats",allChats)

  // useEffect( ()=>{
    
  // },[])


  return (
    <div className="h-full md:flex md:w-[65%] hidden w-full bg-colorLevel3  flex-col overflow-y-hidden">
      {/* remove padding */}
      <div className="flex w-full h-[10%] bg-colorLevel2 justify-between items-center px-6 gap-6 md:gap-0">
        <div className="flex">
          <Avatar
            isBordered
            src={chatData?.avatar || chatData?.chatIcon}
            className="w-12 h-12"
          />
          <h1 className="flex items-center pl-3 font-myFont font-bold text-xl truncate">
            {chatData?.fullName || chatData?.chatName}
          </h1>
        </div>
        <div className="flex content-center">
          <Button
            variant="bordered"
            className="bg-colorLevel5 mr-4 font-myFont font-bold  py-4 h-8 text-md rounded-md border-2 my-auto px-1"
            onClick={()=>{
              dispatch(chatHistory({chatData,allChats}))
              navigate('/expenseDistribution')
            }}
          >
            View distribution
          </Button>
          <Dropdown className="bg-colorLevel1">
            <DropdownTrigger className="bg-colorLevel1">
              <Button  className="bg-colorLevel2 my-auto">
                <BsThreeDotsVertical size={30} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dynamic Actions"
              items={items}
              className="bg-colorLevel1 w-full flex items-center content-center "
            >
              {(item) => (
                <DropdownItem
                  key={item.key}
                  color={item.key === "delete" ? "danger" : "default"}
                  className={`${
                    item.key === "delete" ? "text-danger" : ""
                  } flex text-center hover:bg-colorLevel2 rounded-md text-colorLevel3`}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="bg-colorLevel4 w-full h-[80%] overflow-y-auto">
        <ul className="flex flex-col px-8 py-4 ">
          {allChats &&
            allChats?.map((chat) => {
              return chat.messageType === "simpleMessage" ? (
                
                <li                  
                  className={`flex  pb-4 ${
                    chat?.sender._id === loggedUser._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                  key={chat._id}
                >
                  {chat?.sender._id !== loggedUser._id && <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />}
                  <div
                    className={`flex flex-col border-1 px-1.5 pt-0.5 rounded-xl  font-myFont  text-medium bg-colorLevel1 ${
                      chat?.sender === loggedUser._id
                        ? "rounded-tr-none"
                        : "rounded-tl-none"
                    }`}
                  >
                    <p>{chat.message}</p>
                    <p className=" justify-end flex pr-2 text-[12px] text-colorLevel3">
                      {new Date(chat.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </li>
              ) : (
                <li className={`flex  pb-4 ${
                  chat?.sender._id === loggedUser._id ? "justify-end" : "justify-start"
                }`}
                key={chat._id}
                >
                  <div className={`flex flex-col border-2  pt-0.5 rounded-xl  font-myFont  bg-colorLevel2 
                    ${
                      chat.sender._id === loggedUser._id ? "rounded-tr-none" : "rounded-tl-none"
                    }`}>
                    <div className={`flex bg-colorLevel1  h-[40%] py-2 gap-3 font-bold px-2 border-b-2
                      ${
                        chat.sender._id === loggedUser._id ? "rounded-tl-xl" : "rounded-tr-xl"
                      }
                      `}>
                      <FaIndianRupeeSign size={30} />
                      <p className="text-2xl">{chat.amount}</p>
                    </div>
                    <div className="flex gap-4 h-[30%] px-2">
                      <div className="flex items-center py-2">
                        <FaLocationDot size={20} />
                        <p className="text-lg">{chat.place}</p>
                      </div>
                      <p className="text-lg">
                        {new Date(chat.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="h-[30%] px-4 truncate">{chat.description}</p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="bg-colorLevel2 w-full h-[10%] flex items-center md:px-4 px-2 gap-4 md:gap-0 mb-16">
        <div className="flex gap-2 border-2 items-center rounded-md border-white  bg-colorLevel2 w-[65%]">
          <input
            type="text"
            placeholder="Send simple chat"
            className="w-full  bg-colorLevel2 pl-2 text-white font-myFont text-lg font-light rounded-md h-10 focus:outline-none"
            value={simpleMessage}
            onChange={(e) => setSimpleMessage(e.target.value)}
          />
          <IoSend
            size={35}
            className="cursor-pointer flex mr-2 items-center text-colorLevel5"
            onClick={sendSimpleMessage}
          />
        </div>
        <div className="w-[35%] flex items-center ">
          <Button
            onPress={onOpen}
            className="bg-colorLevel5 border-2 mx-auto w-52 h-10 rounded-xl "
          >
            Send expense
          </Button>
        </div>
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent className=" bg-colorLevel1 md:left-60 text-colorLevel3">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 font-myFont font-bold text-xl">
                  Expense Description
                </ModalHeader>
                <ModalBody>
                  <div className="flex">
                    <FaIndianRupeeSign size={30} />
                    <input
                      type="number"
                      placeholder="Amount"
                      className="w-full  bg-colorLevel1 pl-2 text-white font-myFont text-3xl font-semibold   focus:outline-none border-b-2"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="flex mt-4">
                    <FaMapLocationDot size={30} />
                    <input
                      type="text"
                      placeholder="Place"
                      className="w-full  bg-colorLevel1 pl-2 text-white font-myFont text-lg font-light   focus:outline-none border-b-2"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                    />
                  </div>

                  <div className="flex mt-4">
                    <MdOutlineDescription size={30} />
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full  bg-colorLevel1 pl-2 text-white font-myFont text-lg font-light   focus:outline-none border-b-2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="w-full h-auto flex ">
                    <DatePicker
                      label="Date of expense"
                      className="max-w-[284px] text-foreground-50 flex  mx-auto rounded-xl dark bg-background"
                      onChange={handleDateChange}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    className="rounded-md border-2 border-red-500 text-rose-500"
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={onClose}
                    className="bg-colorLevel5 rounded-md border-2 text-black"
                    onClick={sendExpenseMessage}
                  >
                    Send
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default Conversations;
