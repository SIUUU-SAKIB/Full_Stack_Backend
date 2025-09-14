import { z } from "zod";

export const ParcelStatusEnum = z.enum([
  "pending",
  "approved",
  "picked_up",
  "in_transit",
  "at_hub",
  "out_for_delivery",
  "delivered",
  "returned",
  "cancelled",
  "rejected"
]);

export const PaymentStatusEnum = z.enum(["unpaid", "paid", "refunded"]);
export const PaymentMethodEnum = z.enum([
  "cash_on_delivery",
  "credit_card",
  "mobile_payment",
]);
const DimensionsSchema = z.object({
  length: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});
const AddressSchema = z.object({
  name: z.string({ message: "Name required" }),
  phone: z.string({ message: "Phone number required" }),
  email: z.email({ message: "email required" }),
  address: z.string({ message: "Address required" })
});



export const ParcelZodSchema = z.object({
  userId:z.string().optional(),
  receiverEmail:z.string({message:"Receiver Email Required"}),
  sender: AddressSchema,
  receiver: AddressSchema,
  accessToken: z.string().optional(),
  weight: z.coerce.string(), 
  dimensions: DimensionsSchema.optional(),
  contentDescription: z.string(),
  fragile: z.boolean(),
  trackingNumber: z.string().optional(),
  currentStatus: ParcelStatusEnum.default("pending"),
  paymentMethod: PaymentMethodEnum.optional(),
  expectedDeliveryDate: z.coerce.date().optional(),
});



export const updateParcelZodSchema = z.object({
  parcelId:z.string().optional(),
  currentStatus: ParcelStatusEnum,
  deliveryAttempts: z.number().int().optional(),
  shippingCost: z.number().optional(),
  paymentStatus: PaymentStatusEnum.optional(),
  fragile: z.boolean().optional(),
  expectedDeliveryDate: z.coerce.date().optional(),
  approvalDate:z.coerce.date().optional(),
  transitDate:z.coerce.date().optional(),
  rejectedDate:z.coerce.date().optional()
})