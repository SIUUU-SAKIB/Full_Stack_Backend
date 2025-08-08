import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";

export const mainRouter = Router()
const moduleRoutes = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    }
]
moduleRoutes.forEach(route => mainRouter.use(route.path, route.route))

