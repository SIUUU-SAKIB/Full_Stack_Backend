import { NextFunction, Request, Response } from "express";
import { parcelService } from "./parcel.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes'
const createParcel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await parcelService.createParcel(req.body, req.user)

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Parcel Created Successfully😍",
            data: result
        })
    } catch (error: any) {
        next(error)
    }
}


const getAllParcels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await parcelService.getAllParcels()
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.ACCEPTED,
            message: "All parcels retreived successfully 😍😍😍",
            total: result.totalParcel,
            data: result.parcels,

        })
    } catch (error: any) {
        next(error)
    }
}

// update parcel
const updateParcel = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const result = await parcelService.updateParcel(req.body, req.params.id)
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.ACCEPTED,
            message: "Parcel updated successfully 😍😍😍",
            data: result

        })
    } catch (error: any) {
        next(error)
    }

}
// delete parcel
const deleteParcel = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        await parcelService.deleteParcel(req.params.id)
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.ACCEPTED,
            message: "Parcel deleted successfully 😍😍😍",
            data: null

        })
    } catch (error: any) {
        next(error)
    }

}

// parcel status
const parcelStatus = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      const {trackingNumber} = req.body
        const result = await parcelService.parcelStatus(trackingNumber)
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.ACCEPTED,
            message: `parcel status is ${result?.toUpperCase()}`,
            data: result

        })
    } catch (error: any) {
        next(error)
    }

}
export const parcelController = {
    createParcel, getAllParcels, updateParcel, deleteParcel, parcelStatus
}