import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import mockPosts from "./mockPosts";

export default function BlogList() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto grid gap-4 p-4">
      {mockPosts.map((post) => (
        <Card
          key={post.id}
          onClick={() => navigate(`/blog/${post.id}`)}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
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
