import createAppError from "../../Error/createAppError";
import { generateTackingID } from "../../utils/generateTrackingId";
import { jwtTokens } from "../../utils/jwtTokens";
import { UserModel } from "../user/userModel";
import { IParcel, ParcelStatus } from "./parcel.interface";
import httpStatus from "http-status-codes";
import { ParcelModel } from "./parcel.model";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";


// *CREAE A PARCEL REQUEST : ONLY SENDER

const createParcel = async (payload: Partial<IParcel>, email: string) => {
    const { receiver, trackingNumber, ...rest } = payload;
    const findUser = await UserModel.findOne({ email })
    if (findUser?.isVerified === false) {
        throw new createAppError(httpStatus.BAD_REQUEST, 'User must be verified by the admin')
    }
    if (!receiver) {
        throw new createAppError(
            httpStatus.BAD_REQUEST,
            "Receiver information is required"
        );
    }
    const isParcelExist = await ParcelModel.findOne({ trackingNumber: trackingNumber })
    if (isParcelExist) {
        throw new createAppError(httpStatus.CONFLICT, 'This parcel Already exist')
    }
    const sender = {
        name: rest.sender?.name || undefined,
        email: rest.sender?.email || undefined,
        phone: rest.sender?.phone || undefined,
        address: rest.sender?.address || undefined
    };

    const trackingID = generateTackingID();

    const parcel = await ParcelModel.create({
        sender,
        receiver,

        trackingNumber: trackingID,
        ...rest
    });

    return { parcel };
};

// *UPDATE PARCEL : ONLY ADMIN || SUPER_ADMIN

const updateParcel = async (payload: Partial<IParcel>, id: any) => {

    const parcel = await ParcelModel.findByIdAndUpdate(id, payload)
    await parcel?.save()
    return parcel
}

// *GET ALL PARCEL :ONLY ADMIN || SUPER_ADMIN
const getAllParcels = async () => {
    const parcels = await ParcelModel.find()
    const totalParcel = await ParcelModel.countDocuments()
    return {
        parcels, totalParcel
    }
}

// *VERIFY USER ONLY ADMIN
const verifyUser = async (id: string) => {
    const findUser = await UserModel.findOne({ id })
    if (!findUser) { throw new createAppError(httpStatus.BAD_REQUEST, 'User does not exist') }
    if (findUser) {
        findUser.isVerified = true
        await findUser.save()
    }
}
// *DELETE PARCEL : ONLY ADMIN 
const deleteParcel = async (id: string) => {
    await ParcelModel.findByIdAndDelete(id)
}

// *PARCEL STATUS

export const parcelStatus = async (trackingNumber: string) => {

    if (!trackingNumber) {
        throw new createAppError(httpStatus.BAD_REQUEST, "Tracking number is required");
    }

    const parcel = await ParcelModel.findOne(
        { trackingNumber: trackingNumber },
    );

    if (!parcel) {
        throw new createAppError(httpStatus.NOT_FOUND, "Parcel not found");
    }
    const status = {
        status: parcel?.currentStatus || undefined,
        deliveryAttempts: parcel?.deliveryAttempts || undefined,
        paymentStatus: parcel?.paymentStatus || undefined,
        expectedDeliveryDate: parcel?.expectedDeliveryDate || undefined,
        shippingCost: parcel?.shippingCost || undefined
    }
    return status
};


// *CHANGE STATUS BY USER ONLY
const cancelParcel = async (trackingNumber: string) => {

    const isParcelExist = await ParcelModel.findOne({ trackingNumber })

    if (!isParcelExist) throw new createAppError(httpStatus.NOT_FOUND, 'Parcel does not exist😔')

    if (isParcelExist?.currentStatus !== "pending") {
        throw new createAppError(httpStatus.EXPECTATION_FAILED, `you cannot cancel this parcel because it's been already in ${isParcelExist.currentStatus}`)
    }
    isParcelExist.currentStatus = ParcelStatus.CANCELLED
    await isParcelExist.save()



    return isParcelExist
}
export const parcelService = {
    createParcel, getAllParcels, updateParcel, deleteParcel, parcelStatus, cancelParcel
}