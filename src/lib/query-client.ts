import { QueryClient } from '@tanstack/react-query'
import { isApiError, isClientError } from '@/api/api-error'

function handleQueryError(error: unknown): void {
  if (isApiError(error)) {
    // Log somente desenvolvimento
    if (import.meta.env.DEV) {
      console.error(`[Query Error] Status: ${error.status}, Message: ${error.message}`)
    }
  }
}

function handleQueryRetry(failureCount: number, error: unknown): boolean {
  if (failureCount >= 1) {
    return false
  }

  // Retry apenas para erros normalizados
  if (!isApiError(error)) {
    return false
  }

  // Nao retry para erros 4xx (client errors)
  if (isClientError(error)) {
    if (error.status === 408 || error.status === 429) {
      return true
    }

    return false
  }

  // Erro de conexao / 5xx
  return error.status === 0 || error.status >= 500
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 30, // 30 minutos
      retry: (failureCount, error) => handleQueryRetry(failureCount, error),
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      onError: handleQueryError,
      retry: false,
    },
  },
})

export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (params?: Record<string, unknown>) => [...queryKeys.posts.lists(), params] as const,
    feed: (params?: Record<string, unknown>) => [...queryKeys.posts.all, 'feed', params] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.posts.details(), id] as const,
    byAuthor: (authorId: string, params?: Record<string, unknown>) =>
      [...queryKeys.posts.all, 'author', authorId, params] as const,
    search: (query: string, params?: Record<string, unknown>) =>
      [...queryKeys.posts.all, 'search', query, params] as const,
  },
  users: {
    all: ['users'] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    followers: (userId: string, params?: Record<string, unknown>) =>
      [...queryKeys.users.all, 'followers', userId, params] as const,
    following: (userId: string, params?: Record<string, unknown>) =>
      [...queryKeys.users.all, 'following', userId, params] as const,
    search: (query: string, params?: Record<string, unknown>) =>
      [...queryKeys.users.all, 'search', query, params] as const,
  },
} as const
