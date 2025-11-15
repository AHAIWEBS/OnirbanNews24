const stories = [
  {
    id: 1,
    title: "রাজধানীতে নতুন মেট্রোরেল লাইনের উদ্বোধন করলেন প্রধানমন্ত্রী",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
    category: "জাতীয়",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 2,
    title: "শিক্ষা খাতে বরাদ্দ বৃদ্ধির ঘোষণা, নতুন বিদ্যালয় নির্মাণ",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    category: "শিক্ষা",
    time: "৩ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "জলবায়ু সম্মেলনে বাংলাদেশের গুরুত্বপূর্ণ ভূমিকা স্বীকৃত",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    category: "পরিবেশ",
    time: "৫ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "স্বাস্থ্য সেবায় নতুন ডিজিটাল উদ্যোগ চালু হচ্ছে সারাদেশে",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    category: "স্বাস্থ্য",
    time: "৬ ঘণ্টা আগে",
  },
  {
    id: 5,
    title: "তথ্য প্রযুক্তি খাতে নতুন বিনিয়োগের সুযোগ",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    category: "প্রযুক্তি",
    time: "৭ ঘণ্টা আগে",
  },
  {
    id: 6,
    title: "কৃষি উৎপাদন বৃদ্ধিতে নতুন প্রকল্প অনুমোদন",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop",
    category: "কৃষি",
    time: "৮ ঘণ্টা আগে",
  },
];

const TopStoriesSection = () => {
  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-accent" />
        <h2 className="text-2xl font-bold">টপ স্টোরি</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                {story.category}
              </div>
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold leading-snug group-hover:text-accent transition-colors line-clamp-2">
                {story.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <span>🕐</span> {story.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopStoriesSection;
