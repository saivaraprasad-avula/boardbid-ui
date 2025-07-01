import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const mockPosts = [
  {
    id: 1,
    title: "Introducing BoardBid",
    summary: "Welcome to our new blog!",
    date: "2023-08-01",
    coverImage: "https://placekitten.com/800/400",
    bgColor: "#ffffff",
  },
  {
    id: 2,
    title: "How It Works",
    summary: "A quick look at how to use BoardBid.ai",
    date: "2023-08-10",
    coverImage: "https://placekitten.com/800/401",
    bgColor: "#ffffff",
  },
];

export default function BlogList() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto grid gap-4 p-4">
      {mockPosts.map((post) => (
        <Card
          key={post.id}
          onClick={() => navigate(`/blog/${post.id}`)}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          style={{ backgroundColor: post.bgColor }}
        >
          {post.coverImage && (
            <img src={post.coverImage} alt={post.title} className="w-full h-40 object-cover" />
          )}
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{post.date}</p>
          </CardHeader>
          <CardContent>
            <p>{post.summary}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
