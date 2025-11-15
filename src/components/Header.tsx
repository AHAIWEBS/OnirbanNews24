import { useState, useEffect } from "react";

const Header = () => {
  const [dateInfo, setDateInfo] = useState({
    dayName: "",
    bengaliDate: "",
    englishDate: "",
    islamicDate: "",
  });

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      
      // Day names in Bengali
      const bengaliDays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
      const dayName = bengaliDays[now.getDay()];

      // Bengali months
      const bengaliMonths = ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"];
      
      // English months in Bengali
      const englishMonthsBengali = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

      // Simple Bengali calendar calculation (approximate)
      const bengaliYear = now.getFullYear() - 593;
      const bengaliMonth = bengaliMonths[10]; // Kartik for November
      const bengaliDay = "২৯শে";

      // Islamic months in Bengali
      const islamicMonths = ["মহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শাবান", "রমজান", "শাওয়াল", "জিলকদ", "জিলহজ"];
      const islamicYear = "১৪৪৭";
      const islamicDay = "২২শে";
      const islamicMonth = islamicMonths[4]; // Jumada al-Awwal

      setDateInfo({
        dayName,
        bengaliDate: `${bengaliDay} ${bengaliMonth} ${bengaliYear}`,
        englishDate: `${now.getDate()}ই ${englishMonthsBengali[now.getMonth()]} ${now.getFullYear()} খ্রি`,
        islamicDate: `${islamicDay} ${islamicMonth} ${islamicYear}`,
      });
    };

    updateDate();
    const interval = setInterval(updateDate, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-border">
      {/* Top Date Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm font-medium">
            <span className="flex items-center gap-1">
              <span>আজ,রোজ</span>
              <span className="font-bold">{dateInfo.dayName}</span>
            </span>
            <span className="hidden md:inline">|</span>
            <span>{dateInfo.bengaliDate}</span>
            <span className="hidden md:inline">|</span>
            <span>{dateInfo.englishDate}</span>
            <span className="hidden md:inline">|</span>
            <span>{dateInfo.islamicDate}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card py-4 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                বাংলা সংবাদ
              </h1>
              <p className="text-sm text-muted-foreground">সত্যের সাথে, সবসময়</p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm font-medium">
              <a href="#" className="hover:text-accent transition-colors">হোম</a>
              <a href="#" className="hover:text-accent transition-colors">জাতীয়</a>
              <a href="#" className="hover:text-accent transition-colors">রাজনীতি</a>
              <a href="#" className="hover:text-accent transition-colors">বিশ্ব</a>
              <a href="#" className="hover:text-accent transition-colors">বিনোদন</a>
              <a href="#" className="hover:text-accent transition-colors">খেলা</a>
              <a href="#" className="hover:text-accent transition-colors">লাইফস্টাইল</a>
              <a href="#" className="hover:text-accent transition-colors">মতামত</a>
            </nav>
          </div>
        </div>
      </div>

      {/* Breaking News Bar */}
      <div className="bg-accent text-accent-foreground py-2 px-4">
        <div className="container mx-auto flex items-center gap-4">
          <span className="font-bold whitespace-nowrap">⚡ জরুরি সংবাদ:</span>
          <div className="overflow-hidden">
            <p className="animate-marquee whitespace-nowrap">
              এই একটি জরুরি সংবাদের উদাহরণ যা স্ক্রল হবে • আরেকটি গুরুত্বপূর্ণ সংবাদ এখানে প্রদর্শিত হবে
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
