import React from "react";
import { useSelector } from "react-redux";

const SenderMessages = ({ message,user }) => {
  
  const {authUser} = useSelector(store=>store.user);
  
  
  return (
    <div
      className="chat chat-end"
      style={{
        display: "flex",
        margin: "2px",
        flexDirection: "row-reverse",
        alignItems: "flex-end",
        
      }}
    >
      <div className="chat-image avatar">
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            overflow: "hidden",
            marginLeft: "5px",
          }}
        >
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Tailwind CSS chat bubble component"
            src={user?.profilePhoto}
          />
        </div>
      </div>
      <div>
        <div className="chat-header">
          <time className="text-xs opacity-50" style={{ color: "gray" }}>
            12:45
          </time>
        </div>
        <div
          className="chat-bubble"
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "white",
            backgroundColor: "rgb(59, 110, 123)",
            padding: "8px",
            borderRadius: "5px",
          }}
        >
          {message?.message}
        </div>
      </div>
      
    </div>
  );
};

export default SenderMessages;
