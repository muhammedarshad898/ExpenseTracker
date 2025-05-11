import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
    
});

// Check if the model is already defined to avoid overwriting it
const Transaction = mongoose.models.Transactions || mongoose.model("Transactions", transactionSchema);

export default Transaction;
