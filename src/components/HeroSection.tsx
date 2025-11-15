import HeroSlider from "./HeroSlider";

const topStories = [
  {
    id: 1,
    title: "শিক্ষা খাতে সংস্কার: নতুন পাঠ্যক্রম চালু",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop",
    time: "১০ মিনিট আগে",
  },
  {
    id: 2,
    title: "স্বাস্থ্য সেবায় ডিজিটাল পদ্ধতি চালু",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=200&fit=crop",
    time: "২৫ মিনিট আগে",
  },
  {
    id: 3,
    title: "পরিবেশ রক্ষায় নতুন প্রকল্প ঘোষণা",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop",
    time: "৪০ মিনিট আগে",
  },
  {
    id: 4,
    title: "কৃষিতে নতুন প্রযুক্তির ব্যবহার বৃদ্ধি",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=200&fit=crop",
    time: "১ ঘণ্টা আগে",
  },
];

const HeroSection = () => {
  return (
    <section className="py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-accent" />
        <h2 className="text-2xl font-bold">প্রধান সংবাদ</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hero Slider - Takes 2 columns */}
        <div className="lg:col-span-2">
          <HeroSlider />
        </div>
        
        {/* Top Stories - Takes 1 column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-1 bg-primary" />
            <h3 className="text-xl font-bold">শীর্ষ সংবাদ</h3>
          </div>
          
          {topStories.map((story) => (
            <div
              key={story.id}
              className="group cursor-pointer flex gap-3 pb-4 border-b border-border last:border-0"
            >
              <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm leading-snug group-hover:text-accent transition-colors line-clamp-3">
                  {story.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{story.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
