import createAppError from "../../Error/createAppError";
import { IUser } from "../user/user.interface"
import { UserModel } from "../user/userModel";
import httpStatus from 'http-status-codes'
import bcryptjs from 'bcryptjs'
import { jwtTokens } from "../../utils/jwtTokens";
import { JwtPayload } from "jsonwebtoken";
import { bcryptFunction } from "../../utils/bcryptHash";


const credentialsLogin = async (payload: Partial<IUser>) => {

    const { password, email } = payload;

    const isUserExist = await UserModel.findOne({ email })
    if (!isUserExist) {
        throw new createAppError(httpStatus.NOT_FOUND, 'User does not exist')
    }
    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist?.password as string)
    if (!isPasswordMatched) {
        throw new createAppError(httpStatus.UNAUTHORIZED, 'Password does not match')
    }
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    };

    const accToken = jwtTokens.generateToken(jwtPayload)
    const refToken = jwtTokens.generateRefreshToken(jwtPayload)
    const { password: _, ...rest } = isUserExist.toObject()
    delete rest.accessToken
    return {
        accessToken: accToken,
        refreshToken: refToken,
        user: rest
    }
}


// reset password

const resetPassword = async (oldPassword: string,
    newPassword: string,
    email:string) => {
    const user = await UserModel.findOne({email});
    
    if (!user) {
        throw new createAppError(httpStatus.NOT_FOUND, "User not found");
    }

    const isOldPasswordMatched = await bcryptjs.compare(oldPassword, user.password as string);

    if (!isOldPasswordMatched) {
        throw new createAppError(httpStatus.UNAUTHORIZED, "Old password does not match");
    }

    user.password = await bcryptFunction.hashedPassword(newPassword);
    await user.save();

    return true;
}


export const authService = {
    credentialsLogin, resetPassword
}