import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
 export const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:'15d'})


    res.cookie("jwt-netflix",token,{
        maxAge:15*24*60*60*1000,//in 15 days
        httpOnly:true, //js cannot access this cookie, make it not accessible to js
        sameSite: "strict", // prevent CSRF attacks
         secure:ENV_VARS.NODE_ENV!=="development",
    })
 }