import { transactionModel } from "../../database/model/transaction.model.js";
import { userModel } from "../../database/model/user.model.js"


export const addAmount = async (userId, amount) => {

    let user = await userModel.findById(userId)
    if (!user) {
        return { message: "User not found" };
    }

    try {

        user.balance += Number(amount);
        await user.save();

        let addedMoney = await transactionModel.create({
            userId: user._id,
            type: "deposit",
            amount: Number(amount),
            balanceAfter: user.balance
        });

        if (addedMoney) {

            return {
                success: true,
                message: "Deposit successful",
                balance: user.balance,
                transaction: {
                    _id: addedMoney.userId,
                    type: addedMoney.type,
                    amount: addedMoney.amount,
                    balanceAfter: addedMoney.balanceAfter
                }
            }
        } else {
            return { message: "error in adding money" }
        }


    } catch (error) {
        return { errorMessage: error }
    }
}



export const subAmount = async (userId, amount) => {


    let user = await userModel.findById(userId)
    if (!user) {
        return { message: "User not found" };
    }

    if (user.balance < Number(amount)) {
        return { message: `Insufficient balance. Current balance: ${user.balance}` };
    }



    try {

        user.balance -= Number(amount);
        await user.save();

        let withdrawMoney = await transactionModel.create({
            userId: user._id,
            type: "withdraw",
            amount: Number(amount),
            balanceAfter: user.balance
        });

        if (withdrawMoney) {

            return {
                success: true,
                message: "withdraw successful",
                balance: user.balance,
                transaction: {
                    _id: withdrawMoney.userId,
                    type: withdrawMoney.type,
                    amount: withdrawMoney.amount,
                    balanceAfter: withdrawMoney.balanceAfter
                }
            }

        } else {
            return { message: "error in withdraw money" }
        }


    } catch (error) {
        return { errorMessage: error }
    }
}



export const getUserBalance = async (userId) => {

    let user = await userModel.findById(userId)


    if (user) {

        return {
            success: true,
            balance: user.balance,
            user: {
                name: user.name,
                email: user.email
            }
        }

    } else {
        return { message: "User not found" };

    }

}



export const getUserTransactions = async (userId) => {


    let transactions = await transactionModel.find({ userId }).sort({ createdAt: -1 }).select('-password -userId -__v').populate('userId', 'name email')

    if (transactions) {

        return {
            success: true,
            transactions
        }

    } else {
        return { message: "User not found" };

    }

}


export const totalDepositsAndWithdrawals = async (userId) => {


    let user = await userModel.findById(userId)
    if (!user) {
        return { message: "User not found" };
    }

    try {

        const result = await transactionModel.aggregate([

            { $match: { userId: user._id } },

            {
                $group: {
                    _id: '$type',
                    amount: { $sum: '$amount' }
                }
            },

            {//just enhancement 
                $project: {
                    _id: 0,
                    type: '$_id',
                    total: '$amount'
                }
            }
        ])




        return {
            result
        }

    } catch (error) {
        return { errorMessage: error }
    }



}