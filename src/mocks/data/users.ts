import type { User, AuthResponse } from '@/api/schemas/auth'
import type { UserProfile } from '@/api/schemas/users'

export const mockUsers: UserProfile[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Full-stack developer passionate about React and TypeScript',
    avatar: 'https://i.pravatar.cc/150?u=1',
    followersCount: 120,
    followingCount: 45,
    createdAt: '2024-01-15T10:30:00.000Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    bio: 'Frontend engineer | Open source enthusiast',
    avatar: 'https://i.pravatar.cc/150?u=2',
    followersCount: 89,
    followingCount: 32,
    createdAt: '2024-02-20T14:45:00.000Z',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    bio: 'Backend developer | Node.js | Go',
    avatar: 'https://i.pravatar.cc/150?u=3',
    followersCount: 234,
    followingCount: 67,
    createdAt: '2024-03-10T09:15:00.000Z',
  },
  {
    id: '4',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    bio: 'DevOps engineer | Cloud architecture',
    avatar: 'https://i.pravatar.cc/150?u=4',
    followersCount: 156,
    followingCount: 78,
    createdAt: '2024-04-05T16:20:00.000Z',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    bio: 'Mobile developer | React Native | Flutter',
    avatar: 'https://i.pravatar.cc/150?u=5',
    followersCount: 98,
    followingCount: 54,
    createdAt: '2024-05-12T11:00:00.000Z',
  },
]

export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://i.pravatar.cc/150?u=1',
  createdAt: '2024-01-15T10:30:00.000Z',
}

export function createAuthResponse(user: User): AuthResponse {
  return {
    user,
    token: `mock-jwt-token-${user.id}-${Date.now()}`,
  }
}

export function findUserByEmail(email: string): UserProfile | undefined {
  return mockUsers.find((u) => u.email === email)
}

export function findUserById(id: string): UserProfile | undefined {
  return mockUsers.find((u) => u.id === id)
}
