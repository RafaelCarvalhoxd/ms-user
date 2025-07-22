import { z } from 'zod';

export const findByEmailSchema = z.object({
  email: z.email('Invalid email format'),
});

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Birth date must be in YYYY-MM-DD format'),
  phone_number: z.string().min(1, 'Phone number is required'),
  gender: z.enum(['M', 'F'], { message: 'Gender must be M or F' }),
});

export type FindByEmailInput = z.infer<typeof findByEmailSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
