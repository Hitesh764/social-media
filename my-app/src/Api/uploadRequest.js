import axios from "axios";

const API = axios.create({baseURL : "http://localhost:5000"});

export const uploadImage = (data) => API.post('/upload', data); //remove /upload/ to /upload

export const uploadPost = (data) => API.post("/post", data) //change /posts to post

