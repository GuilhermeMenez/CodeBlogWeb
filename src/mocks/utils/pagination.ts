import type { PaginatedResponse, PaginationParams } from '@/api/schemas/common'

export function paginate<T>(items: T[], params?: PaginationParams): PaginatedResponse<T> {
  const page = params?.page ?? 1
  const limit = params?.limit ?? 10
  const start = (page - 1) * limit
  const end = start + limit

  return {
    data: items.slice(start, end),
    total: items.length,
    page,
    limit,
  }
}

export function extractPaginationParams(url: URL): PaginationParams {
  return {
    page: Number(url.searchParams.get('page')) || 1,
    limit: Number(url.searchParams.get('limit')) || 10,
  }
}
