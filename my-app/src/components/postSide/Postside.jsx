import React from 'react';
import './Postside.css';
import Postshare from '../postShare/Postshare';
import Posts from '../Posts/Posts';

const Postside = () => {
  return (
    <>
    <div className="postSide">

    <Postshare />
    <Posts />


    </div>
    </>
  )
}

export default Postside
