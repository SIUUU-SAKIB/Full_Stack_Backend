import createAppError from "../../Error/createAppError";
import { bcryptFunction } from "../../utils/bcryptHash";
import { jwtTokens } from "../../utils/jwtTokens";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { UserModel } from "./userModel";
import httpStatus from "http-status-codes"

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload

    if (!email || !password) {
        throw new createAppError(httpStatus.BAD_REQUEST, "Email and password are required");
    }

    const isUserExist = await UserModel.findOne({ email })
    if (isUserExist) {
        throw new createAppError(httpStatus.BAD_GATEWAY, 'User already exist')
    }
    // BCRYPT HASHED PASSWORD
    const hashedPassword = await bcryptFunction.hashedPassword(password)
    const authProvider: IAuthProvider = { provider: 'credentials', providerId: email }


    const user = await UserModel.create({
        email, password: hashedPassword, auths: [authProvider], ...rest
    })
    // JWT TOKEN
    const jwtPayload = {
        user_id: user._id,
        email: user.email,
        role: user.role
    }

    const token = jwtTokens.generateToken(jwtPayload, '2d')
    user.accessToken = token
    await user.save()
    return {
        user
    }

}

const getAllUser = async () => {
    const allUser = await UserModel.find()
    const totalUser = await UserModel.countDocuments()
    return {
        allUser, totalUser
    }
}

const deleteUser = async (id: string) => {
    const findUser = await UserModel.findById({ _id: id })
    if (!findUser) {
        throw new createAppError(404, 'User does not exist')
    }
    const user = await UserModel.findByIdAndDelete({ _id: id })
    return user

}

const updateUser = async (id: string, payload: Partial<IUser>) => {
    const findUser = await UserModel.findById(id)
    if (!findUser) {
        throw new createAppError(404, 'User does not exist')
    }
    if (payload.password) {
        payload.password = await bcryptFunction.hashedPassword(payload.password)
    }
    const user = await UserModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return user
}
export const userService = {
    createUser, getAllUser, deleteUser, updateUser
}