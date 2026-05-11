import { sendMail } from "../../lib/mail"

export async function send(event: string, payload: { title: string; slug: string }) {
  await sendMail({ subject: `[Inkpot] ${payload.title} が公開されました`, body: `/posts/${payload.slug}` })
}
