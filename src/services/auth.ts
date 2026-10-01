// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

import { db } from "../lib/db";
import { config } from "../config";
import { AppError } from "../lib/errors";
import { verifyPassword } from "./password";

export async function login(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    throw new AppError("E4001", 401);
  }
  if (!user.emailVerifiedAt) throw new AppError("E4004", 403);
  return createSession(user.id);
}

export async function createSession(userId: number) {
  // INK-9: 編集中に切れないよう 24 時間
  const expiresAt = new Date(Date.now() + config.session.ttlMinutes * 60_000);
  return db.session.create({ data: { userId, expiresAt } });
}

export async function requireLogin(sessionId: string | undefined) {
  const session = sessionId ? await db.session.findUnique({ where: { id: sessionId }, include: { user: true } }) : null;
  if (!session || session.expiresAt < new Date()) throw new AppError("E4003", 401);
  return session.user;
}
