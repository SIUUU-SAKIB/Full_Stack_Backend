import { Router } from "express";
import { parcelController } from "./parcel.controller";
import { vaildateZodSchema } from "../../middlewares/validateRequest";
import { ParcelZodSchema, updateParcelZodSchema } from "./parcel.validation";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const parcelRouter = Router()
// ?create parcel
parcelRouter.post('/create-parcel', vaildateZodSchema(ParcelZodSchema), authMiddleware('sender'), parcelController.createParcel)

// *get all parcels
parcelRouter.get('/all-parcel', authMiddleware('admin', 'super_admin'), parcelController.getAllParcels)

// *update parcel
parcelRouter.patch('/parcel-status/:id', authMiddleware('admin', 'super_admin'), vaildateZodSchema(updateParcelZodSchema), parcelController.updateParcel)

// *delete parcel
parcelRouter.delete('/delete/:id', authMiddleware('admin', 'super_admin'), parcelController.deleteParcel)

// *user delete parcel 

parcelRouter.delete('/delete-parcel/:id', authMiddleware('sender'), parcelController.deleteParcel) 

// *get parcel status
parcelRouter.get('/current-status', authMiddleware('sender', 'receiver'), parcelController.parcelStatus)

// *cancel parcel
parcelRouter.patch('/cancel-parcel', authMiddleware("sender", "receiver"), parcelController.cancelParcel)