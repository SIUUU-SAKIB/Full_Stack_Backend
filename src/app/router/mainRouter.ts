import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { parcelRouter } from "../modules/parcels/parcel.route";

export const mainRouter = Router()
const moduleRoutes = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path:'/parcel',
        route:parcelRouter
    }
]
moduleRoutes.forEach(route => mainRouter.use(route.path, route.route))

