const posts = [
    {
      id: 1,
      title: 'How to Use Different Types of Digital Billboards',
      href: '#',
      description:
        'Digital billboards are a powerful tool for advertising, but they come in various types. Understanding how to use each type effectively can maximize your advertising impact.',
      imageUrl:'https://ik.imagekit.io/boardbid/Blog%20Creative%20city.webp',
      date: 'Jul 21, 2025',
      datetime: '2025-07-21',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Jamie Rush',
        role: '',
        href: '#',
        imageUrl:
          '',
      },
    },
    {
      id: 2,
      title: 'Advantages of Digital Out Of Home Advertising',
      href: '#',
      description: 'Digital Out Of Home (DOOH) advertising offers numerous advantages over traditional advertising methods. From real-time updates to targeted messaging, learn how DOOH can enhance your marketing strategy.',
      imageUrl:'https://ik.imagekit.io/boardbid/adv%20creative.png',
      date: 'Jul 28, 2025',
      datetime: '2025-07-28',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Kavya Mohana Adusumilli',
        role: '',
        href: '#',
        imageUrl:
          '',
      },
    },
    {
      id: 3,
      title: 'Benefits of Programmatic DOOH Advertising',
      href: '#',
      description:
        'Programmatic DOOH advertising revolutionizes how brands reach their audience. By automating the buying process, it allows for more efficient and targeted advertising campaigns.',
      imageUrl:
        'https://ik.imagekit.io/boardbid/p2.webp',
      date: 'Aug 04, 2025',
      datetime: '2025-08-04',
      category: { title: 'Technology', href: '#' },
      author: {
        name: 'Sai Vara Prasad Avula',
        role: '',
        href: '#',
        imageUrl:
          '',
      },
    },
  ]
  
  export default function Example() {
    return (
        <div className="bg-white pt-12 sm:pt-20 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              From the blog
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                  <img
                    alt=""
                    src={post.imageUrl}
                    className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                  />
                  <div className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10" />
                </div>
                <div className="flex max-w-xl grow flex-col justify-between">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time>
                    <a
                      href={post.category.href}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category.title}
                    </a>
                  </div>
                  <div className="group relative grow">
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                      <a href={post.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                    <div className="text-sm/6">
                      <p className="font-semibold text-gray-900">
                        <a href={post.author.href}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  