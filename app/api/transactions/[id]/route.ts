import Transaction from "@/models/transactionmodels";
import { NextResponse } from "next/server";
import { jwtmiddleware } from "@/app/lib/jwtmiddleware";

export async function DELETE(req:Request,{params}:{params:{id:string}})
{
    try {
        const result = await jwtmiddleware(req);
        if (result.valid === false) return result.response;

        
        const transactionId=params.id

        const deletedTransaction=await Transaction.findByIdAndDelete(transactionId)
        return NextResponse.json({success:true,deletedTransaction});
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const transactionId = params.id; // access it first

  try {
    const result = await jwtmiddleware(req);
    if (result.valid === false) return result.response;

    const { title, amount, type, date } = await req.json();

    if (!title || !amount || !type || !date) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "All fields are required",
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { title, amount, type, date }
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
