// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

export async function sendMail(message: { subject: string; body: string }) {
  console.info("mail", message.subject);
}
