import React,{useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser} from '../../Actions/userAction';

const User = ({person,showButton}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.authReducers.authData);
    const [following, setFollowing] = useState(person.followers.includes(user._id))
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleFollow = () =>{
        following ?
        dispatch(unFollowUser(person._id, user)):
        dispatch(followUser(person._id, user));

        setFollowing((prev)=>!prev)
        

    }



  return (

    <>
    <div className="follower">
              <div>
                <img src={person.profilePicture? serverPublic + person.profilePicture : serverPublic + "defaultProfile.png"} alt="" className="followerImg" />

                <div className="name">
                  <span>{person.firstname}</span>
                  <span>{person.username}</span>
                </div>
              </div>
              {showButton && (
                <button className={following? "button fc-btn UnFollowButton" : "button fc-btn"} onClick={handleFollow}>{following? "unfollow" : "follow"}</button>

              )}
            </div>
      
    </>
  )
}

export default User
