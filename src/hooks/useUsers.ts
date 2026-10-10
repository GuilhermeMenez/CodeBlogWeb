import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { usersApi } from '@/api/users'
import { queryKeys } from '@/lib/query-client'

import type { PaginationParams } from '@/api/schemas/common'
import type { UpdateProfileDTO } from '@/api/schemas/users'

// ======= Queries =======

// Hook para buscar perfil de um usuário
export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => usersApi.getProfile(userId),
    enabled: !!userId,
  })
}

// Hook para buscar seguidores de um usuário
export function useUserFollowers(userId: string, params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.users.followers(userId, params),
    queryFn: () => usersApi.getFollowers(userId, params),
    enabled: !!userId,
  })
}

// Hook para buscar quem o usuário segue
export function useUserFollowing(userId: string, params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.users.following(userId, params),
    queryFn: () => usersApi.getFollowing(userId, params),
    enabled: !!userId,
  })
}

// Hook para buscar usuários por pesquisa
export function useSearchUsers(query: string, params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.users.search(query, params),
    queryFn: () => usersApi.search(query, params),
    enabled: query.length > 2,
  })
}

// ======= Mutations =======

// Hook para atualizar perfil do usuário
export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateProfileDTO) => usersApi.updateProfile(data),
    retry: false,
    onSuccess: (updatedProfile) => {
      // Atualiza cache do perfil
      queryClient.setQueryData(queryKeys.users.detail(updatedProfile.id), updatedProfile)

      // Invalida dados do usuário autenticado
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() })
    },
  })
}

// Hook para seguir um usuário
export function useFollowUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => usersApi.follow(userId),
    retry: false,
    onSuccess: (_, userId) => {
      // Invalida perfil do usuário seguido
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(userId) })

      // Invalida listas de following/followers
      queryClient.invalidateQueries({ queryKey: queryKeys.users.following(userId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.followers(userId) })

      // Invalida feed (pode mudar com novos follows)
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.feed() })
    },
  })
}

// Hook para deixar de seguir um usuário
export function useUnfollowUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => usersApi.unfollow(userId),
    retry: false,
    onSuccess: (_, userId) => {
      // Invalida perfil do usuário
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(userId) })

      // Invalida listas de following/followers
      queryClient.invalidateQueries({ queryKey: queryKeys.users.following(userId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.followers(userId) })

      // Invalida feed
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.feed() })
    },
  })
}
