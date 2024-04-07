import React,{useState, useEffect, useRef} from 'react';
import './Chat.css';
import {useSelector} from 'react-redux';

import home from "../../../img/home.png";
import noti from "../../../img/noti.png";
import comment from "../../../img/comment.png";

import Logosearch from '../../../components/logoSearch/Logosearch';
import { userChats } from '../../../Api/ChatRequest';
import Conversation from '../../../components/Conversation/Conversation';
import { Link } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import ChatBox from '../../../components/ChatBox/ChatBox';

import io from "socket.io-client"

const Chat = () => {

    const {user} = useSelector((state) => state.authReducers.authData)
    // console.log(user)

    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)


    const socket = useRef()


     

//sending message to socket server
    useEffect(() => {
        if(sendMessage!==null){
            socket.current.emit('send-message',sendMessage)
        }
    }, [sendMessage]);


    useEffect(() => {
        socket.current = io('http://localhost:8800')
        socket.current.emit("new-user-add", user._id)
        socket.current.on('get-users',(users)=>{
            setOnlineUsers(users)
        })
    }, [user]);


   // Receive message from socket server
    useEffect(() => {
        socket.current.on("receive-message", (data)=>{
            setReceiveMessage(data)
        })
    }, [])

    

    useEffect(() => {
        const getChats = async()=>{
            try {
                const {data} = await userChats(user._id)
                setChats(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        getChats()
    
    }, [user])




    const checkOnlineStatus = (chat) =>{
        const chatMember = chat.members.find((member)=> member !== user._id)
        const online = onlineUsers.find((user) => user.userId === chatMember)
        return online? true : false
    }


  return (
    <>
    <div className='Chat'>
    {/*Left Side */}

    <div className="Left-side-chat">
    <Logosearch />
    <div className='Chat-container'>
    <h2>Chat</h2>
    <div className="Chat-list">
    {chats.map((chat)=> (
        <div onClick={() => setCurrentChat(chat)}>

    <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)}/>        
    
    </div>

    ))}

    </div>
    </div>
    </div>


    {/*Right Side */}
    <div className="Right-side-chat">
    <div style={{width: '20rem', alignSelf: 'flex-end'}}>
    <div className="navIcon">
          <Link to="../home"><img src={home} alt="" /></Link>
          <IoSettingsOutline style={{ fontSize: "1.7rem" }} />
          <img src={noti} alt="" />
          <Link to="../chat"><img src={comment} alt="" />
          </Link>
        </div>

    </div>
    {/*chat body */}   
    <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage}/>

    </div>



    </div>
    </>
  )
}

export default Chat
