import React,{useState} from "react";
import "./Post.css";
import comment from "../../img/comment.png";
import share from "../../img/share.png";
import like from "../../img/like.png";
import disLike from "../../img/notlike.png";
import { useSelector } from "react-redux";
import { likePost } from "../../Api/postRequest";

const Post = ({ data }) => {
  const {user} = useSelector((state) =>state.authReducers.authData);

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

  const handleLike = () =>{
    setLiked((prev)=> !prev)
    likePost(data._id, user._id)
    liked? setLikes((prev)=> prev -1) : setLikes((prev)=> prev+1)

    
  }


  return (
    <div className="post">
      <img src={data.image? process.env.REACT_APP_PUBLIC_FOLDER + data.image: ""} alt="" />

      <div className="postReaction">
        <img src={liked ? like : disLike} alt="" style={{cursor: "pointer"}} onClick={handleLike}/>
        <img src={comment} alt="" />
        <img src={share} alt="" />
      </div>


      <span style={{color: "var(--gray)", fontSize: "14px"}}>{likes} likes</span>

      <div className="details">
      <span><b>{data.name}</b></span>
      <span> {data.desc}</span>
      </div>


    </div>
  );
};

export default Post;
