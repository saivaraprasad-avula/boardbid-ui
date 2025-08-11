import { useParams, Link } from "react-router-dom";

const BASE_PATH = '/boardbid-ui';

const mockPosts = [
  {
    id: 1,
    title: "Introducing BoardBid",
    content: "<p>Welcome to our new blog!</p>",
    date: "2023-08-01",
  },
  {
    id: 2,
    title: "How It Works",
    content: "<p>A quick look at how to use BoardBid.ai</p>",
    date: "2023-08-10",
  },
];

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
      <Link to={`${BASE_PATH}/`} className="text-blue-600 underline">
        Back to home
      </Link>
    </article>
  );
}
