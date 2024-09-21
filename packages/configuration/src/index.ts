import { z } from 'zod';

const ConfigSchema = z.object({
  EXPRESS_PORT: z.number().int(), // Utilisation de .int() pour garantir un nombre entier
});

export type Config = z.infer<typeof ConfigSchema>;
const rawConfig: Partial<Config> = {
  EXPRESS_PORT: process.env.EXPRESS_PORT
    ? parseInt(process.env.EXPRESS_PORT, 10)
    : 3000, // Conversion en entier
};

export const Config = ConfigSchema.parse(rawConfig);
