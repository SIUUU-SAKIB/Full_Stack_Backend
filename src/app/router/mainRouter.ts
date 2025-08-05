import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";

export const mainRouter = Router()
const moduleRoutes = [
    {
        path:"/",
        route :userRoutes
    }
]
moduleRoutes.forEach(route => mainRouter.use(route.path, route.route))

