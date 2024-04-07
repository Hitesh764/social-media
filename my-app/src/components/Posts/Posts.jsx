import React,{useEffect} from "react";
import "./Posts.css";

import Post from "../Post/Post";
// import { PostsData } from "../../Data/postData";

import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { getTimeLinePosts } from "../../Actions/postAction";
import { useParams } from "react-router-dom";

const Posts = () => {

  const dispatch = useDispatch();

  const {user} = useSelector((state)=> state.authReducers.authData);
  let {posts, loading} = useSelector((state)=> state.postReducer);

  const params = useParams();
  

  useEffect(() => {
    dispatch(getTimeLinePosts(user._id));
  
  }, [])

  if(!posts) return "no posta";
  if(params.id) posts = posts.filter((post)=> post.userId === params.id)

  return (
    
      <div className="posts">

      {loading? "Fetching Post...." : posts.map((post,id) =>{
        return <Post data={post} id={id}/>
      })}


      </div>
    
  );
};

export default Posts;
