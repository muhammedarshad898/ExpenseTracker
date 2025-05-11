import Transaction from "@/models/transactionmodels";
import { NextResponse } from "next/server";
import { jwtmiddleware } from "@/app/lib/jwtmiddleware";


export async function POST(req: Request) {
    try {
        console.log("API POST request received"); 
     const result = await jwtmiddleware(req);
     if(result.valid===false)
        return result.response
     
    
    
        const userId=result.payload.userid
     

       


        
        const { title, amount, type, date } = await req.json();
        console.log(title, amount, type, date);  // Ensure the data is being received correctly.

        if (!title || !amount || !type || !date) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "All fields are required"
            });
        }

        const transaction = new Transaction({ title, amount, type, date,userId });
        await transaction.save();

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Transaction added successfully"
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
