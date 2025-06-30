import { useParams } from "react-router-dom";
import mockPosts from "./mockPosts";

export default function BlogView() {
  const { id } = useParams();
  const post = mockPosts.find((p) => p.id.toString() === id);

  if (!post) {
    return <p className="text-center p-4">Post not found.</p>;
  }

  return (
    <article className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-muted-foreground">{post.date}</p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
