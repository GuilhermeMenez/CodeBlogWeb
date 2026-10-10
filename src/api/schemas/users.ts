import { z } from 'zod'

// ======= Entity Schemas =======

export const userProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  followersCount: z.number(),
  followingCount: z.number(),
  createdAt: z.string(),
})

export const followResponseSchema = z.object({
  success: z.boolean(),
  followersCount: z.number(),
})

// ======= Input Schemas (derived) =======

export const updateProfileSchema = userProfileSchema
  .pick({
    name: true,
    bio: true,
    avatar: true,
  })
  .partial()

// ======= Inferred Types =======

export type UserProfile = z.infer<typeof userProfileSchema>
export type FollowResponse = z.infer<typeof followResponseSchema>
export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>
