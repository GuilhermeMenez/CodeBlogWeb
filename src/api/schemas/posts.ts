import { z } from 'zod'

// ======= Entity Schema =======

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string().optional(),
  authorId: z.string(),
  authorName: z.string(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// ======= Input Schemas (derived) =======

export const createPostSchema = postSchema.pick({
  title: true,
  content: true,
  excerpt: true,
  tags: true,
})

export const updatePostSchema = createPostSchema.partial()

// ======= Inferred Types =======

export type Post = z.infer<typeof postSchema>
export type CreatePostDTO = z.infer<typeof createPostSchema>
export type UpdatePostDTO = z.infer<typeof updatePostSchema>
