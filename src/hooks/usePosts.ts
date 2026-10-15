import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { postsApi } from '@/api/posts'
import { queryKeys } from '@/lib/query-client'

import type { PaginationParams } from '@/api/schemas/common'
import type { CreatePostDTO, UpdatePostDTO } from '@/api/schemas/posts'

// ======= Queries =======

// Hook para buscar todos os posts
export function usePosts(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.posts.list(params),
    queryFn: () => postsApi.getAll(params),
  })
}

// Hook para buscar feed do usuário
export function useFeed(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.posts.feed(params),
    queryFn: () => postsApi.getFeed(params),
  })
}

// Hook para buscar um post específico
export function usePost(id: string) {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => postsApi.getById(id),
    enabled: !!id,
  })
}

// Hook para buscar posts de um autor
export function usePostsByAuthor(authorId: string, params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.posts.byAuthor(authorId, params),
    queryFn: () => postsApi.getByAuthor(authorId, params),
    enabled: !!authorId,
  })
}

// Hook para buscar posts por pesquisa
export function useSearchPosts(query: string, params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.posts.search(query, params),
    queryFn: () => postsApi.search(query, params),
    enabled: query.length > 2, // Só busca se tiver mais de 2 caracteres
  })
}

// ======= Mutations =======

// Hook para criar um post
export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostDTO) => postsApi.create(data),
    retry: false,
    onSuccess: () => {
      // Invalida listas de posts para refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.feed() })
    },
  })
}

// Hook para atualizar um post
export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostDTO }) => postsApi.update(id, data),
    retry: false,
    onSuccess: (updatedPost, { id }) => {
      // Atualiza o cache do post específico
      queryClient.setQueryData(queryKeys.posts.detail(id), updatedPost)

      // Invalida listas para refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.feed() })
    },
  })
}

// Hook para deletar um post
export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => postsApi.delete(id),
    retry: false,
    onSuccess: (_, id) => {
      // Remove do cache
      queryClient.removeQueries({ queryKey: queryKeys.posts.detail(id) })

      // Invalida listas para refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.feed() })
    },
  })
}
