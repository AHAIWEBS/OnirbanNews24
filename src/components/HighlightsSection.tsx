const highlights = [
  {
    id: 1,
    title: "ডিজিটাল বাংলাদেশের স্বপ্ন এখন বাস্তব",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=500&fit=crop",
  },
  {
    id: 2,
    title: "শিক্ষায় প্রযুক্তির ব্যবহার বৃদ্ধি পাচ্ছে",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop",
  },
  {
    id: 3,
    title: "তারকাদের নতুন চলচ্চিত্র মুক্তি পেল",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=500&fit=crop",
  },
];

const HighlightsSection = () => {
  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-accent" />
        <h2 className="text-2xl font-bold">বিনোদন</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {highlights.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Large Quotation Mark */}
              <div className="absolute top-4 left-4 text-white/30 text-7xl leading-none font-serif">
                "
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
        
        {/* Extra Entertainment Card */}
        <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=500&fit=crop"
              alt="Entertainment"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Large Quotation Mark */}
            <div className="absolute top-4 left-4 text-white/30 text-7xl leading-none font-serif">
              "
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                সঙ্গীত জগতে নতুন সুর
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
