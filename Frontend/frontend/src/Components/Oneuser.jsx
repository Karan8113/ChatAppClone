import React from "react";
import "./Styles/OneuserStyle.css";
import {useDispatch, useSelector} from "react-redux"
import { setSelectedUsers,setOnlineUsers } from "../Redux/userSlice";


const Oneuser = ({user}) => {
  const dispatch = useDispatch();
  const {selectedUsers,onlineUsers}=useSelector((store)=>store.user);
  
  const isOnline = onlineUsers.includes(user._id);

  const handleSelect = (user)=>{
    dispatch(setSelectedUsers(user))
  }
  
  
  return (
    <div onClick={()=>handleSelect(user)} className="userCard">
      
      <div className="profileCard">
        <img src={user?.profilePhoto} />
      </div>
      <div className="profileName">
        <h4>{user?.fullName}</h4>
      </div>

      {isOnline?(<div className="online-indicator"></div>):""}


      
    </div>
  );
};

export default Oneuser;
