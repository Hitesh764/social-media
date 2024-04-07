import { Modal, useMantineTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import '../../pages/home/Auth/Auth.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../Actions/userAction";
import {uploadImage} from "../../Actions/uploadAction";

function Profilemodals({ modalOpened, setmodalOpened, data }) {
  const theme = useMantineTheme();
  const {password, ...other} = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setcoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const {user} = useSelector((state)=>state.authReducers.authData);


  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const onImageChange = (event) =>{
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      event.target.name === "profileImage" ? setProfileImage(img) : setcoverImage(img)
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = formData;
    if(profileImage){
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      userData.profilePicture = fileName;

      try {
        dispatch(uploadImage(data))
        
      } catch (error) {
        console.log(error)
        
      }
    }

    if(coverImage){
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      userData.coverPicture = fileName;

      try {
        dispatch(uploadImage(data))
        
      } catch (error) {
        console.log(error)
        
      }
      
    }
    dispatch(updateUser(param.id, userData));
    setmodalOpened(false);

  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.85}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setmodalOpened(false)}
    >
      <form className="infoForm">
        <h2 style={{color: "#2B50A9"}}>Your info</h2>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First name"
            onChange={handleChange}
            value={formData.firstname}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div>
        <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>

        <div>
        <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="Lives In"
            onChange={handleChange}
            value={formData.livesin}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
        <input
        type="text"
        className="infoInput"
        placeholder="RelationShip status"
        name="relationShip"
        onChange={handleChange}
        value={formData.relationShip}
          />
        </div>

        <div>
        Profile Image
        <input type="file" name="profileImage" onChange={onImageChange}/>

        Cover Image 
        <input type="file" name="coverImage" onChange={onImageChange}/>
        </div>

        <button className="button infoBtn" onClick={handleSubmit}>Update</button>

      </form>
    </Modal>
  );
}

export default Profilemodals;
