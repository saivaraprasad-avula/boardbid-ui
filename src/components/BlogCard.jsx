import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <article className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <img
          alt={post.title}
          src={post.imageUrl}
          className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2 dark:bg-gray-800"
        />
        <div className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10 dark:inset-ring-white/10" />
      </div>
      <div className="flex max-w-xl grow flex-col justify-between">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={post.datetime} className="text-gray-500 dark:text-gray-400">
            {post.date}
          </time>
          <Link
            to={post.category.href}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {post.category.title}
          </Link>
        </div>
        <div className="group relative grow">
          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
            <Link to={post.href}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-400">{post.description}</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
          {post.author.imageUrl && (
            <img
              alt=""
              src={post.author.imageUrl}
              className="size-10 rounded-full bg-gray-100 dark:bg-gray-800"
            />
          )}
          <div className="text-sm/6">
            <p className="font-semibold text-gray-900 dark:text-white">
              <Link to={post.author.href}>
                <span className="absolute inset-0" />
                {post.author.name}
              </Link>
            </p>
            {post.author.role && (
              <p className="text-gray-600 dark:text-gray-400">{post.author.role}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
