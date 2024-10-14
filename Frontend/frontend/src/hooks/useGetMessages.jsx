import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../Redux/messageSlice';

const useGetMessages = () => {

    const {selectedUsers} = useSelector((store)=>store.user);
    const dispatch = useDispatch();
  
    useEffect(()=>{
        const fetchMessages = async()=>{
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`https://chatappclone-eza8.onrender.com/api/v1/message/${selectedUsers?._id}`);
                //log(res)
                dispatch(setMessages(res.data.conversation.message))

            } catch (error) {
                console.log("from useGetMessage Error");
                console.log(error);
            }
        }
        fetchMessages();

    },[selectedUsers])
}

export default useGetMessages;