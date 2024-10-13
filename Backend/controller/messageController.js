import { getReceiverSocketId, io } from "../Socket/Socketio.js";
import { Conversation } from "../models/conversationModel.js";
import {Message}from "../models/messageModel.js"

export const sendMessage = async(req,res)=>{
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message}=req.body;

        let gotConversation = await Conversation.findOne({
            participants:{
                $all:[senderId,receiverId]
            }
        })

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message:message
        })

        if(newMessage){
            gotConversation.message.push(newMessage._id);
        }

        // await gotConversation.save();

        await Promise.all([gotConversation.save(),newMessage.save()]);

        // Socket Id
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage); 
        }

        return res.status(201).json({message:newMessage})

    } catch (error) {
        console.log(error);
    }
}


export const getMessage = async (req,res)=>{
    try {
        const senderId = req.id;
        const receiverId = req.params.id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("message")

       

        return res.status(201).json({conversation})

    } catch (error) {
        console.log(error);
    }
}