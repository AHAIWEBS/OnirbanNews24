const bangladeshPosts = [
  {
    id: 1,
    title: "অর্থনৈতিক উন্নয়নে নতুন মাইলফলক অর্জন",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    isFeatured: true,
  },
  { id: 2, title: "ঢাকায় নতুন মেট্রো লাইন চালু", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=200&h=150&fit=crop" },
  { id: 3, title: "শিক্ষা খাতে বড় বাজেট বরাদ্দ", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=150&fit=crop" },
  { id: 4, title: "কৃষি উৎপাদনে নতুন রেকর্ড", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&h=150&fit=crop" },
  { id: 5, title: "স্বাস্থ্য সেবায় ডিজিটাল রূপান্তর", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=150&fit=crop" },
  { id: 6, title: "তথ্য প্রযুক্তি খাতে বিনিয়োগ বৃদ্ধি", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=150&fit=crop" },
  { id: 7, title: "পরিবেশ সংরক্ষণে নতুন আইন", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=150&fit=crop" },
  { id: 8, title: "যুব উদ্যোক্তা উন্নয়ন কর্মসূচি", image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=200&h=150&fit=crop" },
  { id: 9, title: "নারী ক্ষমতায়নে নতুন পদক্ষেপ", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=150&fit=crop" },
  { id: 10, title: "গ্রামীণ উন্নয়নে বিশেষ প্রকল্প", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&h=150&fit=crop" },
  { id: 11, title: "পর্যটন শিল্পে নতুন সম্ভাবনা", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&h=150&fit=crop" },
];

const BangladeshSection = () => {
  const featured = bangladeshPosts[0];
  const headlines = bangladeshPosts.slice(1);

  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-primary" />
        <h2 className="text-2xl font-bold">🇧🇩 বাংলাদেশ</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured Post */}
        <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white leading-tight">
                {featured.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Headlines Grid */}
        <div className="space-y-3">
          {headlines.map((post) => (
            <div
              key={post.id}
              className="flex gap-3 bg-card rounded-lg p-3 border border-border hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 flex items-center">
                <h4 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BangladeshSection;
