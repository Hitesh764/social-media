import React from 'react';
import '../home/Home.css';
import Profileside from '../../components/Profileside';
import Postside from '../../components/postSide/Postside';
import Rightside from '../../components/Rightside/Rightside';

const Home = () => {
  return (
    <>
    <div className="home">
    <Profileside />
    <Postside />
    <Rightside />
    </div>
      
    </>
  )
}

export default Home
