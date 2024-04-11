import React, { useState } from "react";
import "../profileCard/Profilecard.css";
import {Link} from "react-router-dom";

// import cover from "../../img/cover.jpg";
// import profile from "../../img/profileImg.jpg";
import { useSelector } from "react-redux";
import Followersmodals from "../profileModals.jsx/FollowersModal/Followersmodals";

const Profilecard = ({location}) => {
  const [modalOpened, setmodalOpened] = useState(false);


  const {user} = useSelector((state)=> state.authReducers.authData);
  const posts = useSelector((state)=>state.postReducer.posts)

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;


  // const profilePage = false;

  return (

    

    <>
      <div className="profileCard">
        <div className="profileImages">
          <img src={user.coverPicture? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"} alt="cover img" />
          <img src={user.profilePicture? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt="profile img" />
        </div>

        <div className="profileName">
          <span>{user.firstname} {user.lastname}</span>
          <span>{user.worksAt? user.worksAt: "write about your self"}</span>
        </div>

        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>{user.following.length}</span>
              <span>following</span>
            </div>

            <div className="vl"></div>

            <div className="follow">
              <span>{user.followers.length}</span>
              <span style={{cursor:"pointer"}} onClick={() => setmodalOpened(true)}>followers</span>
              <Followersmodals modalOpened={modalOpened} setmodalOpened={setmodalOpened}/>
            </div>

            {location === 'profilePage' && (
              <>
                <div className="vl"></div>

                <div className="follow">
                  <span>{posts.filter((post)=> post.userId === user._id).length}</span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>

          <hr />
        </div>

        {location === 'profilePage'? '' : <span>
        <Link style={{textDecoration: "none", color: "#D05185"}} to={`/profile/${user._id}`}>
        My profile
        </Link>
        </span>}

        
      </div>
    </>
  );
};

export default Profilecard;