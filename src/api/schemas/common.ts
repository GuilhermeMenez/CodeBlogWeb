import { z } from 'zod'

// ======= Pagination =======

export const paginationParamsSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
})

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
  })

export type PaginationParams = z.infer<typeof paginationParamsSchema> & {
  [key: string]: unknown
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
}

// ======= API Error Response =======

export const apiErrorResponseSchema = z.object({
  message: z.string().optional(),
  code: z.string().optional(),
  details: z.record(z.string(), z.unknown()).optional(),
})

export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>
