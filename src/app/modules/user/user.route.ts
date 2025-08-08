import { Router } from "express";
import { userController } from "./user.controller";
import { vaildateZodSchema } from "../../middlewares/validateRequest";
import { zodSchemas } from "./user.validation";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { Role } from "./user.interface";

export const userRoutes = Router()


// *CREATE USER
userRoutes.post('/create-user', vaildateZodSchema(zodSchemas.createUserZodSchema), userController.createUser)

// *GET ALL USER
userRoutes.get('/all-users', authMiddleware('ADMIN', 'SUPER_ADMIN'), userController.getAllUser)


// *DELETE USER BY ID
userRoutes.delete('/delete-user/:id', authMiddleware(...Object.values(Role)), userController.deleteUser)


// *UPDATE USER BY ID
userRoutes.patch('/update-user/:id', authMiddleware(...Object.values(Role)), userController.updateUser)