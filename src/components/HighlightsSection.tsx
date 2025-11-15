const highlights = [
  {
    id: 1,
    title: "ডিজিটাল বাংলাদেশের স্বপ্ন এখন বাস্তব",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    title: "শিক্ষায় প্রযুক্তির ব্যবহার বৃদ্ধি পাচ্ছে",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop",
  },
];

const HighlightsSection = () => {
  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-accent" />
        <h2 className="text-2xl font-bold">হাইলাইটস</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Side Highlight */}
        <div className="space-y-4">
          {highlights.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="relative">
                <div className="relative overflow-hidden rounded-full w-24 h-24 mx-auto mt-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-2 left-2 text-accent text-6xl opacity-20 leading-none">
                  "
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-center leading-snug group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Center Main Highlight */}
        <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer relative">
          <div className="relative aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=750&fit=crop"
              alt="Main Highlight"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 text-accent text-8xl opacity-30 leading-none">
              "
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white leading-tight">
                অর্থনৈতিক উন্নয়নে নতুন মাত্রা যোগ হচ্ছে
              </h3>
              <p className="text-white/80 mt-2 text-sm">
                দেশের অর্থনীতি ক্রমাগত এগিয়ে যাচ্ছে নতুন নতুন সম্ভাবনার দিকে...
              </p>
            </div>
          </div>
        </div>

        {/* Side Highlight */}
        <div className="space-y-4">
          {highlights.slice().reverse().map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="relative">
                <div className="relative overflow-hidden rounded-full w-24 h-24 mx-auto mt-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-2 right-2 text-accent text-6xl opacity-20 leading-none">
                  "
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-center leading-snug group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
