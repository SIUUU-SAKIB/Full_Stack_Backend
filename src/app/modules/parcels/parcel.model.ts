import mongoose, { Schema } from "mongoose";
import { IAddress, IParcel, ParcelStatus } from "./parcel.interface";
import { string } from "zod/v4/core/regexes.cjs";

const AddressSchema = new Schema<IAddress>(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        address: { type: String }
    },
    { _id: false }
);

const DimensionsSchema = new Schema(
    {
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
    }
);

const ParcelSchema = new Schema<IParcel>({
    userId:{type:String},
      rejectedDate:{type:Date},
      approvalDate:{type:Date},
      deliveredDate:{type:Date},
      transitDate:{type:Date},
    receiverEmail:{type:String},
    sender: { type: AddressSchema, required: true },
    receiver: { type: AddressSchema, required: true },
    accessToken: { type: String },
    weight: { type: String, required: true },
    dimentions: { type: DimensionsSchema },
    contentDescription: { type: String },
    fragile: { type: Boolean },
    trackingNumber: { type: String, unique: true, sparse: true },
    currentStatus: {
        type: String,
        enum: Object.values(ParcelStatus),
        required: true,
        default: ParcelStatus.PENDING,
    },
    pickupDate: { type: Date },
    expectedDeliveryDate: { type: Date },
    actualDeliveryDate: { type: Date },
    deliveryAttempts: { type: Number, default: 0 },
  
    shippingCost: { type: Number },
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "refunded"],
        default: "unpaid",
    },
    paymentMethod: {
        type: String,
        enum: ["cash_on_delivery", "credit_card", "mobile_payment"],
    },
}, {
    timestamps: true, versionKey: false
});

export const ParcelModel = mongoose.model<IParcel>("Parcel", ParcelSchema);