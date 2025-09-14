export enum ParcelStatus {
    PENDING = "pending",
    IN_TRANSIT = "in_transit",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
    APPROVED = "approved",
    REJECTED = "rejected"
}

export type PaymentStatus = "unpaid" | "paid" | "refunded";
export type PaymentMethod = "cash_on_delivery" | "credit_card" | "mobile_payment";

export interface IAddress {
    name: string;
    phone: string;
    email: string;
    address: string
}

export interface IParcel {
    parcelId:string,
    userId:string,
    receiverEmail:string,
    sender: IAddress,
    receiver: IAddress,
    accessToken?: string,
    weight: string,
    dimentions?: { length: number; width: number; height: number },
    contentDescription?: string,
    fragile?: boolean,
    trackingNumber?: string,
    currentStatus: ParcelStatus,
    pickupDate?: Date,
    rejectedDate?:Date,
    approvalDate?:Date,
    transitDate?:Date,
    expectedDeliveryDate?: Date;
    actualDeliveryDate?: Date;
    deliveryAttempts?: number;
    shippingCost?: number;
    paymentStatus?: PaymentStatus;
    paymentMethod?: PaymentMethod;

}