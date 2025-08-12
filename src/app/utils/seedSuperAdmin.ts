import { envVariable } from "../config/env.config";
import { Role } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/userModel"
import { bcryptFunction } from "./bcryptHash";
import { jwtTokens } from "./jwtTokens";

export const seedSuperAdmin = async () => {

    const existingAdmin = await UserModel.findOne({ email: envVariable.SUPER_ADMIN_EMAIL });

    if (existingAdmin) {
        console.log('SUPDER ADMIN ALREADY EXIST')
    } else {
        const hashedPassword = await bcryptFunction.hashedPassword(envVariable.SUPER_ADMIN_PASSWORD)
        const superAdmin = await UserModel.create({
            name: 'SUPER_ADMIN',
            email: envVariable.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            role: Role.super_admin
        })

        const token = jwtTokens.generateToken(
            {
                userId: superAdmin._id.toString(),
                email: superAdmin.email,
                role: superAdmin.role,
            },
            "20d"
        );
        superAdmin.accessToken = token
        await superAdmin.save()

        console.log('super admin created')
    }

}