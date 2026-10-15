import { z } from 'zod'

// ======= Entity Schemas =======

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  avatar: z.string().optional(),
  createdAt: z.string(),
})

export const authResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
})

// ======= Input Schemas (form / DTO) =======

export const loginSchema = z.object({
  email: z.email('Por favor, insira um email válido.'),
  password: z.string().min(1, 'Por favor, insira uma senha.'),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Por favor, insira um nome válido.')
    .regex(/^[\p{L}\s]+$/u, 'Por favor, insira um nome válido.'),
  email: z.email('Por favor, insira um email válido.'),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres.')
    .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula.')
    .regex(/\d/, 'Senha deve conter ao menos um número.')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve conter ao menos um caractere especial.'),
})

// ======= Inferred Types =======

export type User = z.infer<typeof userSchema>
export type AuthResponse = z.infer<typeof authResponseSchema>
export type LoginDTO = z.infer<typeof loginSchema>
export type RegisterDTO = z.infer<typeof registerSchema>
