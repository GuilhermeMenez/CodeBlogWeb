import { http, HttpResponse, delay } from 'msw'
import { mockPosts, findPostById, filterPostsByAuthor, searchPosts, currentUser } from '../data'
import { paginate, extractPaginationParams } from '../utils/pagination'
import type { CreatePostDTO, UpdatePostDTO } from '@/api/schemas/posts'

export const postsHandlers = [
  // GET /posts
  http.get('*/posts', async ({ request }) => {
    await delay(150)

    const url = new URL(request.url)
    const params = extractPaginationParams(url)

    return HttpResponse.json(paginate(mockPosts, params))
  }),

  // GET /posts/feed
  http.get('*/posts/feed', async ({ request }) => {
    await delay(200)

    const url = new URL(request.url)
    const params = extractPaginationParams(url)

    // Simulate a personalized feed (shuffled posts)
    const feedPosts = [...mockPosts].sort(() => Math.random() - 0.5)

    return HttpResponse.json(paginate(feedPosts, params))
  }),

  // GET /posts/search
  http.get('*/posts/search', async ({ request }) => {
    await delay(150)

    const url = new URL(request.url)
    const query = url.searchParams.get('q') ?? ''
    const params = extractPaginationParams(url)

    const results = searchPosts(query)

    return HttpResponse.json(paginate(results, params))
  }),

  // GET /posts/author/:authorId
  http.get('*/posts/author/:authorId', async ({ params, request }) => {
    await delay(150)

    const { authorId } = params as { authorId: string }
    const url = new URL(request.url)
    const paginationParams = extractPaginationParams(url)

    const authorPosts = filterPostsByAuthor(authorId)

    return HttpResponse.json(paginate(authorPosts, paginationParams))
  }),

  // GET /posts/:id
  http.get('*/posts/:id', async ({ params }) => {
    await delay(100)

    const { id } = params as { id: string }
    const post = findPostById(id)

    if (!post) {
      return HttpResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    return HttpResponse.json(post)
  }),

  // POST /posts
  http.post('*/posts', async ({ request }) => {
    await delay(200)

    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as CreatePostDTO

    const newPost = {
      id: crypto.randomUUID(),
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      tags: body.tags,
      authorId: currentUser.id,
      authorName: currentUser.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return HttpResponse.json(newPost, { status: 201 })
  }),

  // PUT /posts/:id
  http.put('*/posts/:id', async ({ params, request }) => {
    await delay(150)

    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params as { id: string }
    const post = findPostById(id)

    if (!post) {
      return HttpResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    // Check ownership
    if (post.authorId !== currentUser.id) {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const body = (await request.json()) as UpdatePostDTO

    const updatedPost = {
      ...post,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return HttpResponse.json(updatedPost)
  }),

  // DELETE /posts/:id
  http.delete('*/posts/:id', async ({ params, request }) => {
    await delay(100)

    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params as { id: string }
    const post = findPostById(id)

    if (!post) {
      return HttpResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    // Check ownership
    if (post.authorId !== currentUser.id) {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    return new HttpResponse(null, { status: 204 })
  }),
]
