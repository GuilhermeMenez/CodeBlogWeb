import type { Post } from '@/api/schemas/posts'

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React 19',
    content: `React 19 introduces several groundbreaking features that simplify component development. 
    
The removal of forwardRef is one of the most welcome changes, making ref handling more intuitive. Components can now receive refs as regular props, reducing boilerplate code significantly.

## Key Features

- **Actions**: Simplified async state management
- **use() hook**: Native promise handling in components
- **Document Metadata**: Built-in support for title and meta tags
- **Asset Loading**: Improved preloading capabilities

This version marks a significant step forward in React's evolution.`,
    excerpt: 'Learn about the new features in React 19 and how they simplify development',
    authorId: '1',
    authorName: 'John Doe',
    tags: ['react', 'javascript', 'frontend'],
    createdAt: '2025-12-01T10:00:00.000Z',
    updatedAt: '2025-12-01T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'TypeScript Best Practices in 2026',
    content: `TypeScript continues to evolve with stricter type checking and better inference.

## Essential Practices

1. **Use strict mode** - Always enable strict in tsconfig
2. **Avoid any** - Prefer unknown when type is uncertain
3. **Const assertions** - Use as const for literal types
4. **Discriminated unions** - Model complex state effectively

These practices will help maintain a healthy codebase.`,
    excerpt: 'Modern TypeScript patterns and practices for clean, maintainable code',
    authorId: '2',
    authorName: 'Jane Smith',
    tags: ['typescript', 'javascript', 'best-practices'],
    createdAt: '2025-11-28T14:30:00.000Z',
    updatedAt: '2025-11-29T09:00:00.000Z',
  },
  {
    id: '3',
    title: 'Building APIs with Node.js and Fastify',
    content: `Fastify has become the go-to framework for high-performance Node.js APIs.

## Why Fastify?

- **Performance**: One of the fastest Node.js frameworks
- **Schema validation**: Built-in JSON Schema support
- **Plugin system**: Highly extensible architecture
- **TypeScript**: First-class TypeScript support

Let's build a simple API together.`,
    excerpt: 'A comprehensive guide to building fast APIs with Fastify',
    authorId: '3',
    authorName: 'Bob Wilson',
    tags: ['nodejs', 'fastify', 'backend', 'api'],
    createdAt: '2025-11-25T08:15:00.000Z',
    updatedAt: '2025-11-25T08:15:00.000Z',
  },
  {
    id: '4',
    title: 'Docker for Frontend Developers',
    content: `Docker isn't just for backend developers. Frontend teams can benefit greatly from containerization.

## Benefits

- **Consistent environments** - No more "works on my machine"
- **Easy onboarding** - New team members start quickly
- **CI/CD integration** - Streamlined deployment pipelines
- **Microservices** - Support complex architectures

Start containerizing your frontend apps today.`,
    excerpt: 'How frontend developers can leverage Docker for better workflows',
    authorId: '4',
    authorName: 'Alice Johnson',
    tags: ['docker', 'devops', 'frontend'],
    createdAt: '2025-11-20T16:45:00.000Z',
    updatedAt: '2025-11-21T10:30:00.000Z',
  },
  {
    id: '5',
    title: 'React Native vs Flutter in 2026',
    content: `The mobile development landscape continues to evolve with both React Native and Flutter gaining features.

## React Native

- JavaScript/TypeScript ecosystem
- Large community
- New Architecture improvements

## Flutter

- Dart language
- Excellent performance
- Beautiful UI out of the box

Both are excellent choices depending on your team's expertise.`,
    excerpt: 'A comparison of the two leading cross-platform mobile frameworks',
    authorId: '5',
    authorName: 'Charlie Brown',
    tags: ['react-native', 'flutter', 'mobile'],
    createdAt: '2025-11-15T12:00:00.000Z',
    updatedAt: '2025-11-15T12:00:00.000Z',
  },
  {
    id: '6',
    title: 'State Management with TanStack Query',
    content: `TanStack Query (formerly React Query) has revolutionized how we handle server state in React applications.

## Core Concepts

- **Queries**: Fetch and cache data automatically
- **Mutations**: Handle create, update, delete operations
- **Invalidation**: Keep data fresh and synchronized
- **Optimistic updates**: Improve perceived performance

Say goodbye to complex Redux setups for API data.`,
    excerpt: 'Mastering server state management with TanStack Query',
    authorId: '1',
    authorName: 'John Doe',
    tags: ['react', 'tanstack-query', 'state-management'],
    createdAt: '2025-11-10T09:30:00.000Z',
    updatedAt: '2025-11-11T14:00:00.000Z',
  },
  {
    id: '7',
    title: 'CSS-in-JS vs Tailwind CSS',
    content: `The styling debate continues, but both approaches have their merits.

## CSS-in-JS

- Component-scoped styles
- Dynamic styling based on props
- TypeScript integration

## Tailwind CSS

- Utility-first approach
- Smaller bundle sizes
- Rapid prototyping

Choose based on your project needs and team preferences.`,
    excerpt: 'Comparing modern CSS approaches for React applications',
    authorId: '2',
    authorName: 'Jane Smith',
    tags: ['css', 'tailwind', 'frontend', 'styling'],
    createdAt: '2025-11-05T11:15:00.000Z',
    updatedAt: '2025-11-05T11:15:00.000Z',
  },
  {
    id: '8',
    title: 'Testing React Applications',
    content: `A comprehensive testing strategy is essential for maintainable React applications.

## Testing Pyramid

1. **Unit Tests**: Test individual functions and hooks
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete user flows

## Tools

- Vitest for unit/integration tests
- Testing Library for component testing
- Playwright for E2E testing

Invest in testing for long-term success.`,
    excerpt: 'A complete guide to testing React apps with modern tools',
    authorId: '3',
    authorName: 'Bob Wilson',
    tags: ['testing', 'react', 'vitest', 'playwright'],
    createdAt: '2025-10-30T15:00:00.000Z',
    updatedAt: '2025-10-31T08:45:00.000Z',
  },
]

export function findPostById(id: string): Post | undefined {
  return mockPosts.find((p) => p.id === id)
}

export function filterPostsByAuthor(authorId: string): Post[] {
  return mockPosts.filter((p) => p.authorId === authorId)
}

export function searchPosts(query: string): Post[] {
  const lowerQuery = query.toLowerCase()
  return mockPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.content.toLowerCase().includes(lowerQuery) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )
}
