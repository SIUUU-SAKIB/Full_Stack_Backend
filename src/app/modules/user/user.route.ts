import { Router } from "express";
import { userController } from "./user.controller";
import { vaildateZodSchema } from "../../middlewares/validateRequest";
import { zodSchemas } from "./user.validation";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { Role } from "./user.interface";



export const userRoutes = Router()


// *CREATE USER
userRoutes.post('/create-user', vaildateZodSchema(zodSchemas.createUserZodSchema), userController.createUser)
// *CREATE ADMIN
userRoutes.post('/create-admin', authMiddleware('super_admin'), userController.createAdmin)
// *GET ALL USER
userRoutes.get('/all-users', authMiddleware('admin', 'super_admin'), userController.getAllUser)

//  *GET USER BY ID
userRoutes.get("/get-user", authMiddleware("admin", "super_admin"), userController.getUserById)

// *VERIFY USER
userRoutes.patch('/verify-user', authMiddleware("admin", "super_admin"), userController.verifyUser)

userRoutes.patch('/block-user', authMiddleware("admin", "super_admin"), userController.blockUser)
userRoutes.patch('/unblock-user', authMiddleware("admin", "super_admin"), userController.unblockUser)
// *DELETE USER BY ID
userRoutes.delete('/delete-user/:id', authMiddleware(...Object.values(Role)), userController.deleteUser)

// * DELETE BY ADMIN, ANY USER
userRoutes.delete('/delete-by-admin', authMiddleware('admin', 'super_admin'), userController.deleteByAdmin)
userRoutes.get('/all-admins', authMiddleware("super_admin"), userController.getAdmins)
// *UPDATE USER BY ID
userRoutes.patch('/update-user/:id', authMiddleware(...Object.values(Role)), vaildateZodSchema(zodSchemas.updateUserZodSchema), userController.updateUser)
// *UPDATE USER BY ADMIN
userRoutes.patch('/update-user-by-admin/:id', authMiddleware('admin', 'super_admin'), userController.updateUserbyAdmin)