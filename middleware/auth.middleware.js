import { User } from "../models/User.model";
import { ApiError } from "../utils/ApiErrors";
import { asyncHandler } from "../utils/asynchandler";
import jwt from "jsonwebtoken";


export const verifyjwt = asyncHandler(async (req,res,next)=>{
   try {
     const Token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
     if(!Token){
         throw new ApiError(401,"Unauthorised request")
     }
 
     const decodedToken = jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
     const user = await User.findById(decodedToken?._id).select("-password")
     if(!user) {
         throw new ApiError(401,"Invalid Access Token")
     }
     req.user=user;
     next();
   } catch (error) {
        throw new ApiError(401,error?.message ||"Invalid Access Token")
   }
})