import mongoose from "mongoose";
import Transaction from "@/models/transactionmodels";
import { jwtmiddleware } from "@/app/lib/jwtmiddleware";

import { NextResponse } from "next/server";
import mongoDBConnection from "@/db.config/db.config";

export async function GET(req: Request) {
    try {
        await mongoDBConnection
        const result = await jwtmiddleware(req);
        if (result.valid === false) return result.response;

        const userId = result.payload.userid;

        const transactions = await Transaction.find({ userId });
        return NextResponse.json({ success: true, transactions });
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
