import { User } from '@/types/User'
import users from '../mock/users.json'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export async function fetchUsers(): Promise<User[]> {
  await delay(400)
  return users as User[]
}

export async function fetchUserById(id: number): Promise<User | undefined> {
  await delay(200)
  return users.find(u => u.id === id) as User | undefined
}

const KEY = 'lendsqr:user-details-cache'

type Cache = Record<string, User>
function readCache(): Cache {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
}
function writeCache(c: Cache) { localStorage.setItem(KEY, JSON.stringify(c)) }

export function cacheUserDetails(user: User) {
  const c = readCache()
  c[String(user.id)] = user
  writeCache(c)
}

export function getCachedUserDetails(id: number): User | undefined {
  const c = readCache()
  return c[String(id)]
}