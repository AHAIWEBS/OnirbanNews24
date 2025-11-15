const breakingNews = [
  "জাতীয় বাজেট ২০২৫: উন্নয়ন প্রকল্পে বরাদ্দ বৃদ্ধি",
  "বিশ্বকাপ ক্রিকেট: বাংলাদেশের দুর্দান্ত জয়",
  "ঢাকা-চট্টগ্রাম মহাসড়কে নতুন টোল প্লাজা",
  "প্রবাসী আয়ে রেকর্ড বৃদ্ধি",
  "সংসদে গুরুত্বপূর্ণ বিল পাস",
];

const BreakingNewsTicker = () => {
  return (
    <div className="bg-destructive text-destructive-foreground py-2 overflow-hidden">
      <div className="container mx-auto flex items-center gap-4">
        <span className="font-bold text-sm whitespace-nowrap flex-shrink-0 px-4 py-1 bg-background text-destructive rounded">
          ব্রেকিং নিউজ
        </span>
        <div className="flex-1 overflow-hidden">
          <div className="animate-scroll-left flex gap-8">
            {[...breakingNews, ...breakingNews].map((news, index) => (
              <span
                key={index}
                className="text-sm whitespace-nowrap inline-block"
              >
                • {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
