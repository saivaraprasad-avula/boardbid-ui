import { useParams } from 'react-router-dom';
import { posts } from '../data/blogs';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <Header staticHeader />
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Blog not found</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header staticHeader />
      <article className="mx-auto max-w-3xl px-6 py-24 prose prose-lg dark:prose-invert">
        <h1>{post.title}</h1>
        <div className="mt-4 flex items-center gap-x-4 text-sm text-gray-600 dark:text-gray-400">
          <time dateTime={post.datetime}>{post.date}</time>
          <span>\u00B7</span>
          <span>{post.author.name}</span>
        </div>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="mt-8 w-full rounded-xl object-cover"
          />
        )}
        {post.content.map((paragraph, idx) => (
          <p key={idx} className="mt-8">
            {paragraph}
          </p>
        ))}
      </article>
      <Footer />
    </>
  );
}
