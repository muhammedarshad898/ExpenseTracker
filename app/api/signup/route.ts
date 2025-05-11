import User from "@/models/usermodel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import mongoDBConnection from "@/db.config/db.config";

export async function POST(req: NextRequest) {
    try {
        await mongoDBConnection();
        const { username, email, password } = await req.json();

        // Input validation
        if (!username || !email || !password) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "All fields are required"
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "Invalid email format"
            });
        }

        // Password strength validation
        if (password.length < 6) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "Password must be at least 6 characters long"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save user to database
        await newUser.save();

        // Return success response without password
        return NextResponse.json({
            success: true,
            status: 201,
            message: "User created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
}