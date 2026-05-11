export async function sendMail(message: { subject: string; body: string }) {
  console.info("mail", message.subject)
}
