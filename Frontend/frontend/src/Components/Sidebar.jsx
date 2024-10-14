import React, { useState } from "react";
import "./Styles/SidebarStyle.css";
import { FaSearch } from "react-icons/fa";

import Otheruser from "./Otheruser";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setOtherUsers } from "../Redux/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {otherUsers} = useSelector(store=>store.user);

  const logoutHandler = async () => {
    try {
      const res = await axios.post("https://chatappclone-eza8.onrender.com/api/v1/user/logout");
      console.log(res.data);
      localStorage.removeItem("authUser");
      dispatch(logout());
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = (e)=>{
    e.preventDefault();
    
    const searchUser = otherUsers?.find((user)=>user.fullName.toLowerCase().includes(search.toLowerCase()));
    if(searchUser){
      dispatch(setOtherUsers([searchUser]));
      
    }
    else{
      toast.error("User Not Found ! ")
    }
  }

  return (
    <div className="main-container-sidebar">
      <div className="searchBox">
        <input
          type="text"
          className="searchIp"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchHandler}>
          <FaSearch size="30px" />
        </button>
      </div>
      <hr className="line" />
      <div className="users">
        <Otheruser />
      </div>

      <button onClick={logoutHandler} className="btn" type="submit">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
