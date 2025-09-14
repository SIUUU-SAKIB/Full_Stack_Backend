import bcryptjs from 'bcryptjs'
import { envVariable } from '../config/env.config'

const hashedPassword = async (password: string) => {
    const hashedPassword = await bcryptjs.hash(password, Number(envVariable.BCRYPTJS_SALT_ROUND))
    return hashedPassword
}


const comparePassword = async (plain: string, hashed: string): Promise<boolean> => {
    return await bcryptjs.compare(plain, hashed);
};

export const bcryptFunction = {
    hashedPassword, comparePassword
}

