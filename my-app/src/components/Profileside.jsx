import React from 'react';
import './Profileside.css'
import Logosearch from './logoSearch/Logosearch'
import Profilecard from './profileCard/Profilecard'
import Followercard from './followerCard/Followercard';

const Profileside = () => {
  return (
    <>
    <div className="profileSide">
    <Logosearch />
    <Profilecard location="homepage"/>
    <Followercard />
    </div>
      
    </>
  )
}

export default Profileside
