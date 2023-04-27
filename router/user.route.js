const express  = require("express")
const {UserModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

let userRoute = express.Router()

userRoute.post("/register", async (req, res)=>{
    let {name, email, password, bio, phone, avatar} = req.body
    try {
        if(!bio){
            bio = "Hi there";
        }
        bcrypt.hash(password, 5,async (err, securepass)=>{
            if(err){
                res.send("Something went wrong")
            }else{
                let user = new UserModel({name, email, password:securepass, bio, phone, avatar})
                await user.save()
                res.status(201).send("User register success")
            }
        })
        
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})

userRoute.post("/login", async (req, res)=>{
    let {email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        const hash_pass = user.password
        if(!user){
            res.send("Please Register First")
        }else{
            bcrypt.compare(password, hash_pass,async (err, result)=>{
                if(result){
                    const token = jwt.sign({userId: user._id}, process.env.key)
                    res.send({"message":"Login success", "token": token})
                }else{
                    res.send("Something went wrong", err)
                }
            })
        }
        
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})


module.exports = {userRoute}