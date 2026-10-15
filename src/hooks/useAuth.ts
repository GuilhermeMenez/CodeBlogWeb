import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { authApi } from '@/api/auth'
import { queryKeys } from '@/lib/query-client'

import type { LoginDTO, RegisterDTO } from '@/api/schemas/auth'

// ======= Queries =======

// Hook para buscar dados do usuário autenticado
export function useMe() {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: authApi.me,
    staleTime: 1000 * 60 * 10, // 10 minutos
    retry: false, // Não retry se não autenticado
  })
}

// Hook para verificar se usuário está autenticado
export function useIsAuthenticated() {
  const { data, isLoading, isError } = useMe()

  return {
    isAuthenticated: !!data && !isError,
    isLoading,
    user: data,
  }
}

// ======= Mutations =======

// Hook para login
export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: LoginDTO) => authApi.login(data),
    retry: false,
    onSuccess: (response) => {
      // Salva token
      localStorage.setItem('token', response.token)

      // Atualiza cache do usuário
      queryClient.setQueryData(queryKeys.auth.me(), response.user)

      // Redireciona para feed
      navigate({ to: '/feed' })
    },
  })
}

// Hook para registro
export function useRegister() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: RegisterDTO) => authApi.register(data),
    retry: false,
    onSuccess: (response) => {
      // Salva token
      localStorage.setItem('token', response.token)

      // Atualiza cache do usuário
      queryClient.setQueryData(queryKeys.auth.me(), response.user)

      // Redireciona para feed
      navigate({ to: '/feed' })
    },
  })
}

// Hook para logout
export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.logout,
    retry: false,
    onSettled: () => {
      // Remove token mesmo se a API falhar
      localStorage.removeItem('token')

      // Limpa todo o cache
      queryClient.clear()

      // Redireciona para auth
      navigate({ to: '/' })
    },
  })
}
