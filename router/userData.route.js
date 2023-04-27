const express  = require("express")
const {UserModel} = require("../model/user.model")

let userAccessRoute = express.Router()

userAccessRoute.get("/", async (req, res)=>{
    try {
        let user = await UserModel.find()
        res.send(user)
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})

userAccessRoute.get("/:email", async (req, res)=>{
    let email = req.params.email
    try {
        let user = await UserModel.find({email})
        res.send(user)
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})

// userAccessRoute.get("/profile", async (req, res)=>{
//     let id = req.body.userId;
//     try {
//         let user = await UserModel.find({_id: id})
//         res.send(user)
//     } catch (error) {
//         console.log(error);
//         res.send("Something went wrong")
//     }
// })

userAccessRoute.patch("/update/:id", async (req, res)=>{
    let id = req.params.id
    let payload = req.body;
    try {
        let user = await UserModel.findByIdAndUpdate({_id:id}, payload)
        res.send("User Data has been updated")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})

userAccessRoute.delete("/delete/:id", async (req, res)=>{
    let id = req.params.id
    try {
        let user = await UserModel.findByIdAndDelete({_id:id})
        res.send("User Data has been deleted")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})

module.exports = {userAccessRoute}