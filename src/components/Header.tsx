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
              <a href="/" className="hover:text-accent transition-colors">হোম</a>
              <a href="/auth" className="hover:text-accent transition-colors">লগইন</a>
              <a href="/admin" className="hover:text-accent transition-colors">অ্যাডমিন</a>
              <div className="relative group">
                <button className="hover:text-accent transition-colors">
                  🇧🇩 বাংলাদেশ ▾
                </button>
                <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-4 hidden group-hover:block min-w-[600px] z-50">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-bold mb-2 text-primary">ঢাকা</h4>
                      <ul className="space-y-1 text-xs">
                        <li><a href="#" className="hover:text-accent">ঢাকা মেট্রো</a></li>
                        <li><a href="#" className="hover:text-accent">গাজীপুর</a></li>
                        <li><a href="#" className="hover:text-accent">নারায়ণগঞ্জ</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-primary">চট্টগ্রাম</h4>
                      <ul className="space-y-1 text-xs">
                        <li><a href="#" className="hover:text-accent">চট্টগ্রাম শহর</a></li>
                        <li><a href="#" className="hover:text-accent">কক্সবাজার</a></li>
                        <li><a href="#" className="hover:text-accent">রাঙ্গামাটি</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-primary">রাজশাহী</h4>
                      <ul className="space-y-1 text-xs">
                        <li><a href="#" className="hover:text-accent">রাজশাহী শহর</a></li>
                        <li><a href="#" className="hover:text-accent">নাটোর</a></li>
                        <li><a href="#" className="hover:text-accent">পাবনা</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-primary">খুলনা</h4>
                      <ul className="space-y-1 text-xs">
                        <li><a href="#" className="hover:text-accent">খুলনা শহর</a></li>
                        <li><a href="#" className="hover:text-accent">যশোর</a></li>
                        <li><a href="#" className="hover:text-accent">সাতক্ষীরা</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#" className="hover:text-accent transition-colors">জাতীয়</a>
              <a href="#" className="hover:text-accent transition-colors">রাজনীতি</a>
              <div className="relative group">
                <button className="hover:text-accent transition-colors">🌍 বিশ্ব ▾</button>
                <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-4 hidden group-hover:block min-w-[700px] z-50">
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <h4 className="font-bold mb-2 text-primary">এশিয়া</h4>
                      <ul className="space-y-1 text-xs">
                        <li><a href="#" className="hover:text-accent">ভারত</a></li>
                        <li><a href="#" className="hover:text-accent">পাকিস্তান</a></li>
                        <li><a href="#" className="hover:text-accent">চীন</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-primary">ইউরোপ</h4>
                      <ul className="space-y-1 text-xs">
                        <li><a href="#" className="hover:text-accent">যুক্তরাজ্য</a></li>
                        <li><a href="#" className="hover:text-accent">ফ্রান্স</a></li>
                        <li><a href="#" className="hover:text-accent">জার্মানি</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-primary">আমেরিকা</h4>
                      <ul className="space-y-1 text-xs">
                        <li><a href="#" className="hover:text-accent">যুক্তরাষ্ট্র</a></li>
                        <li><a href="#" className="hover:text-accent">কানাডা</a></li>
                        <li><a href="#" className="hover:text-accent">ব্রাজিল</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-primary">মধ্যপ্রাচ্য</h4>
                      <ul className="space-y-1 text-xs">
                        <li><a href="#" className="hover:text-accent">সৌদি আরব</a></li>
                        <li><a href="#" className="hover:text-accent">ইরান</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-primary">আফ্রিকা</h4>
                      <ul className="space-y-1 text-xs">
                        <li><a href="#" className="hover:text-accent">মিশর</a></li>
                        <li><a href="#" className="hover:text-accent">দক্ষিণ আফ্রিকা</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#" className="hover:text-accent entertainment-slide-in transition-colors">বিনোদন</a>
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
