import { authHandlers } from './auth'
import { postsHandlers } from './posts'
import { usersHandlers } from './users'

export const handlers = [...authHandlers, ...postsHandlers, ...usersHandlers]
