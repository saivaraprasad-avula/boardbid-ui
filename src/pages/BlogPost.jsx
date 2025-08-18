import { useParams } from 'react-router-dom';
import { posts } from '../data/blogs';
import HeroHeader from '../components/HeroHeader';
import Footer from '../components/Footer';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <HeroHeader />
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Blog not found</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeroHeader />
      <article
        className="
          mx-auto max-w-3xl
          px-6 sm:px-6
          pt-[84px] sm:pt-[96px] lg:pt-[104px]
          pb-12 sm:pb-16
          prose prose-lg dark:prose-invert
        "
      >
        <h1 className="mt-0 text-3xl sm:text-4xl font-bold">{post.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 text-sm text-gray-600 dark:text-gray-400">
          <time dateTime={post.datetime}>{post.date}</time>
          <span>·</span>
          <span>{post.author.name}</span>
        </div>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="mt-6 sm:mt-8 w-full rounded-xl object-cover mb-6"
          />
        )}

        <div className="space-y-6 sm:space-y-8">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed text-gray-800 dark:text-gray-200">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
      <Footer />
    </>
  );
}