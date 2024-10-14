import React, { useEffect, useRef, useState } from "react";
import "./Styles/MessageContainerStyle.css";

import { IoSend } from "react-icons/io5";
import Messages from "./Messages";
import BlankPage from "./BlankPage";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setMessages } from "../Redux/messageSlice";
import { setSelectedUsers } from "../Redux/userSlice";

const MessageContainer = () => {
  const { selectedUsers, authUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const [ipMessage, setIpMessage] = useState("");
  const dispatch = useDispatch();

  const inputRef = useRef();

  useEffect(() => {
    return () => dispatch(setSelectedUsers(null));
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!ipMessage.trim()) return; // Prevent sending empty messages

    try {
      const res = await axios.post(
        `https://chatappclone-eza8.onrender.com/api/v1/message/send/${selectedUsers?._id}`,
        { message: ipMessage }, // Make sure the key is consistent with your backend
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Assuming the response contains the sent message, you can dispatch an action to add it to the Redux store
      // dispatch(addMessage(res.data));

      console.log("Message sent:", res);
      dispatch(setMessages([...messages, res.data.message]));

      inputRef.current.focus();
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setIpMessage(""); // Clear the input after sending the message
  };

  

  return (
    <>
      {selectedUsers == null ? (
        <BlankPage user={authUser} />
      ) : (
        <div className="main-container-message">
          <div>
            <div className="topSenderCard">
              <div className="profileSenderCard">
                <img src={selectedUsers?.profilePhoto} alt="Profile" />
              </div>
              <div className="profileSenderName">
                <h4>{selectedUsers?.fullName}</h4>
              </div>
            </div>
          </div>

         
          <Messages/>

          <div className="sendMessageInput" style={{ marginBottom: "2px" }}>
            <input
              ref={inputRef}
              value={ipMessage}
              onChange={(e) => setIpMessage(e.target.value)}
              placeholder="Send a message ..."
              className="msgIp"
            />
            <button
              type="button"
              onClick={onSubmitHandler}
              className="sendBtn"
              disabled={!ipMessage.trim()} // Disable button if input is empty
            >
              <IoSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
