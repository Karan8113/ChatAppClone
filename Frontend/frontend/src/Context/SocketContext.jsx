import { createContext,useState,useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client"
import { setSocket } from "../Redux/socketSlice";
import { setOnlineUsers } from "../Redux/userSlice";


export const SocketContext = createContext();

export const useSocketContext = ()=>{
    return useContext(SocketContext);
};

export const SocketContextProvider = ({children})=>{

    // const [onlineUser,setOnlineUsers]=useState([])
    const dispatch = useDispatch();


    const {authUser}=useSelector(store=>store.user)

    useEffect(()=>{
        let socket;
            if(authUser){
                socket = io("http://localhost:8080",{
                    query:{
                        userId:authUser._id,
                    }
                });
                dispatch(setSocket(socket));

                socket.on("getOnlineUsers",(users)=>{
                    dispatch(setOnlineUsers(users));
                })

                 // socket.on() is used to listen the events. can be used bith in ckient and server side
                // socket.on("getOnlineUsers",(users)=>{
                //     setOnlineUsers(users);
                // });

                return ()=>{socket.close();
                dispatch(setSocket(null));}
            }
            else{
                if(socket){
                    socket.close();
                    setSocket(null);
                }
            }
    },[authUser,dispatch])

    return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
}