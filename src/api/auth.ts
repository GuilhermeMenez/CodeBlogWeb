import { api } from '@/api/client'
import { authResponseSchema, userSchema } from '@/api/schemas/auth'
import type { AuthResponse, LoginDTO, RegisterDTO, User } from '@/api/schemas/auth'

export const authApi = {
  login: async (data: LoginDTO): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data)
    return authResponseSchema.parse(response.data)
  },

  register: async (data: RegisterDTO): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data)
    return authResponseSchema.parse(response.data)
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  me: async (): Promise<User> => {
    const response = await api.get('/auth/me')
    return userSchema.parse(response.data)
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await api.post<{ token: string }>('/auth/refresh')
    return response.data
  },
}
