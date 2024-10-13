import React, { useEffect, useRef } from 'react';
import './Styles/Messages.css';
import RecieverMessage from './RecieverMessage.jsx';
import SenderMessages from './SenderMessages.jsx';
import useGetMessages from '../hooks/useGetMessages.jsx';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTImeMessage.jsx';

const Messages = () => {
  useGetMessages(); //when this part is comment messages are not shown
  useGetRealTimeMessage(); // messages are not shown when we use this hook

  const scrollRef = useRef();

  

  const { selectedUsers,authUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages])

  // Return if there are no messages or selectedUsers
  if (!messages || !selectedUsers) return null;

  

  // Filter messages between the selected user and the logged-in user
  const filteredMessages = messages.filter(
    (message) =>
      selectedUsers?._id === message?.senderId || selectedUsers?._id === message?.receiverId
  );
  //changes
  // If there are no valid messages between the users, show fallback
  if (filteredMessages.length === 0) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>Please start chatting with each other</div>
    </div>;
  }

  return (
    <div className='messagesBlock'>
      {filteredMessages.map((message) => {
        return selectedUsers?._id === message?.receiverId ? (
          <SenderMessages key={message?._id} message={message} user={authUser} />
        ) : (
          <RecieverMessage key={message?._id} message={message} user={selectedUsers}/>
        );
      })}
      <div ref={scrollRef} />
      
    </div>
  );
};

export default Messages;
