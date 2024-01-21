import mongoose, {Schema,mongo} from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new Schema(
    {
        username: {type: String,required: true, unique: true },
        email: {type: String,required: true, unique: true},
        password: {type: String,required: true},
        profilePic: {type: String,default: ""},
        isAdmin: {type: Boolean}
    },
    {timestamps: true}
)

UserSchema.pre('save',async function(next){
    if(!this.modified('password')) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",UserSchema)