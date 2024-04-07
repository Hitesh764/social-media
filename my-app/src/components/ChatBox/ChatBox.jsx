import React, { useEffect, useRef, useState } from "react";
import './ChatBox.css'

import { getUser } from "../../Api/UserRequest";
import { addMessage, getMessages } from "../../Api/MessageRequest";

import {format} from "timeago.js";
import InputEmoji from "react-input-emoji";
import { LuSendHorizonal } from "react-icons/lu";



const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");

  const handleChange = (newMessages)=>{
    setNewMessages(newMessages)
}


//fetching data for header
useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);


  //fetching data from message
  useEffect(() => {
    const fetchMessages = async()=>{
        try {
            const {data} = await getMessages(chat._id);
            setMessages(data)
        } catch (error) {
            console.log(error)
        }
    }
    if(chat!==null) fetchMessages();
  }, [chat])


  //always scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({behavior: "smooth"})

}, [messages])




  useEffect(() => {
    if(receiveMessage!==null && receiveMessage.chatId===chat._id){
        setMessages([...messages,receiveMessage])
    }
  
  }, [receiveMessage]);


    const handleSend = async(e)=>{
        e.preventDefault();
        const message={
            senderId: currentUser,
            text: newMessages,
            chatId: chat._id
        }

        //send message to socket server
        const receiverId = chat.members.find((id) => id !== currentUser);
        setSendMessage({...message, receiverId})

        //send message to database
        try {
            const {data} = await addMessage(message);
            setMessages([...messages, data])
            setNewMessages("")
        } catch (error) {
            console.log(error)
            
        }
    }


    // Receive Message from parent component
    useEffect(() => {
        if(receiveMessage!==null && receiveMessage.chatId===chat._id){
            setMessages([...messages,receiveMessage])
        }
      
      }, [receiveMessage]);

      const scroll = useRef();
      const imageRef = useRef();



  return (
    <>
      <div className="ChatBox-container">
      {chat? ( 
        <>
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                    userData?.profilePicture
                      ? process.env.REACT_APP_PUBLIC_FOLDER +
                        userData.profilePicture
                      : process.env.REACT_APP_PUBLIC_FOLDER +
                        "defaultProfile.png"
                  }
                  alt=""
                  className="followerImg"
                  style={{ width: "50px", height: "50px" }}
                />

                <div className="name" style={{ fontSize: "0.8rem" }}>
                  <span>
                    {userData?.firstname} {userData?.lastname}
                  </span>
                </div>
              </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
          </div>


          {/*chatbox message */}
          <div className="chat-body">
          {messages.map((message)=>(
            <>
            <div ref={scroll} className={message.senderId === currentUser? "message own" : "message"}>
            <span>{message.text}</span>
            <span>{format(message.createdAt)}</span>
            </div>

            </>
          ))}
          </div>


          {/*chat sender */}

          <div className="chat-sender">
          <div onClick={() => imageRef.current.click()}>+</div>
          <InputEmoji 
          value={newMessages}
          onChange={handleChange}
          />
          <div style={{padding:"1rem"}} className="send-button button" onClick={handleSend}><LuSendHorizonal />
          <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
          </div>
          </div>


          
        </>
    ) : (
        <span className="chatbox-empty-message">
        Tap on a chat to start conversation...
        </span>
    )}
      </div>
      
    </>
  );
};

export default ChatBox;