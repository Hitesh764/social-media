import React from 'react';
import './Profile.css';
import Profileleft from '../../../components/ProfileLeft/Profileleft';
import Profilecard from '../../../components/profileCard/Profilecard';
import Postside from '../../../components/postSide/Postside';
import Rightside from '../../../components/Rightside/Rightside'

const Profile = () => {
  return (
    <div className='profile'>
    <Profileleft />

    <div className="profile-center">
    <Profilecard location="profilePage" />
    <Postside />
    </div>

    <Rightside />



    </div>

  )
}

export default Profile
