import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { SimpleMessage } from "../models/simpleMessage.model.js";
import { ExpenseMessage } from "../models/expenseMessage.model.js";
import { Conversation } from "../models/conversation.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
const createGroup = asyncHandler(async(req,res)=>{
    const {groupName,description,members} = req.body

    const currentUser = req.user

    // console.log(groupName,description,members)
    // console.log("members:",members[0])

    if(
        [groupName,description].some((field)=>field.trim()==="")
    ){
        throw new ApiErrors(400,"Provided data are insufficient")
    }

    if(members.length<=0){
        throw new ApiErrors(400,"Group members not fetched")
    }

    const membersIds = members.map((member)=> new mongoose.Types.ObjectId(member))
    membersIds.push(currentUser._id);

    // console.log('chat icon local path:',membersIds)

    const chatIconLocalPath = req.files?.chatIcon?.[0]?.path;


    if(!chatIconLocalPath){
        throw new ApiErrors(400,"Chat icon is required")
    }
    
    const chatIcon = await uploadOnCloudinary(chatIconLocalPath);

    // console.log("Chat icon url:",chatIcon)
    if(!chatIcon){
        throw new ApiErrors(400,"Failed to upload chat icon")
    }


    const newGroup = await Conversation.create(
        {
            isGroup : true,
            chatName : groupName,
            chatIcon : chatIcon.url,
            members: membersIds,
            description: description
        }
    )

    // console.log("group:",newGroup)

    if(!newGroup){
        throw new ApiErrors(400,"Unable to create group")
    }

    return res.status(200).json(
        new ApiResponse(200,newGroup,"New group created successfully")
    )

})

const sendSimpleMessage = asyncHandler( async(req,res)=>{
    const {message,receiverArray,chatName}=req.body

    if(!message || !chatName  || receiverArray.length <=0){
        throw new ApiErrors(400,"Provided data are insufficient")
    }

    // console.log("Receivers array:",receiverArray)
    const sender=req.user;

    if(!sender){
        throw new ApiErrors(400,"Sender not fetched")
    }
    const receiversIds=receiverArray.map( (receiver)=>new mongoose.Types.ObjectId(receiver))
 
    receiversIds.push(sender._id);

    // console.log("Recievers of gc:",receiversIds)

    const simpleMessage = await SimpleMessage.create(
        {
            message,
            members: receiversIds,
            chatName,
            sender: sender._id
        }
    ) 

    let conversation = await Conversation.findOne(
        {
            chatName: chatName,
            members: {$all:receiversIds}
        }
    )

    if(conversation){
        if(conversation.members.length === receiversIds.length){
            conversation.simpleMessages.push(simpleMessage._id)
            await conversation.save()
        }
    }else{
        conversation = await Conversation.create(
            {
                isGroup: receiversIds.length > 2,
                chatName,
                members: receiversIds,
                simpleMessages: [simpleMessage._id]
            }
        )

    }

    return res.status(200).json(
        new ApiResponse(200,conversation,"New simpleMessage added to the conversation document")
    )

})

const sendExpenseMessage = asyncHandler(async(req,res)=>{
    const{amount,description,place,expenseDate,chatName,receiverArray}=req.body

    if(
        [amount,description,place,expenseDate,chatName].some((field)=>field.trim()==="")
    ){
        throw new ApiErrors(400,"Provided data are insufficient")
    }

    if(receiverArray.length <=0){
        throw new ApiErrors(400,"Recivers not fetched")
    }

    
    const receiversIds=receiverArray.map( (receiver)=> new mongoose.Types.ObjectId(receiver))

    const sender = req.user;

    if(!sender){
        throw new ApiErrors(400,"Sender not fetched")
    }

    receiversIds.push(sender._id)

    const expenseMessage = await ExpenseMessage.create(
        {
            amount,
            description,
            place,
            expenseDate,
            members: receiversIds,
            chatName,
            sender: sender._id
        }
    )

    let conversation = await Conversation.findOne(
        {
            chatName: chatName,
            members: {$all:receiversIds}
        }
    )

    if(conversation){
        if(conversation.members.length === receiversIds.length){
            conversation.expenseMessages.push(expenseMessage._id)
            await conversation.save()
        }
    }else{
        conversation = await Conversation.create(
            {
                isGroup: receiversIds.length > 2,
                chatName,
                members: receiversIds,
                expenseMessages: [expenseMessage._id]
            }
        )
    }

    return res.status(200).json(
        new ApiResponse(200,conversation,"New expense message added")
    )


})

export {
    sendSimpleMessage,
    sendExpenseMessage,
    createGroup
}