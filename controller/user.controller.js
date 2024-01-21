import { asyncHandler } from "../utils/asynchandler";
import { ApiError } from "../utils/ApiErrors";
import { User } from "../models/User.model";
import { ApiResponse } from "../utils/ApiResponse";

const registerUser = asyncHandler(async(req,res) => {
    // get user detail from user
    // already registered
    // create user obj - create entry in db
    // remove password and refresh token field
    // check for user creation
    // return res

    const {username, email, password} = req.body
    if([username,email,password].some((field)=> field?.trim() === "") ){
        throw new ApiError(400,"All fields are required !!!")
    }
    const existUser = User.findOne({
        $or: [{username}, {email}]
    })
    if(existUser){
        throw new ApiError(409,"User already exists")
    }

    const user = await User.create({
        username: username,
        email: email,
        password:password
    })

    const createdUser = await User.findById(user._id).select("-password")

    if(!createdUser){
        throw new ApiError(500, "Something Went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Succesfully")
    )
})

const loginUser = asyncHandler(async(req,res)=>{
    // data 
    // if user exist or not 
    // if yes compare password 
    // if yes generate Access Token 
    // send cookie

    const {email,password} = req.body
    if(!email){
        throw new ApiError(400,"Email required")
    }

    const user = await User.findOne({email})
    if(!userser){
        throw new ApiError(409,"User does not Exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid User Credentials")
    }

    const accessToken = await user.generateAccessToken();
    await user.save({validateBeforeSave:false})
    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user,accessToken
            },
            "User logged in Succesfully"
        )
    )
})

const logOutUser = asyncHandler(async(req,res)=>{
    User.findOneAndUpdate(req.user._id,{
        $set: {
            accessToken:null,
        }
    },
    {
        new: true
    })

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .json(new ApiResponse(200,{},"User logged Out succesfully"))
})

export {
    registerUser,
    loginUser,
    logOutUser
}