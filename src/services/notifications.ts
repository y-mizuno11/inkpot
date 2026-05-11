import { db } from "../lib/db"

type Handler = { send(event: string, payload: unknown): Promise<void> }

/** ハンドラは名前でレジストリから引く。どのハンドラが呼ばれるかは NOTIFY_CHANNELS で決まる（INK-22） */
const registry: Record<string, () => Promise<Handler>> = {
  email: () => import("./notify-handlers/email"),
  slack: () => import("./notify-handlers/slack"),
}

export async function dispatch(event: string, payload: unknown) {
  const channels = (process.env.NOTIFY_CHANNELS ?? "email").split(",").map((c) => c.trim())
  for (const name of channels) {
    const handler = await registry[name]?.()
    await handler?.send(event, payload)
  }
}
