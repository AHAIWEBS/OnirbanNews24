const videos = [
  {
    id: 1,
    title: "প্রধানমন্ত্রীর সাংবাদিক সম্মেলন",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    duration: "১৫:২৩",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 2,
    title: "ঢাকায় নতুন মেট্রো রেল উদ্বোধন",
    thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    duration: "১০:৪৫",
    time: "৩ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "বিশ্বকাপ ম্যাচের হাইলাইটস",
    thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    duration: "২৩:১২",
    time: "৫ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "পদ্মা সেতুর সাম্প্রতিক দৃশ্য",
    thumbnail: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=600&h=400&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    duration: "০৮:৩৪",
    time: "৭ ঘণ্টা আগে",
  },
];

const VideoSection = () => {
  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-primary" />
        <h2 className="text-2xl font-bold">ভিডিও</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-8 h-8 text-primary-foreground ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                {video.duration}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg leading-snug group-hover:text-accent transition-colors mb-2">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground">{video.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
