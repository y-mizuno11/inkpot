import { estimateReadingTime } from "../services/reading-time";

export function PostView({ post }: { post: { title: string; body: string; html?: string } }) {
  const minutes = estimateReadingTime(post.body);
  return (
    <article>
      <h1>{post.title}</h1>
      <p class="reading-time">この記事は約 {minutes} 分で読めます</p>
      <div dangerouslySetInnerHTML={{ __html: post.html ?? post.body }} />
    </article>
  );
}
