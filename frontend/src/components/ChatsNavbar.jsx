import React, { useState, useCallback } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { SearchIcon } from "./SearchIcon.jsx";

import _ from "lodash";
import { UserAPIs } from "../APIcalls/UserAPIs";
import { FaFaceSadTear } from "react-icons/fa6";
import { useDispatch ,useSelector} from "react-redux";
import { loadChats } from "../store/Slices/eventSlice";
import CreateGroup from "./CreateGroup";

export default function ChatsNavbar() {
  const [name, setName] = useState("");
  const [existingUsers, setExistingUsers] = useState([]);
  const dispatch = useDispatch();

  const currentUser = useSelector((state)=>state.auth.userData);

  //implementing debouncing

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

  const handleSearch = (e) => {
    const userInput = e.target.value;
    // console.log("input value:",userInput)

    setName(userInput);
    debounceSearch(userInput);
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit">FairShare</p>
        </NavbarBrand>
        {/* <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent> */}
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          value={name}
          onChange={handleSearch}
        />

        {name && (
          <div className="md:w-[30%] w-[90%] mt-80 h-64 left-4 md:ml-6  text-colorLevel3 pb-10 z-10 absolute bg-colorLevel5 overflow-y-auto rounded-md">
            <ul className="mx-2">
              {existingUsers.length === 0 ? (
                <div className="flex flex-col items-center content-center my-auto w-full h-full pt-16">
                  <h1 className=" flex my-auto font-myFont text-2xl text-colorLevel4">
                    No users found
                  </h1>
                  <FaFaceSadTear size={100} className="text-colorLevel4 flex" />
                </div>
              ) : (
                existingUsers
                .filter( (user)=> user._id !== currentUser._id)
                .map((user) => {
                  return (
                    <li
                      className="flex mt-3 cursor-pointer  hover:bg-colorLevel2 rounded-md w-full "
                      key={user?.mobileNo}
                      onClick={() => {
                        //dispatching data of clicked user from suggested users
                        dispatch(loadChats({...user,dataType:'navbar'}));
                        setName("");
                      }}
                    >
                      <img
                        src={user?.avatar}
                        alt="Profile pic"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex justify-between px-4 mx-1  w-full border-b-2 border-colorLevel2">
                        <div className="mt-1">
                          <h1 className="font-myFont font-bold text-md">
                            {user?.fullName}
                          </h1>
                          <p className="font-myFont font-thin">{user?.email}</p>
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}

        <Dropdown placement="bottom-end" className="dark text-colorLevel3">
          <DropdownTrigger >
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={currentUser?.avatar}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" className="">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{currentUser?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
