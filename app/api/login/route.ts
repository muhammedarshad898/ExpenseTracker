import User from "@/models/usermodel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoDBConnection from "@/db.config/db.config";




export async function POST(req:NextRequest){
    try{
       await mongoDBConnection();
        const {email,password}=await req.json();
        const user=await User.findOne({email});
        if(user){
            const isPasswordValid=await bcrypt.compare(password,user.password);
            if(isPasswordValid){
                const token=jwt.sign({userid:user._id},process.env.JWT_SECRET as string,{expiresIn:"1h"});
                return NextResponse.json({
                    success:true,
                    message:"Login successful",
                    user:user,
                    token:token
                })
            }
            else{
                return NextResponse.json({
                    success:false,
                    message:"Invalid password"
                })
            }
        }

    }
    catch(error:any){
        return NextResponse.json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        })
    }
}



