import React from 'react';
import '../logoSearch/Logosearch.css';

import logo from '../../img/logo.png';
import logo2 from "../../img/Group 8.png"
import { IoSearch } from "react-icons/io5";

const Logosearch = () => {
  return (
    <>
    <div className="logoSearch">
    <img className='logo2' src={logo2} alt="" />

    {/*<div className="search">
    <input type="text" placeholder='Explore' />
    <div className="s-icon">
    <IoSearch />
  </div> 
    
    </div>*/}
    <h1 style={{color:"#D05185"}}>InstaInspire</h1>
    </div>

      
    </>
  )
}

export default Logosearch