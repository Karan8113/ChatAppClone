import React from "react";

const RecieverMessage = ({message,user}) => {
  
  return (
    
    <div
      
      className="chat chat-start"
      style={{
        display: "flex",
        margin: "4px",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <div className="chat-image avatar">
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            overflow: "hidden",
            margin:"0px 5px",
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
            color: "black",
            backgroundColor: "lightgrey",
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

export default RecieverMessage;
