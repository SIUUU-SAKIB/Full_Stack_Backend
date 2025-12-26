import { Router } from "express";
import { parcelController } from "./parcel.controller";
import { vaildateZodSchema } from "../../middlewares/validateRequest";
import { ParcelZodSchema, updateParcelZodSchema } from "./parcel.validation";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const parcelRouter = Router()
// *create parcel
parcelRouter.post('/create-parcel', vaildateZodSchema(ParcelZodSchema), authMiddleware('sender'), parcelController.createParcel)

// *get all parcels
parcelRouter.get('/all-parcel', authMiddleware('admin', 'super_admin'), parcelController.getAllParcels)

// *update parcel
parcelRouter.patch('/change-status', authMiddleware('admin', 'super_admin', "receiver", "sender"), vaildateZodSchema(updateParcelZodSchema), parcelController.approveParcel)

// *delete parcel
parcelRouter.delete('/delete-parcel', authMiddleware('admin', 'super_admin',"receiver", "sender"), parcelController.deleteParcel)

// *user delete parcel 
parcelRouter.delete('/delete-parcel/:id', authMiddleware('sender', "receiver"), parcelController.deleteParcel)

// *get parcel status
parcelRouter.get('/current-status', authMiddleware('sender', 'receiver'), parcelController.parcelStatus)

// *cancel parcel
parcelRouter.delete('/cancel-parcel', authMiddleware("sender", "receiver"), parcelController.cancelParcel)

parcelRouter.get('/getParcelByUser/:id', authMiddleware('sender', 'receiver'), parcelController.getParcelByUser)
parcelRouter.get('/getParcelById/:id', authMiddleware("sender", "receiver"), parcelController.getParcelById)
parcelRouter.get(`/get-receiver-parcel/:email`, authMiddleware('receiver'), parcelController.getReceiverParcel)