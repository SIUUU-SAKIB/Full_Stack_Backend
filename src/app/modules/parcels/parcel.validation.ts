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
]);

export const PaymentStatusEnum = z.enum(["unpaid", "paid", "refunded"]);
export const PaymentMethodEnum = z.enum([
  "cash_on_delivery",
  "credit_card",
  "mobile_payment",
]);

const AddressSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.email(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  landmark: z.string().optional(),
});

const DimensionsSchema = z.object({
  length: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const ParcelZodSchema = z.object({
  sender: AddressSchema,
  receiver: AddressSchema,
  accessToken: z.string().optional(),
  weight: z.number().optional(),
  dimensions: DimensionsSchema.optional(),
  contentDescription: z.string().optional(),
  fragile: z.boolean().optional(),
  trackingNumber: z.string().optional(),
  currentStatus: ParcelStatusEnum.optional(),
  pickupDate: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date().optional()
  ),
  expectedDeliveryDate: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date().optional()
  ),
  actualDeliveryDate: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date().optional()
  ),
  deliveryAttempts: z.number().int().optional(),
  shippingCost: z.number().optional(),
  paymentStatus: PaymentStatusEnum.optional(),
  paymentMethod: PaymentMethodEnum.optional(),
});


export const updateParcelZodSchema = z.object({
  currentStatus: ParcelStatusEnum,
  trackingNumber: z.string().optional(), deliveryAttempts: z.number().int().optional(),
  shippingCost: z.number().optional(),
  paymentStatus: PaymentStatusEnum.optional(),
  paymentMethod: PaymentMethodEnum.optional(), fragile: z.boolean().optional(),
})