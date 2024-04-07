import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import userModel from "../Models/userModel.js";



//Registering new user

export const registerUser = async(req,res) => {
    // const {username,password,firstname,lastname} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // const newUser = new userModel({username,password:hashPassword,firstname,lastname});

    req.body.password = hashPassword;
    const newUser = new userModel(req.body)
    const {username} = req.body;

    try {

        const oldUser = await userModel.findOne({username});

        if(oldUser){
            return res.status(400).json({message: "username is already exits !"})
        }

        const user = await newUser.save();

        const token = jwt.sign({
            username: user.username, id: user._id
        }, process.env.JWT_KEY, {expiresIn: "1h"})

        res.status(200).json({user, token})
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }

};



//for login through username and passsword


export const loginUser = async(req,res) => {
    const {username,password} = req.body;

    try {
        const user = await userModel.findOne({username:username});

        if(user){
            const validity = await bcrypt.compare(password, user.password);

            if(!validity){
                res.status(400).json("worng password")
            } else{
                const token = jwt.sign({
                    username: user.username, id: user._id
                }, process.env.JWT_KEY, {expiresIn: "1h"})
                res.status(200).json({user, token})
            }

            // validity ? res.status(200).json(user) : res.status(400).json("worng password")
        } else{
            res.status(404).json("User does not exit")
        }
    } catch (error) {
        res.status(500).json({message: message.error})
        
    }


};