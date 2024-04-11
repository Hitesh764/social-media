import React,{useState,useEffect} from "react";
import "./Followercard.css";

import User from "../User/User";
import { getAllUser } from "../../Api/UserRequest";
import { useSelector } from "react-redux";

const Followercard = () => {

  const [persons, setPersons] = useState([])
  const {user} = useSelector((state)=>state.authReducers.authData);


  useEffect(() => {
    const fetchPerson = async() =>{
      const {data} = await getAllUser();
      setPersons(data);
      console.log(data);
    };
    fetchPerson()
  
  }, []);


  return (
    <>
      <div className="followerCard">
        <h3>People you may know</h3>

        {persons.map((person, id) => {
          if(person._id !== user._id){
            return <User person={person} key={id} showButton={true}/>;
          }
          
        })}
      </div>
    </>
  );
};

export default Followercard;
