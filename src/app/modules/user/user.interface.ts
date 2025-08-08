import { Types } from "mongoose"

export enum Role {
  ADMIN = "admin",
  SUPER_ADMIN = 'SUPER_ADMIN',
  SENDER = "sender",
  RECEIVER = "receiver",
  PUBLIC = "public"
}


export interface IAuthProvider {
    provider: "google" | "credentials",
    providerId: string
}

export interface IUser  {
    _id:Types.ObjectId,
    name:string,
    email:string,
    password?:string,
    accessToken?:string,
    refreshToken?:string,
    role:Role,
    phone?:number,
    profileImage?:string,
    isVerified?:boolean,
    address?:{
     street:string,
     city:string,
     postalCode:number,
     country:string,
     
    },
    auths?:IAuthProvider[],
    parcelId:Types.ObjectId
}