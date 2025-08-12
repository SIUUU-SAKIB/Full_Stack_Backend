import z from "zod";
import { Role } from "./user.interface";

const createUserZodSchema = z.object({
    name: z.string({ message: 'Name must be a string' }).min(2, { message: 'Name cannot be smaller than two characters' }).max(30, { message: 'Name cannot exceed thirty characters.' }),
    email: z.email(),
    password: z.string().regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            message:
                "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @, $, !, %, *, ?, &).",
        }
    ).optional(),
    phone: z.string().regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
        message: "Phone number must be a valid Bangladeshi number..."
    }).optional()
    ,
    role: z.enum(Object.values(Role) as [string]).optional(),
    address: z.object({
        street: z.string().min(5, { message: 'Street name cannot be smaller than 5 characters' }).max(50, { message: 'Street name cannot exceed 50 characters.' }).optional(),
        city: z.string().min(3, { message: 'City name cannot be smaller than 3 characters' }).max(30, { message: 'Street name cannot exceed 30 characters.' }).optional(),
        postalCode: z.string().regex(/^\d{3,10}$/, {
            message: 'Postal code must be between 3 to 10 digits.'
        }).optional()
        ,
        country: z.string().min(3, { message: 'Country name cannot be smaller than 3 characters' }).max(30, { message: 'Country name cannot exceed 30 characters.' }).optional()
    }).optional(),

})
const updateUserZodSchema = z.object({
    name: z.string({ message: 'Name must be a string' }).min(2, { message: 'Name cannot be smaller than two characters' }).max(30, { message: 'Name cannot exceed thirty characters.' }),
    password: z.string({ message: "Password is required" }),
    role: z.enum(Object.values(Role) as [string]).optional(),
    phone: z.string().regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
        message: "Phone number must be a valid Bangladeshi number..."
    }).optional(),
    profileImage: z.string().optional(),
    isVerified: z.boolean().optional(),
    address: z.object({
        street: z.string().min(5, { message: 'Street name cannot be smaller than 5 characters' }).max(50, { message: 'Street name cannot exceed 50 characters.' }).optional(),
        city: z.string().min(3, { message: 'City name cannot be smaller than 3 characters' }).max(30, { message: 'Street name cannot exceed 30 characters.' }).optional(),
        postalCode: z.number().min(3, { message: 'Postal code cannot be smaller tha 3 chracter' }).max(10, { message: 'Postal code cannot exceed 10 chracter' }).optional(),
        country: z.string().min(3, { message: 'Country name cannot be smaller than 3 characters' }).max(30, { message: 'Country name cannot exceed 30 characters.' }).optional()
    }).optional(),
})

export const zodSchemas = {
    createUserZodSchema, updateUserZodSchema
}
// export interface IUser  {
//     _id:Types.ObjectId,
//     name:string,
//     email:string,
//     password?:string,
//     role:Role,
//     phone?:number,
//     profileImage?:string,
//     isVerified?:boolean,
//     address?:{
//      street:string,
//      city:string,
//      postalCode:number,
//      country:string,
//     },
//     auths:IAuthProvider[]
// }