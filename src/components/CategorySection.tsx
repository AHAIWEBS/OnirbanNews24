interface Post {
  id: number;
  title: string;
  image: string;
  category?: string;
  time?: string;
}

interface CategorySectionProps {
  title: string;
  posts: Post[];
  variant?: "default" | "grid" | "list" | "mega";
}

const CategorySection = ({ title, posts, variant = "default" }: CategorySectionProps) => {
  if (variant === "mega") {
    return (
      <section className="py-8">
        <div className="flex items-center gap-3 mb-6 relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary" />
          <h2 className="text-2xl font-bold ml-4 relative">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Featured Post */}
          <div className="md:col-span-2 bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {posts[0].title}
                </h3>
                {posts[0].time && (
                  <p className="text-white/80 text-sm mt-2">{posts[0].time}</p>
                )}
              </div>
            </div>
          </div>

          {/* Side Posts */}
          <div className="space-y-4">
            {posts.slice(1, 4).map((post) => (
              <div
                key={post.id}
                className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-sm font-bold text-white leading-tight line-clamp-2">
                      {post.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {posts.slice(4).map((post) => (
            <div
              key={post.id}
              className="flex gap-3 bg-card rounded-lg p-3 border border-border hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="relative w-24 h-20 flex-shrink-0 rounded overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                {post.time && (
                  <p className="text-xs text-muted-foreground mt-1">{post.time}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (variant === "grid") {
    return (
      <section className="py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-primary" />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 text-accent text-4xl opacity-20 leading-none">
                  "
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold leading-snug group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                {post.time && (
                  <p className="text-xs text-muted-foreground mt-2">{post.time}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (variant === "list") {
    return (
      <section className="py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-primary" />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Post */}
          <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 text-accent text-6xl opacity-30 leading-none">
                "
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white leading-tight">
                  {posts[0].title}
                </h3>
              </div>
            </div>
          </div>

          {/* List Posts */}
          <div className="space-y-4">
            {posts.slice(1).map((post) => (
              <div
                key={post.id}
                className="flex gap-4 bg-card rounded-lg p-4 border border-border hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h4>
                  {post.time && (
                    <p className="text-xs text-muted-foreground mt-2">{post.time}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-primary" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {post.category && (
                <span className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                  {post.category}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold leading-snug group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              {post.time && (
                <p className="text-xs text-muted-foreground mt-2">{post.time}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
