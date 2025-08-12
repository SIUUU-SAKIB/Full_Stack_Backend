export enum ParcelStatus {
    PENDING = "pending",
    PICKED_UP = "picked_up",
    IN_TRANSIT = "in_transit",
    AT_HUB = "at_hub",
    OUT_FOR_DELIVERY = "out_for_delivery",
    DELIVERED = "delivered",
    RETURNED = "returned",
    CANCELLED = "cancelled",
    APPROVED = "approved"

}

export type PaymentStatus = "unpaid" | "paid" | "refunded";
export type PaymentMethod = "cash_on_delivery" | "credit_card" | "mobile_payment";

export interface IAddress {
    name: string;
    phone: string;
    email?: string;
    streetAddress: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    landmark?: string;
}

export interface IParcel {
    sender: IAddress,
    receiver: IAddress,
    accessToken?:string,
    weight: number,
    dimentions?: { length: number; width: number; height: number },
    contentDescription?: string,
    fragile?: boolean,
    trackingNumber?: string,
    currentStatus: ParcelStatus,
    pickupDate?: Date,
    expectedDeliveryDate?: Date;
    actualDeliveryDate?: Date;
    deliveryAttempts?: number;
    shippingCost?: number;
    paymentStatus?: PaymentStatus;
    paymentMethod?: PaymentMethod;

}