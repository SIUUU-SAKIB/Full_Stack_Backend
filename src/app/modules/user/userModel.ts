import { Schema, model } from "mongoose"
import { IUser, Role } from "./user.interface"

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },

        email: { type: String, required: true, unique: true, trim: true },

        password: { type: String, trim: true },
       accessToken:{type:String},
        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.public
        },

        phone: { type: Number, trim: true },

        profileImage: { type: String },

        isVerified: { type: Boolean, default: false },

        address: {
            street: { type: String },
            city: { type: String },
            postalCode: { type: Number },
            country: { type: String },
        },
        
        auths: [
            {
                provider: {
                    type: String,
                    enum: ["google", "credentials"],
                    required: true,
                },
                providerId: { type: String, required: true },
            }
        ],
        parcelId:{
            type:Schema.Types.ObjectId, ref:'parcel'
        }
    },
    { timestamps: true, versionKey:false }
)

export const UserModel = model<IUser>("User", userSchema)

