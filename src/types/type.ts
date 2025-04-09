export type TAuth = {
  id: string
  email: string | undefined
  name: string | undefined
  role: {
    id: string
    name: string
    groupId: string
  }
}
