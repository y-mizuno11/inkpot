import { db } from "../lib/db"
import { config } from "../config"
import { verifyPassword } from "./password"

export async function login(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } })
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    throw new Error("invalid credentials")
  }
  return createSession(user.id)
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + config.session.ttlMinutes * 60_000)
  return db.session.create({ data: { userId, expiresAt } })
}

export async function requireLogin(sessionId: string | undefined) {
  const session = sessionId ? await db.session.findUnique({ where: { id: sessionId }, include: { user: true } }) : null
  if (!session) throw new Error("login required")
  return session.user
}
