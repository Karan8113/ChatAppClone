import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
 import { setMessages } from "../Redux/messageSlice";

const useGetRealTimeMessage =()=>{
    const {socket} = useSelector(store=>store.socket);
    const {messages}=useSelector(store=>store.message);
    const dispatch = useDispatch();
    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            console.log("this is the new Messages",newMessage);
            dispatch(setMessages([...messages,newMessage]));
        });
        return ()=>socket?.off("newMessage")
    },[socket,setMessages,messages]);
};

export default useGetRealTimeMessage;