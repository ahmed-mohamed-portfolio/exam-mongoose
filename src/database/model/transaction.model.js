import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    userId:
    {
        type: mongoose.ObjectId,
        ref: "user",
        required: true
    },
    type: {
        type: String,
        enum: ["deposit", "withdraw"],
        required: true
    },
    amount:
    {
        type: Number,
        required: true,
        min: 0
    },
    balanceAfter:
    {
        type: Number,
        required: true
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    }
});



export const transactionModel = mongoose.model('transaction',transactionSchema)