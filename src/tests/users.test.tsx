import { fetchUserById, fetchUsers } from "../api/users"

it('fetches 500 users', async () => {
  const users = await fetchUsers()
  expect(users.length).toBe(500)
})

it('fetches by id', async () => {
  const user = await fetchUserById(3)
  expect(user?.id).toBe(3)
})