import createAppError from "../../Error/createAppError";
import { IUser } from "../user/user.interface"
import { UserModel } from "../user/userModel";
import httpStatus from 'http-status-codes'
import bcryptjs from 'bcryptjs'
import { jwtTokens } from "../../utils/jwtTokens";
import { bcryptFunction } from "../../utils/bcryptHash";
import { Response } from "express";
import { AdminModel } from "../user/admin_model";
import { setAuthCookies } from "../../utils/storeCookie";

const credentialsLogin = async (payload: Partial<IUser>, res: Response) => {
    const { password, email } = payload;

    let account = await UserModel.findOne({ email }) || await AdminModel.findOne({ email });
    if (!account) {
        throw new createAppError(httpStatus.NOT_FOUND, 'User/Admin does not exist');
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, account.password as string);
    if (!isPasswordMatched) {
        throw new createAppError(httpStatus.UNAUTHORIZED, 'Password does not match');
    }

    let isVerified = account.isVerified;

    const jwtPayload = {
        ...account.toObject(),
        verified: isVerified,
        userId: account?._id,
        email: account?.email,
        role: account?.role,
    };

    const accToken = jwtTokens.generateToken(jwtPayload);
    const refToken = jwtTokens.generateRefreshToken(jwtPayload);

    
    const { password: _, accessToken: __, ...rest } = account.toObject();

 
    setAuthCookies(res, accToken, refToken);
    return {
        accessToken: accToken,
        refreshToken: refToken,
        user: rest, 
    };
};


// reset password

const resetPassword = async (oldPassword: string,
    newPassword: string,
    email: string) => {
    const user = await UserModel.findOne({ email });

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
const getMe = async(id:string) => {
    const user = await UserModel.findOne({id})
    return user
}

export const authService = {
    credentialsLogin, resetPassword, getMe
}