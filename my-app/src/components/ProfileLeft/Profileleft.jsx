import React from 'react';
import '../../components/Profileside.css'
import Logosearch from '../../components/logoSearch/Logosearch';
import Infocard from '../InfoCard/Infocard';
import Followercard from '../../components/followerCard/Followercard';

// import { MantineProvider } from "@mantine/core";



const Profileleft = () => {
  return (
    <>
    <div className="profileSide">

    <Logosearch />

    <Infocard />


     {/*<MantineProvider>
      <Infocard />
     </MantineProvider>*/} 

    <Followercard />
    

    </div>
    </>
  )
}

export default Profileleft
