// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

export async function alertOps(message: string, error: unknown) {
  console.error(message, error);
  await fetch(process.env.OPS_WEBHOOK_URL ?? "", { method: "POST", body: JSON.stringify({ text: message }) });
}
