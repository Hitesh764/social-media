import React, { useState, useRef } from "react";
import "./Postshare.css";

// import profilePhoto from "../../img/profileImg.jpg";
import { MdInsertPhoto } from "react-icons/md";
import { LuPlayCircle } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../Actions/uploadAction";
// import { updatePost } from "../../../../server/Controller/PostController";
// import authReducers from "../../reducers/authReducers";

const Postshare = () => {
  const loading = useSelector((state)=> state.postReducer.uploading)
  const [image, setimage] = useState(null);
  const desc = useRef();

  const dispatch = useDispatch();
  
  const {user} = useSelector((state) => state.authReducers.authData)

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];

      setimage(img);
    }
  };

  const imageRef = useRef();


  const reset = () =>{
    setimage(null)
    desc.current.value = ""
  }


  const handleUpload = (event) => {
    event.preventDefault();

    const userId = user && user._id;
    const newPost = {
      userId: userId,
      desc: desc.current.value
    };



    if(image){
      const data = new FormData()
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;

      console.log(newPost);


      try {
        dispatch(uploadImage(data))
        
      } catch (error) {
        console.log(error);
        
      }
    }

    dispatch(uploadPost(newPost));

    reset();



  };

  return (
    <>
      <div className="postShare">
        <img src={user.profilePicture? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt="" />

        <div>
          <input ref={desc} required type="text" placeholder="what's happening" />

          <div className="postOption">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
            >
              <MdInsertPhoto />
              Photo
            </div>

            <div className="option" style={{ color: "var(--video)" }}>
              <LuPlayCircle /> Video
            </div>

            <div className="option" style={{ color: "var(--location)", display: "none" }}>
              <IoLocationOutline /> Location
            </div>

            <div className="option" style={{ color: "var(--shedule)", display: "none" }}>
              <MdOutlineCalendarMonth /> Shedule
            </div>

            <button className="button ps-button" onClick={handleUpload} disabled={loading}>
              {loading? "Uploading..." : "Share"}
            </button>

            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>

          {image && (
            <div className="previewImage">
              <RxCross2 onClick={() => setimage(null)} />

              <img src={URL.createObjectURL(image)} alt="" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Postshare;
