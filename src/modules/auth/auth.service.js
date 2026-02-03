import { userModel } from "../../database/model/user.model.js";


export const signUp = async (data) => {

    let { name, email, password } = data

    let emailStatues = await userModel.findOne({ email })
    if (emailStatues) {
        return { message: "email exist before" }
    }

    try {

        let createUser = await userModel.create({ name, email, password, balance: 0 })

        return {
            success: true,
            message: "User created successfully",
            user: {
                _id: createUser._id,
                name: createUser.name,
                email: createUser.email,
                balance: createUser.balance
            }
        }

    } catch (error) {

        return error

    }

}



export const login = async (data) => {

    let { email, password } = data

    let emailStatues = await userModel.findOne({ email, password })

    if (emailStatues) {
        return {
            success: true,
            message: "User logged in successfully",
            user: {
                _id: emailStatues._id,
                name: emailStatues.name,
                email: emailStatues.email,
            }
        }
    } else {
        return {
            message: "faild email or password"
        }
    }



}