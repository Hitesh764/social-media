import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import postRoute from './Routes/postRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import MessageRoute from './Routes/MessageRoute.js'

import ChatRoute from './Routes/ChatRoute.js';


//Routes

const app = express();

//to serve images for public
app.use(express.static('public'))
app.use('/images', express.static("images"))

//middlware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

dotenv.config()

mongoose
  .connect(process.env.MONGO_DB,
  {useNewUrlParser:true,  useUnifiedTopology: true}
  ).then(() => app.listen(process.env.port, () => console.log(`listening on port ${process.env.port}`)))
  .catch((error) => console.log(error))

app.use("/auth", AuthRoute)
app.use("/user", UserRoute)
app.use("/post", postRoute)
app.use("/upload", UploadRoute)
app.use("/chat", ChatRoute)
app.use("/message", MessageRoute)