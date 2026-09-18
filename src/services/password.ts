// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

import { compare } from "bcryptjs";

export async function verifyPassword(password: string, hash: string) {
  return compare(password, hash);
}
