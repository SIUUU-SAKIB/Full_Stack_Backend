import createAppError from "../../Error/createAppError";
import { generateTackingID } from "../../utils/generateTrackingId";
import { jwtTokens } from "../../utils/jwtTokens";
import { UserModel } from "../user/userModel";
import { IParcel } from "./parcel.interface";
import httpStatus from "http-status-codes";
import { ParcelModel } from "./parcel.model";
import { JwtPayload } from "jsonwebtoken";


// *CREAE A PARCEL REQUEST : ONLY SENDER

const createParcel = async (payload: Partial<IParcel>, user: any) => {
    const { receiver, trackingNumber, ...rest } = payload;

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
        name: user.userName,
        email: user.userEmail,
        phone: rest.sender?.phone || undefined,
        streetAddress: rest.sender?.streetAddress || undefined,
        city: rest.sender?.city || undefined,
        state: rest.sender?.state || undefined,
        postalCode: rest.sender?.postalCode || undefined,
        country: rest.sender?.country || undefined,
        landmark: rest.sender?.landmark || undefined
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

// *UPDAATE PARCEL : ONLY ADMIN || SUPER_ADMIN

const updateParcel = async (payload: Partial<IParcel>, id: any) => {

    const parcel = await ParcelModel.findByIdAndUpdate(id, payload)
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
    console.log(parcel)
    return parcel.currentStatus;
};
export const parcelService = {
    createParcel, getAllParcels, updateParcel, deleteParcel, parcelStatus
}