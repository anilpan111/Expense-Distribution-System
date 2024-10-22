import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "../models/conversation.model.js";
import mongoose from "mongoose";

const getAllConversations = asyncHandler(async(req,res)=>{
    const currentUser = req.user;

    if(!currentUser){
        throw new ApiErrors(400,"Unauthorized request")
    }

    const conversations = await Conversation.find({
        members:currentUser._id
    })
    .select("-simpleMessages -expenseMessages")
    .sort({ updatedAt: -1 });
    
    if(!conversations){
        throw new ApiErrors(400,"No conversations yet")
    }

    return res.status(200).json(
        new ApiResponse(200,conversations,"Conversations fetched successfully")
    )



})


const getAllChats = asyncHandler(async (req, res) => {
    const { members, chatName } = req.body;

    // console.log("Members and chatname:",members,chatName)

    // Validate the presence of members and chatName
    if (!members || !chatName) {
        throw new ApiErrors(400, "User not fetched");
    }

    // Get the logged-in user
    const loggedMember = req.user;
    if (!loggedMember) {
        throw new ApiErrors(400, "Logged user not fetched");
    }

    // Create the array of member IDs
    const membersIds = members.map((id)=> new mongoose.Types.ObjectId(id))

    // Add the logged-in user to the membersIds
    membersIds.push(loggedMember._id);

    // console.log("MembersIds:",membersIds)

    // Find the conversation that matches the chatName and members
    let conversation = await Conversation.findOne({
        chatName,
        members: { $all: membersIds },
    })
        .populate("simpleMessages")
        .populate("expenseMessages");

    // If no conversation is found, return an error
    // console.log("All chats:",conversation)
    // if (!conversation) {
    //     throw new ApiErrors(400, "No chats found");
    // }

    

    if(conversation){
        // Combine simpleMessages and expenseMessages into a single array
    const combinedMessages = [
        ...conversation.simpleMessages.map((msg) => ({
            ...msg.toObject(),
            messageType: "simpleMessage",
        })),
        ...conversation.expenseMessages.map((msg) => ({
            ...msg.toObject(),
            messageType: "expenseMessage",
        }))
    ];

    // Sort combinedMessages by creation time
    const sortedMessages = combinedMessages.sort((a, b) => a.createdAt - b.createdAt);

    // Return the sorted messages
    return res.status(200).json(
        new ApiResponse(200, sortedMessages, "Fetched all chat messages successfully")
    );
    } else {
        return res.status(200).json(
            new ApiResponse(200, conversation, "Fetched all chat messages successfully")
        );
    }
});


export {
    getAllConversations,
    getAllChats
}


