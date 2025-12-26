
import { config } from "dotenv";
import z from "zod";

config();

const envSchema = z.object({
  PORT: z.string().default('2000'),
  DATABASE_URL: z.string({ message: "DATABASE_URL must be a valid URL" }),
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
  BCRYPTJS_SALT_ROUND: z.coerce.number(),
  JWT_SECRET_TOKEN: z.string({ message: "JWT_SECRET_TOKEN is required" }),
  SUPER_ADMIN_EMAIL:z.string({message:'Valid email required'}),
  SUPER_ADMIN_PASSWORD:z.string({message:'password required'}),
 FRONTEND_ORIGIN:z.string({message:"frontend origin required"}),
 JWT_REFRESH_TOKEN: z.string({message:'RefreshToken required'})
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Environment variable validation error:");
  console.error(parsed.error.format());
  process.exit(1);
}

export const envVariable = parsed.data;
