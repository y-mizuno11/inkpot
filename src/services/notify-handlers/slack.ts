export async function send(event: string, payload: { title: string; slug: string }) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, { method: "POST", body: JSON.stringify({ text: `${payload.title} が公開されました` }) });
}
