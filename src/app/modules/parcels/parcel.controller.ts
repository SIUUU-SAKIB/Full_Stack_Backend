import { NextFunction, Request, Response } from "express";
import { parcelService } from "./parcel.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes'
const createParcel = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email } = req.user
        const result = await parcelService.createParcel(req.body, email)

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


// controller/parcel.controller.ts
const getAllParcels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await parcelService.getAllParcels(page, limit);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All parcels retrieved successfully 😍😍😍",
            total: result.totalParcel,
            totalPages: result.totalPages,
            currentPage: result.currentPage,
            data: result.parcels,
        });
    } catch (error: any) {
        next(error);
    }
};

// update parcel
const approveParcel = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
        
    try {
        const result = await parcelService.approveParcel(req.body)
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
        console.log(req.body.id)
    try {
        await parcelService.deleteParcel(req.body.id)
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
        const { trackingNumber } = req.body
        const result = await parcelService.parcelStatus(trackingNumber)
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.ACCEPTED,
            message: `Current parcel status is here 😍`,
            data: result

        })
    } catch (error: any) {
        next(error)
    }
}

// cancel parcel
const cancelParcel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { trackingNumber } = req.body
        const result = await parcelService.cancelParcel(trackingNumber)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.ACCEPTED,
            message: `You have successfully cancelled this parcel delivery`,
            data: result

        })
    } catch (error: any) {
        next(error)
    }

}
const getParcelByUser = async (req: Request, res: Response, next: NextFunction) => {
    const parcels = await parcelService.getParcelByUser(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: `Successfully fetched Data`,
        data: [parcels.parcels, parcels.totalParcel, parcels.approvedParcels, parcels.deliveredParcels, parcels.pendingParcels]

    })
}

const getReceiverParcel = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params
    const parcels = await parcelService.getReceiverParcel(email)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: `Successfully fetched all the parcels 😍`,
        data: parcels

    })

}

const getParcelById = async(req: Request, res: Response, next: NextFunction) => {
      const parcel = await parcelService.getParcelById(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: `Successfully fetched Data`,
        data: parcel

    })
}
export const parcelController = {
    createParcel, getAllParcels, approveParcel, deleteParcel, parcelStatus, cancelParcel, getParcelByUser, getReceiverParcel, getParcelById
}