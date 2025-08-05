import { config, parse } from "dotenv";
import z from "zod";

config()
const envSchema = z.object({
    PORT : z.string().default('2000'),
     DATABASE_URL: z.string({ message: "DATABASE_URL must be a valid URL" }),

})

const parsed = envSchema.safeParse(process.env)
if (!parsed.success) {
  console.error("❌ Environment variable validation error")
  process.exit(1)
}

export const envVariable = parsed.data