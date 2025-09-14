import { envVariable } from "../config/env.config";
import { AdminModel } from "../modules/user/admin_model";
import { Role } from "../modules/user/user.interface";
import { bcryptFunction } from "./bcryptHash";
import { jwtTokens } from "./jwtTokens";

export const seedSuperAdmin = async () => {
    const hashedPassword = await bcryptFunction.hashedPassword(envVariable.SUPER_ADMIN_PASSWORD);

    const superAdmin = await AdminModel.findOneAndUpdate(
        { email: envVariable.SUPER_ADMIN_EMAIL },
        {
            $setOnInsert: {
                name: 'SUPER_ADMIN',
                password: hashedPassword,
                role: Role.super_admin,
            }
        },
        { new: true, upsert: true }
    );

    if (!superAdmin.accessToken) {
        const token = jwtTokens.generateToken(
            {
                userId: superAdmin._id.toString(),
                email: superAdmin.email,
                role: superAdmin.role,
            },
        );

        superAdmin.accessToken = token;
        await superAdmin.save();
        console.log("Super admin created ✅");
    } else {
        console.log("Super admin already exists ✅");
    }
};
