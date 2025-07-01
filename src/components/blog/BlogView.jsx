import { useParams } from "react-router-dom";

const mockPosts = [
  {
    id: 1,
    title: "Introducing BoardBid",
    content: "<p>Welcome to our new blog!</p>",
    date: "2023-08-01",
    coverImage: "https://placekitten.com/800/400",
    bgColor: "#ffffff",
  },
  {
    id: 2,
    title: "How It Works",
    content: "<p>A quick look at how to use BoardBid.ai</p>",
    date: "2023-08-10",
    coverImage: "https://placekitten.com/800/401",
    bgColor: "#ffffff",
  },
];

export default function BlogView() {
  const { id } = useParams();
  const post = mockPosts.find((p) => p.id.toString() === id);

  if (!post) {
    return <p className="text-center p-4">Post not found.</p>;
  }

  return (
    <article
      className="max-w-3xl mx-auto p-4 space-y-4"
      style={{ backgroundColor: post.bgColor }}
    >
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover" />
      )}
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-muted-foreground">{post.date}</p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
