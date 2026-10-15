import { http, HttpResponse, delay } from 'msw'
import { mockUsers, findUserById, currentUser } from '../data'
import { paginate, extractPaginationParams } from '../utils/pagination'
import type { UpdateProfileDTO } from '@/api/schemas/users'

// Simulated follow relationships
const followingMap = new Map<string, Set<string>>([
  ['1', new Set(['2', '3', '4'])],
  ['2', new Set(['1', '5'])],
  ['3', new Set(['1', '2'])],
])

export const usersHandlers = [
  // GET /users/search
  http.get('*/users/search', async ({ request }) => {
    await delay(150)

    const url = new URL(request.url)
    const query = url.searchParams.get('q')?.toLowerCase() ?? ''
    const params = extractPaginationParams(url)

    const filtered = mockUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.bio?.toLowerCase().includes(query),
    )

    return HttpResponse.json(paginate(filtered, params))
  }),

  // GET /users/:userId
  http.get('*/users/:userId', async ({ params }) => {
    await delay(100)

    const { userId } = params as { userId: string }
    const user = findUserById(userId)

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return HttpResponse.json(user)
  }),

  // PUT /users/profile
  http.put('*/users/profile', async ({ request }) => {
    await delay(150)

    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as UpdateProfileDTO
    const user = findUserById(currentUser.id)

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const updatedProfile = {
      ...user,
      ...body,
    }

    return HttpResponse.json(updatedProfile)
  }),

  // GET /users/:userId/followers
  http.get('*/users/:userId/followers', async ({ params, request }) => {
    await delay(150)

    const { userId } = params as { userId: string }
    const url = new URL(request.url)
    const paginationParams = extractPaginationParams(url)

    const user = findUserById(userId)

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Find users who follow this user
    const followers = mockUsers.filter((u) => {
      const following = followingMap.get(u.id)
      return following?.has(userId)
    })

    return HttpResponse.json(paginate(followers, paginationParams))
  }),

  // GET /users/:userId/following
  http.get('*/users/:userId/following', async ({ params, request }) => {
    await delay(150)

    const { userId } = params as { userId: string }
    const url = new URL(request.url)
    const paginationParams = extractPaginationParams(url)

    const user = findUserById(userId)

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const followingIds = followingMap.get(userId) ?? new Set()
    const following = mockUsers.filter((u) => followingIds.has(u.id))

    return HttpResponse.json(paginate(following, paginationParams))
  }),

  // POST /users/:userId/follow
  http.post('*/users/:userId/follow', async ({ params, request }) => {
    await delay(100)

    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { userId } = params as { userId: string }
    const targetUser = findUserById(userId)

    if (!targetUser) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }

    if (userId === currentUser.id) {
      return HttpResponse.json({ message: 'Cannot follow yourself' }, { status: 400 })
    }

    // Simulate adding to following
    const currentFollowing = followingMap.get(currentUser.id) ?? new Set()
    currentFollowing.add(userId)
    followingMap.set(currentUser.id, currentFollowing)

    return HttpResponse.json({
      success: true,
      followersCount: targetUser.followersCount + 1,
    })
  }),

  // DELETE /users/:userId/follow
  http.delete('*/users/:userId/follow', async ({ params, request }) => {
    await delay(100)

    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { userId } = params as { userId: string }
    const targetUser = findUserById(userId)

    if (!targetUser) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Simulate removing from following
    const currentFollowing = followingMap.get(currentUser.id)
    currentFollowing?.delete(userId)

    return HttpResponse.json({
      success: true,
      followersCount: Math.max(0, targetUser.followersCount - 1),
    })
  }),
]
