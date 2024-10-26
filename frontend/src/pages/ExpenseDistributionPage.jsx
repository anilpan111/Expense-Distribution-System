import React, { useEffect, useState } from "react";
import { Avatar, DateRangePicker, Button, Progress } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useSelector } from "react-redux";
import conversationAPIs from "../APIcalls/conversations";

function ExpenseDistributionPage() {
  const chatDetails = useSelector((state) => state.chats.chatData);
  const chatHistory = useSelector((state) => state.chats.allChats);
  const [groupMembers, setGroupMembers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [memberPayments, setMemberPayments] = useState([]);
  const [expenseTips, setExpenseTips] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const allMembers = await conversationAPIs.getAllMembers(
          chatDetails.members
        );

        if (allMembers) {
          setGroupMembers(allMembers.data);
        }
      } catch (error) {
        console.log("ERR:", error);
      }
    })();
  }, []);

  useEffect(() => {
    let total = 0;
    const payments = {};

    groupMembers.forEach((member) => {
      payments[member._id] = {
        name: member.fullName,
        paid: 0,
        _id: member._id,
      };
    });

    const expenseMessages = chatHistory.filter(
      (message) => message.messageType === "expenseMessage"
    );

    expenseMessages.forEach((message) => {
      total += message.amount;
      if (payments[message.sender._id]) {
        payments[message.sender._id].paid += message.amount;
      } else {
        payments[message.sender._id] = {
          name: message.sender.name,
          paid: message.amount,
        };
      }
    });

    setTotalAmount(total);
    setMemberPayments(Object.values(payments));
  }, [groupMembers]);

  // Calculate expense-sharing tips
  useEffect(() => {
    const averageAmount = totalAmount / groupMembers.length;
    const balances = memberPayments.map((member) => ({
      ...member,
      balance: member.paid - averageAmount,
    }));

    const tips = [];
    const receivers = balances.filter((m) => m.balance > 0);
    const payers = balances.filter((m) => m.balance < 0);

    payers.forEach((payer) => {
      while (payer.balance < 0 && receivers.length > 0) {
        const receiver = receivers[0];
        const amountToSettle = Math.min(
          receiver.balance,
          Math.abs(payer.balance)
        );

        tips.push(
          `${payer.name} will pay ${
            receiver.name
          } Rs ${amountToSettle.toFixed(2)}`
        );

        payer.balance += amountToSettle;
        receiver.balance -= amountToSettle;

        if (receiver.balance <= 0) receivers.shift();
      }
    });

    setExpenseTips(tips);
  }, [memberPayments, totalAmount, groupMembers]);

  return (
    <div className="bg-colorLevel1 h-screen w-full flex flex-col md:flex-row">
      <div className="w-full md:w-[35%] h-full flex flex-col overflow-y-hidden ">
        <div className="flex flex-col mx-auto mt-6 md:px-8 px-4">
          <Avatar
            src={chatDetails.chatIcon}
            className="md:w-44 md:h-44 w-36 h-36 text-large flex "
          />
          <h1 className="mx-auto font-myFont text-2xl mt-2 font-bold">
            {chatDetails.chatName}
          </h1>
        </div>

        <div className="mt-4 border-b-2 pb-4">
          <h1 className="font-myFont font-bold text-lg pl-4 border-b-1">
            Members
          </h1>

          <ul className="mx-8">
            {groupMembers?.map((member) => (
              <li
                className="flex mt-3 cursor-pointer  hover:bg-colorLevel2 rounded-md w-full "
                key={member._id}
              >
                <img
                  src={member.avatar}
                  alt="Profile pic"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex justify-between px-4 mx-1  w-full border-b-2 border-colorLevel2">
                  <div className="">
                    <h1 className="font-myFont font-bold text-md">
                      {member.fullName}
                    </h1>
                    <p className="font-myFont font-thin">{member.mobileNo}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex mx-auto mt-4 pb-4 items-center gap-6">
          <DateRangePicker
            label="Stay duration"
            isRequired
            defaultValue={{
              start: parseDate("2024-04-01"),
              end: parseDate("2024-04-08"),
            }}
            className="max-w-xs"
          />
          <Button className="bg-colorLevel5 font-myFont font-bold px-8">
            Generate
          </Button>
        </div>
      </div>

      <div className="w-full md:w-[65%] h-full bg-colorLevel2 pb-8 overflow-y-auto">
        <h1 className="font-myFont text-3xl font-bold text-center mt-4 border-b-1">
          Distribution of Expense
        </h1>
        <div className="md:mx-8 mx-4 mt-4 md:mt-6">
          <h2 className="text-xl font-bold">
            Total amount spent = Rs {totalAmount}
          </h2>

          <ul className="mt-8">
            {groupMembers.map((member) => {
              const payment = memberPayments.find(
                (payment) => member._id === payment._id
              );

              if (!payment) return null;

              return (
                <li
                  className="bg-colorLevel4 rounded-xl md:px-8 px-4 py-3 mb-6"
                  key={member._id}
                >
                  <div className="flex items-center gap-4">
                    <Avatar isBordered radius="lg" src={member.avatar} />
                    <h3 className="text-lg font-bold">{member.fullName}</h3>
                  </div>
                  <Progress
                    label="Total paid"
                    size="sm"
                    value={payment.paid}
                    maxValue={totalAmount}
                    color="success"
                    formatOptions={{ style: "currency", currency: "INR" }}
                    showValueLabel={true}
                    className="max-w-md md:max-w-full mt-3 md:mt-2"
                  />
                </li>
              );
            })}
          </ul>

          <h1 className="text-2xl font-bold px-8 border-b-1 mt-6 text-black">
            Expense Sharing Tips
          </h1>
          

          <div className="mt-4 w-full  bg-colorLevel1 border-2 rounded-2xl overflow-y-auto">
            <ul className="p-3 grid md:grid-cols-3 grid-cols-2 gap-3 my-4 mx-2">
              {expenseTips.length > 0 ? (
                expenseTips.map((tip, index) => (

                  <li className="md:w-52 md:h-52 h-40 w-40 bg-green-600 rounded-full border-3 border-colorLevel5 text-center content-center font-bold cursor-pointer hover:md:w-80 hover:md:h-80  hover:z-10 ease-in-out duration-500 hover:border-8"
                  key={index}
                  >
                    {tip}
                  </li>
                ))
              ) : (
                <p className="font-myFont text-lg">
                  All members have equal expenditures.
                </p>
              )}
            </ul>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default ExpenseDistributionPage;
