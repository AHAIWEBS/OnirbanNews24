const stories = [
  {
    id: 1,
    title: "রাজধানীতে নতুন মেট্রোরেল লাইনের উদ্বোধন",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 2,
    title: "শিক্ষা খাতে বরাদ্দ বৃদ্ধির ঘোষণা",
    time: "৩ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "জলবায়ু সম্মেলনে বাংলাদেশের গুরুত্বপূর্ণ ভূমিকা",
    time: "৫ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "স্বাস্থ্য সেবায় নতুন ডিজিটাল উদ্যোগ",
    time: "৬ ঘণ্টা আগে",
  },
];

const TopStories = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-accent">
        টপ স্টোরি
      </h3>
      <div className="space-y-4">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="flex gap-3 group cursor-pointer"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm leading-snug group-hover:text-accent transition-colors">
                {story.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">{story.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStories;
