import { NextRequest, NextResponse } from "next/server";
import Transaction from "@/models/transactionmodels";
import { jwtmiddleware } from "@/app/lib/jwtmiddleware";

// PUT /api/transactions/[id]
export async function PUT(req: NextRequest, context: any) {
  try {
    const result = await jwtmiddleware(req);
    if (!result.valid) return result.response;

    const { id } = context.params;
    const { title, amount, type, date } = await req.json();

    if (!title || !amount || !type || !date) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "All fields are required",
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { title, amount, type, date },
      { new: true }
    );

    return NextResponse.json({ success: true, updatedTransaction });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// DELETE /api/transactions/[id]
export async function DELETE(req: NextRequest, context: any) {
  try {
    const result = await jwtmiddleware(req);
    if (!result.valid) return result.response;

    const { id } = context.params;

    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ success: true, deletedTransaction });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}


