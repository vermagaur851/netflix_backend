import express from "express";
import {User} from '../models/User.model.js'

const router = express.Router()

// REGISTER 
router.post("/register",async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const user = await newUser.save();
        res.json(user)
    } catch (error) {
        console.log("ERROR: ",error);
    }
})

export default router