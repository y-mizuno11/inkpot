export async function send(event: string, payload: { title: string; slug: string }) {
  const url = process.env.NOTIFY_SLACK_WEBHOOK;
  if (!url) return;
  await fetch(url, { method: "POST", body: JSON.stringify({ text: `${payload.title} が公開されました` }) });
}
