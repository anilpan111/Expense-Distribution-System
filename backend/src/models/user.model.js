import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema(
    {
        mobileNo:{
            type: Number,
            required: true,
            unique: true,
            trim: true,
        },
        email :{
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            index: true

        },
        fullName :{
            type: String,
            required: true,
            trim: true
        },
        avatar :{
            type: String,
            required: true,
        },
        coverImage :{
            type: String,
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken :{
            type: String
        }

    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next();

    this.password =await  bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    // console.log("Accesstoken Generating")
    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            fullName: this.fullName,
            userName: this.mobileNo,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User= mongoose.model("User",userSchema)