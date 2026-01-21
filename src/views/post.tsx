export function PostView({ post }: { post: { title: string; body: string; html?: string } }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html ?? post.body }} />
    </article>
  )
}
