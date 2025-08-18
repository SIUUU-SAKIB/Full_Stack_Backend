import { JwtPayload } from "jsonwebtoken";
import createAppError from "../../Error/createAppError";
import { bcryptFunction } from "../../utils/bcryptHash";
import { jwtTokens } from "../../utils/jwtTokens";
import { setAuthCookies } from "../../utils/storeCookie";
import { AdminModel } from "./admin_model";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { UserModel } from "./userModel";
import httpStatus from "http-status-codes"

const createUser = async (payload: Partial<IUser>) => {
    const { name, email, password, ...rest } = payload;

    
    if (!email || !password) {
        throw new createAppError(httpStatus.BAD_REQUEST, "Email and password are required");
    }

    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
        throw new createAppError(httpStatus.BAD_GATEWAY, 'User already exist');
    }

    if (rest.role === 'admin' || rest.role === 'super_admin') {
        throw new createAppError(httpStatus.BAD_GATEWAY, 'You cannot assign as an Admin or Super_Admin');
    }


    const hashedPassword = await bcryptFunction.hashedPassword(password);
    const authProvider: IAuthProvider = { provider: 'credentials', providerId: email };

    // Create user
    const user = await UserModel.create({
        name: name || '',
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest
    });

    // Prepare JWT payload
    const jwtPayload = {
        user_id: user._id,
        email: user.email,
        name: user.name, 
        role: user.role,
        verified: user.isVerified, 
    };

    // Generate token
    const token = jwtTokens.generateToken(jwtPayload, '2d');
    user.accessToken = token;

    await user.save();
    
    return {
        user
    };
};
// CREATE ADMIN: ONLY SUPER ADMIN
const createAdmin = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload

    if (!email || !password) {
        throw new createAppError(httpStatus.BAD_REQUEST, "Email and password are required");
    }

    const isUserExist = await AdminModel.findOne({ email })
    if (isUserExist) {
        throw new createAppError(httpStatus.BAD_GATEWAY, 'User already exist')
    }
    // BCRYPT HASHED PASSWORD
    const hashedPassword = await bcryptFunction.hashedPassword(password)
    const authProvider: IAuthProvider = { provider: 'credentials', providerId: email }


    const user = await AdminModel.create({
        name: rest.name,
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest
    });

    // JWT TOKEN
    const jwtPayload = {
        user_id: user._id,
        email: user.email,
        name: rest.name,
        role: user.role
    }

    const token = jwtTokens.generateToken(jwtPayload, '2d')
    user.accessToken = token
    await user.save()
    return {
        user
    }

}
// GET ALL USER : ONLY ADMIN, SUPER_ADMIN

const getAllUser = async () => {
    const allUser = await UserModel.find()
    const totalUser = await UserModel.countDocuments()
    return {
        allUser, totalUser
    }
}

// get user by id
const getUserById = async (id: string) => {

    const user = await UserModel.findById({ _id: id })
    if (!user) { throw new createAppError(httpStatus.BAD_REQUEST, 'user does not exist') }
    return user
}

const deleteUser = async (id: string, currentUser: JwtPayload) => {
    const curUser = await UserModel.findById(currentUser.userId)

    const findUser = await UserModel.findById({ _id: id })
    console.log(curUser?._id, findUser?._id)
    if (!findUser) {
        throw new createAppError(404, 'User does not exist')
    }
    if (curUser?._id.toString() == findUser?._id.toString()) {
        const user = await UserModel.findByIdAndDelete({ _id: id })
        return user

    } else {
        throw new createAppError(httpStatus.BAD_REQUEST, 'You cannot delete this account')
    }

}
const deleteByAdmin = async (id: string) => {
    const findUser = await UserModel.findById({ _id: id })
    if (!findUser) {
        throw new createAppError(404, 'User does not exist')
    }
    const user = await UserModel.findByIdAndDelete({ _id: id })
    return user

}

const updateUser = async (id: string, payload: Partial<IUser>, currentUser: JwtPayload) => {
    const curUser = await UserModel.findById(currentUser.userId)
    const findUser = await UserModel.findById(id)
    if (!findUser) {
        throw new createAppError(404, 'User does not exist')
    }
    if (curUser?._id.toString() !== findUser._id.toString()) {
        throw new createAppError(httpStatus.BAD_REQUEST, 'you cannot update this account.')
    }
    if (payload.password) {
        payload.password = await bcryptFunction.hashedPassword(payload.password)
    }
    const user = await UserModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    await user?.save()
    return user
}

// *UPDATE UESR BY ADMIN
const updateUserbyAdmin = async (id: string, payload: Partial<IUser>)=> {

    const findUser = await UserModel.findById(id)
    if (!findUser) {
        throw new createAppError(404, 'User does not exist')
    }
    if (payload.password) {
        payload.password = await bcryptFunction.hashedPassword(payload.password)
    }
    const user = await UserModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    await user?.save()
    return user
}
// *VERIFY USER ONLY ADMIN
const verifyUser = async (id: string) => {
    const findUser = await UserModel.findById(id)
    if (!findUser) { throw new createAppError(httpStatus.BAD_REQUEST, 'User does not exist') }
    if (findUser) {
        findUser.isVerified = true
        await findUser.save()
    }
}

export const userService = {
    createUser, getAllUser, deleteUser, updateUser, createAdmin, verifyUser, getUserById, deleteByAdmin, updateUserbyAdmin
}