const divisions = [
  {
    name: "ঢাকা",
    districts: ["ঢাকা", "গাজীপুর", "নারায়ণগঞ্জ", "টাঙ্গাইল", "মানিকগঞ্জ"],
  },
  {
    name: "চট্টগ্রাম",
    districts: ["চট্টগ্রাম", "কক্সবাজার", "রাঙ্গামাটি", "বান্দরবান", "খাগড়াছড়ি"],
  },
  {
    name: "রাজশাহী",
    districts: ["রাজশাহী", "নাটোর", "পাবনা", "বগুড়া", "নওগাঁ"],
  },
  {
    name: "খুলনা",
    districts: ["খুলনা", "যশোর", "সাতক্ষীরা", "বাগেরহাট", "কুষ্টিয়া"],
  },
];

const bangladeshNews = [
  {
    id: 1,
    title: "ঢাকায় নতুন মেট্রো রেল লাইনের কাজ শুরু",
    division: "ঢাকা",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    time: "৩০ মিনিট আগে",
  },
  {
    id: 2,
    title: "চট্টগ্রাম বন্দরে নতুন কন্টেইনার টার্মিনাল",
    division: "চট্টগ্রাম",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "রাজশাহীতে কৃষি উৎপাদন রেকর্ড বৃদ্ধি",
    division: "রাজশাহী",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "খুলনায় পর্যটন শিল্পে নতুন সম্ভাবনা",
    division: "খুলনা",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop",
    time: "৩ ঘণ্টা আগে",
  },
];

const BangladeshSection = () => {
  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-primary" />
        <h2 className="text-2xl font-bold">বাংলাদেশ</h2>
      </div>

      {/* Divisions Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:bg-accent/80 transition-colors">
          সব বিভাগ
        </button>
        {divisions.map((division) => (
          <button
            key={division.name}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {division.name}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bangladeshNews.map((news) => (
          <div
            key={news.id}
            className="group cursor-pointer bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded text-sm font-medium">
                {news.division}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg leading-snug group-hover:text-accent transition-colors mb-2">
                {news.title}
              </h3>
              <p className="text-sm text-muted-foreground">{news.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BangladeshSection;
