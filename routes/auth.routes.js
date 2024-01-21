import express from "express";
import {User} from '../models/User.model.js'

const router = express.Router()

// REGISTER 
router.post("/register",async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: (req.body.password,process.env.SECRET_KEY).toString()
    })
    try {
        const user = await newUser.save();
        res.json(user)
    } catch (error) {
        console.log("ERROR: ",error);
    }
})

// login 
router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user) res.status(401).json("User Does not Exist")
        const bytes = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if(originalPassword!==req.body.password) res.status(401).json("wrong credentials")
        const {password,...info} = user._doc

        console.log("User Login succesfully!!!");
        res.status(200).json(info)

    } catch (error) {
        res.status(500).json("something went wrong");
    }
})

export default router