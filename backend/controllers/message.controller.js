import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res)=> {

    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
    const senderId = req.user._id;

    let  conversation = await Conversation.findOne({
        participants: {$all : [senderId, receiverId]}
    })
    // console.log(conversation)
    if(!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }
    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    })
    // console.log(newMessage)

    if(newMessage){
        conversation.messages.push(newMessage._id);
        await conversation.save();
    }

    // Socket concept for real time messaging

    const receiverSocketId = getRecieverSocketId(receiverId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in Message controller", error.message);
		return res.status(500).json({ error: "Internal Server Error" });
    }
    

}


export const getMessage = async (req, res)=> {

    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

    let  conversation = await Conversation.findOne({
        participants: {$all : [senderId, userToChatId]}
    }).populate('messages');
    
    if (!conversation) return res.status(200).json([]);

    res.status(200).send(conversation.messages);

    } catch (error) {
        console.log("Error in Message controller", error.message);
		return res.status(500).json({ error: "Internal Server Error" });
    }
    

}