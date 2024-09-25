import { z } from 'zod';

const ConfigSchema = z.object({
  EXPRESS_PORT: z.number().int(), // Utilisation de .int() pour garantir un nombre entier
  STRIPE_PUBLIC_KEY: z.string(),
  STRIPE_PRIVATE_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  DB_HOST: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.number().int(),
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_KEY: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;
const rawConfig: Partial<Config> = {
  EXPRESS_PORT: process.env.EXPRESS_PORT
    ? parseInt(process.env.EXPRESS_PORT, 10)
    : 3000, // Conversion en entier
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
};

export const Config = ConfigSchema.parse(rawConfig);
