export type AuthResponse = { authToken: string; createdAt: number; uid: string }

export type TUnreadMessage = {
  users?: { [k: string]: number }
  groups?: { [k: string]: number }
}
