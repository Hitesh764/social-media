import React,{useState,useEffect} from "react";
import "./Infocard.css";

import { MdOutlineModeEdit } from "react-icons/md";
import Profilemodals from "../profileModals.jsx/Profilemodals";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as UserApi from '../../Api/UserRequest.js'
import { logOut } from "../../Actions/AuthActions.js";

const Infocard = () => {

  const [modalOpened, setmodalOpened] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  const profileUserId = params.id;
  const [profileUser, setprofileUser] = useState({})

  const {user} = useSelector((state)=>state.authReducers.authData);

  useEffect(() => {
    const fetchProfileUser = async() =>{
      if(profileUserId === user._id){
        setprofileUser(user)
      } else{
        const profileUser = await UserApi.getUser(profileUserId);
        setprofileUser(profileUser)

      }
    }
    fetchProfileUser()
  
  },[user])


  const handleLogOut = () =>{
    dispatch(logOut())

  }

  

  return (
    <>
      <div className="infocard">
        <div className="infohead">
          <h4>Profile info</h4>
          {user._id === profileUserId ? (
            <div>
            <MdOutlineModeEdit
              style={{ width: "2.5rem", height: "1.5rem"}}
              onClick={() => setmodalOpened(true)}
            />

            <Profilemodals modalOpened={modalOpened} setmodalOpened={setmodalOpened} data={user}/>
           
          </div>) : (" ")}
         
        </div>

        <div className="info">
          <span>
            <b>Status </b>
          </span>
          <span>{profileUser.relationShip}</span>
        </div>

        <div className="info">
          <span>
            <b>Lives in </b>
          </span>
          <span>{profileUser.livesin}</span>
        </div>

        <div className="info">
          <span>
            <b>Work at </b>
          </span>
          <span>{profileUser.worksAt}</span>
        </div>

        

        <button className="button logout-btn" onClick={handleLogOut}>Logout</button>

        
      </div>
    </>
  );
};

export default Infocard;
