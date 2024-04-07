import React,{useState} from "react";
import "./Rightside.css";
import home from "../../img/home.png";
import noti from "../../img/noti.png";
import comment from "../../img/comment.png";
import { IoSettingsOutline } from "react-icons/io5";
import Trendcard from "../TrendCard/Trendcard";
import Sharemodal from "../shareModal/Sharemodal";
import {Link} from 'react-router-dom';

const Rightside = () => {

  const [modalOpened, setmodalOpened] = useState(false);


  return (
    <>
      <div className="rightSide">

        <div className="navIcon">
          <Link to="../home"><img src={home} alt="" /></Link>
          <IoSettingsOutline style={{ fontSize: "1.7rem" }} />
          <img src={noti} alt="" />
          <Link to="../chat"><img src={comment} alt="" />
          </Link>
        </div>

        <Trendcard />

        <button className="button r-btn" onClick={() => setmodalOpened(true)}>
        shares
        </button>

        <Sharemodal modalOpened={modalOpened} setmodalOpened={setmodalOpened}/>


      </div>
    </>
  );
};

export default Rightside;
