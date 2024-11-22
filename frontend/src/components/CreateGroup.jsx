import React, { useState, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Badge,
  CircularProgress
} from "@nextui-org/react";
import { HiUserGroup } from "react-icons/hi";
import { FaFaceSadTear } from "react-icons/fa6";
import { UserAPIs } from "../APIcalls/UserAPIs";
import _ from "lodash";

import { useForm } from "react-hook-form";
import groupChatAPIs from "../APIcalls/groupChatAPIs";

function CreateGroup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);
  const [existingUsers, setExistingUsers] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [name, setName] = useState("");
  const { register, handleSubmit } = useForm();
  const [loading,setLoading]=useState(false);

  const userAPIInstance = new UserAPIs();

  const debounceSearch = useCallback(
    _.debounce(async (name) => {
      if (name) {
        try {
          const response = await userAPIInstance.suggestUser({ name });
          // console.log("Suggested users:", response.data);
          setExistingUsers(response.data);
          // return response.data;
        } catch (error) {
          console.error("Error while searching for contacts:", error);
        }
      }
    }, 500),
    []
  );

  const handleSuggestedUser = (user) => {
    setName("");
    setGroupMembers([...groupMembers, user]);
  };

  const handleImageChange = (e) => {
    console.log("Image changed");
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleOpen = (backdrop) => {
    onOpen();
  };

  const handleSearch = (e) => {
    const userInput = e.target.value;

    setName(userInput);
    debounceSearch(userInput);
  };

  const createGroup = async (chatData) => {
    try {
      setLoading(true);
      const groupMembersIds = groupMembers.map((member)=>member._id);
      const response =await groupChatAPIs.createGroup({...chatData,groupMembersIds})
      if(response){
        console.log("Created group:",response)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("ERR:",error)
    }
  };

  return (
    <>
      {loading && <CircularProgress label="Creating group..." size="lg"  className="absolute z-10 left-[50%] top-[50%] " />}
      <div className="flex flex-wrap gap-3">
        <Button
          key="opaque"
          variant="flat"
          // color='primary'
          onPress={() => handleOpen()}
          className="capitalize text-white bg-colorLevel5 font-myFont font-bold border-none"
        >
          Create group
        </Button>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
        className="dark text-foreground bg-background"
      >
        <form action="" onSubmit={handleSubmit(createGroup)}>
          <ModalContent className="px-2">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create groupchat
                </ModalHeader>
                <ModalBody>
                  <div className="w-full pb-4 flex justify-center">
                    <label className="relative">
                      {selectedImage ? (
                        <Avatar
                          src={selectedImage}
                          className="w-20 h-20 text-large"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-blue-500 flex items-center justify-center">
                          <span className="text-sm text-gray-500 text-center">
                            Add group icon
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        id="chatIcon"
                        name="photo"
                        accept="image/*"
                        required
                        // onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"

                        // {...register("chatIcon", { required: true })}

                        {...register("chatIcon", {
                          required: true,
                          onChange: (e) => { 
                            // Custom onChange logic
                            const file = e.target.files[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              setSelectedImage(imageUrl);  // Preview or other custom logic
                            }
                          }
                        })}
                      />
                    </label>
                  </div>

                  <div className="flex ">
                    <HiUserGroup size={30} />
                    <input
                      type="text"
                      placeholder="Group name"
                      className="w-full  bg-background pl-2 text-white font-myFont text-lg font-normal   focus:outline-none border-b-2 ml-8"
                      id="groupName"
                      {...register("groupName", { required: true })}

                    />
                  </div>

                  <div className="flex mt-4">
                    <HiUserGroup size={30} />
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full  bg-background pl-2 text-white font-myFont text-lg font-normal   focus:outline-none border-b-2 ml-8"
                      id="description"
                      {...register("description", { required: true })}

                    />
                  </div>

                  <div className="flex mt-4">
                    <HiUserGroup size={30} />
                    <input
                      type="text"
                      value={name}
                      placeholder="Search for contacts"
                      className="w-full  bg-background pl-2 text-white font-myFont text-lg font-normal   focus:outline-none border-b-2 ml-8"
                      onChange={handleSearch}
                    />
                  </div>

                  {name && (
                    <div className="w-60 h-64 ml-6 text-colorLevel3 pb-10 z-10 absolute top-4 bg-colorLevel1 overflow-y-auto rounded-md">
                      <ul className="mx-2">
                        {existingUsers.length === 0 ? (
                          <div className="flex flex-col items-center content-center my-auto w-full h-full pt-16">
                            <h1 className=" flex my-auto font-myFont text-2xl text-colorLevel4">
                              No users found
                            </h1>
                            <FaFaceSadTear
                              size={100}
                              className="text-colorLevel4 flex"
                            />
                          </div>
                        ) : (
                          existingUsers.map((user) => {
                            return (
                              <li
                                className="flex mt-3 cursor-pointer  hover:bg-colorLevel2 rounded-md w-full "
                                key={user?.mobileNo}
                                onClick={() => handleSuggestedUser(user)}
                              >
                                <Avatar
                                  src={user?.avatar}
                                  alt="Profile pic"
                                  size="md"
                                />
                                <div className="flex justify-between px-4 mx-1  w-full border-b-2 border-colorLevel2">
                                  <div className="mt-1">
                                    <h1 className="font-myFont font-normal text-md truncate">
                                      {user?.fullName}
                                    </h1>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3 items-center  w-full  px-4 mt-3 overflow-x-auto h-20 ">
                    <ul className="flex gap-3">
                      {groupMembers &&
                        groupMembers.map((member) => {
                          return (
                            <li key={member.mobileNo}>
                              <Badge
                                content="X"
                                color="default"
                                className="cursor-pointer"
                                onClick={() => {
                                  setGroupMembers(
                                    groupMembers.filter(
                                      (Clickedmember) =>
                                        Clickedmember.mobileNo !==
                                        member.mobileNo
                                    )
                                  );
                                }}
                              >
                                <Avatar radius="md" src={member.avatar} />
                              </Badge>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}
                  onClick={()=>{
                    setSelectedImage(null)
                  }}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" onPress={onClose} type="submit"> 
                    Create
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default CreateGroup;
