import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

export type signUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type signInSchema = z.infer<typeof signInSchema>;
