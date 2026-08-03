import { estimateReadingTime } from "../services/reading-time";

export function PostView({ post }: { post: { title: string; body: string; html?: string } }) {
  const minutes = estimateReadingTime(post.body);
  return (
    <article>
      <h1>{post.title}</h1>
      <p class="reading-time">約 {minutes} 分</p>
      <div dangerouslySetInnerHTML={{ __html: post.html ?? post.body }} />
    </article>
  );
}
