import Header from "@/components/Header";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import HeroSection from "@/components/HeroSection";
import BangladeshSection from "@/components/BangladeshSection";
import CategorySection from "@/components/CategorySection";
import HighlightsSection from "@/components/HighlightsSection";
import DiscussedSection from "@/components/DiscussedSection";
import VideoSection from "@/components/VideoSection";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import Footer from "@/components/Footer";
import EnhancedSidebar from "@/components/EnhancedSidebar";

// জাতীয় সংবাদ
const nationalPosts = [
  {
    id: 1,
    title: "জাতীয় বাজেট ২০২৫: উন্নয়ন প্রকল্পে বরাদ্দ বৃদ্ধি",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
    category: "জাতীয়",
    time: "১৫ মিনিট আগে",
  },
  {
    id: 2,
    title: "ঢাকা-চট্টগ্রাম মহাসড়কে নতুন টোল প্লাজা",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    time: "৩০ মিনিট আগে",
  },
  {
    id: 3,
    title: "সরকারি চাকরিতে নতুন নিয়োগ বিজ্ঞপ্তি",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "প্রবাসী আয়ে রেকর্ড বৃদ্ধি",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop",
    time: "২ ঘণ্টা আগে",
  },
];

// রাজনীতি সংবাদ
const politicsPosts = [
  {
    id: 1,
    title: "সংসদে গুরুত্বপূর্ণ বিল পাস, বিরোধী দলের আপত্তি",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop",
    category: "রাজনীতি",
    time: "২০ মিনিট আগে",
  },
  {
    id: 2,
    title: "স্থানীয় সরকার নির্বাচনের তারিখ ঘোষণা",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&h=300&fit=crop",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "রাজনৈতিক দলগুলোর মধ্যে সংলাপের আহ্বান",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=400&h=300&fit=crop",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "নতুন মন্ত্রিপরিষদ সদস্যের শপথ গ্রহণ",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop",
    time: "৩ ঘণ্টা আগে",
  },
];

// বিশ্ব সংবাদ - মহাদেশ ও দেশভিত্তিক
const worldNewsPosts = [
  {
    id: 1,
    title: "ভারত: অর্থনৈতিক প্রবৃদ্ধিতে নতুন মাইলফলক",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop",
    category: "এশিয়া",
    country: "ভারত",
    time: "৩০ মিনিট আগে",
  },
  {
    id: 2,
    title: "চীন: মহাকাশ গবেষণায় নতুন সাফল্য",
    image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&h=300&fit=crop",
    category: "এশিয়া",
    country: "চীন",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "জাপান: রোবোটিক্স প্রযুক্তিতে যুগান্তকারী উন্নতি",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop",
    category: "এশিয়া",
    country: "জাপান",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "সৌদি আরব: পর্যটন খাতে বিশাল বিনিয়োগ",
    image: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=400&h=300&fit=crop",
    category: "এশিয়া",
    country: "সৌদি আরব",
    time: "৩ ঘণ্টা আগে",
  },
  {
    id: 5,
    title: "জার্মানি: নবায়নযোগ্য শক্তিতে নতুন রেকর্ড",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
    category: "ইউরোপ",
    country: "জার্মানি",
    time: "৪ ঘণ্টা আগে",
  },
  {
    id: 6,
    title: "ফ্রান্স: জলবায়ু পরিবর্তন সম্মেলন শুরু",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
    category: "ইউরোপ",
    country: "ফ্রান্স",
    time: "৫ ঘণ্টা আগে",
  },
  {
    id: 7,
    title: "যুক্তরাজ্য: শিক্ষা ব্যবস্থায় সংস্কার",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
    category: "ইউরোপ",
    country: "যুক্তরাজ্য",
    time: "৬ ঘণ্টা আগে",
  },
  {
    id: 8,
    title: "যুক্তরাষ্ট্র: প্রযুক্তি খাতে নতুন উদ্ভাবন",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    category: "উত্তর আমেরিকা",
    country: "যুক্তরাষ্ট্র",
    time: "৭ ঘণ্টা আগে",
  },
  {
    id: 9,
    title: "কানাডা: স্বাস্থ্যসেবায় নতুন কর্মসূচি",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400&h=300&fit=crop",
    category: "উত্তর আমেরিকা",
    country: "কানাডা",
    time: "৮ ঘণ্টা আগে",
  },
  {
    id: 10,
    title: "ব্রাজিল: আমাজন রক্ষায় নতুন পদক্ষেপ",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop",
    category: "দক্ষিণ আমেরিকা",
    country: "ব্রাজিল",
    time: "৯ ঘণ্টা আগে",
  },
  {
    id: 11,
    title: "নাইজেরিয়া: খাদ্য নিরাপত্তায় নতুন প্রকল্প",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&h=300&fit=crop",
    category: "আফ্রিকা",
    country: "নাইজেরিয়া",
    time: "১০ ঘণ্টা আগে",
  },
  {
    id: 12,
    title: "অস্ট্রেলিয়া: গ্রেট ব্যারিয়ার রিফ সংরক্ষণ",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=300&fit=crop",
    category: "ওশেনিয়া",
    country: "অস্ট্রেলিয়া",
    time: "১১ ঘণ্টা আগে",
  },
];

// বিনোদন সংবাদ
const entertainmentPosts = [
  {
    id: 1,
    title: "নতুন চলচ্চিত্রে ভিন্নধর্মী চরিত্রে জনপ্রিয় নায়ক",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=400&fit=crop",
    time: "৩০ মিনিট আগে",
  },
  {
    id: 2,
    title: "সংগীত জগতে নতুন মুখ, প্রথম অ্যালবাম মুক্তি",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "টেলিভিশন নাটকে নতুন ধারার শুরু",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=400&fit=crop",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "আন্তর্জাতিক পুরস্কার জিতলেন বাংলাদেশি শিল্পী",
    image: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=400&h=400&fit=crop",
    time: "৩ ঘণ্টা আগে",
  },
];

// লাইফস্টাইল সংবাদ
const lifestylePosts = [
  {
    id: 1,
    title: "স্বাস্থ্যকর জীবনযাপনের জন্য ১০টি সহজ টিপস",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
    time: "৪৫ মিনিট আগে",
  },
  {
    id: 2,
    title: "ফ্যাশন: এই মৌসুমের সবচেয়ে জনপ্রিয় ট্রেন্ড",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "খাদ্য ও পুষ্টি: সুস্বাস্থ্যের মূলমন্ত্র",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "ভ্রমণ: দেশের অজানা সুন্দর স্থানসমূহ",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=400&fit=crop",
    time: "৩ ঘণ্টা আগে",
  },
];

// বিশ্ব সংবাদ
const worldPosts = [
  { id: 1, title: "জলবায়ু সম্মেলনে নতুন চুক্তি স্বাক্ষর", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop", time: "২ ঘণ্টা আগে" },
  { id: 2, title: "আন্তর্জাতিক বাণিজ্যে নতুন মাত্রা", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop", time: "৩ ঘণ্টা আগে" },
  { id: 3, title: "বৈশ্বিক অর্থনীতিতে পরিবর্তন", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop", time: "৪ ঘণ্টা আগে" },
  { id: 4, title: "প্রযুক্তি খাতে বিপ্লব আসছে", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop", time: "৫ ঘণ্টা আগে" },
  { id: 5, title: "শিক্ষা ব্যবস্থায় নতুন উদ্যোগ", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop", time: "৬ ঘণ্টা আগে" },
  { id: 6, title: "স্বাস্থ্য সেবায় অগ্রগতি", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop", time: "৭ ঘণ্টা আগে" },
];

// খেলাধুলা সংবাদ
const sportsPosts = [
  {
    id: 1,
    title: "বিশ্বকাপ ক্রিকেট: বাংলাদেশের দুর্দান্ত জয়",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop",
    category: "ক্রিকেট",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 2,
    title: "ফুটবল: জাতীয় দল প্রস্তুতি শুরু করেছে",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "অলিম্পিক: ক্রীড়াবিদদের প্রশিক্ষণ শুরু",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
    time: "৩ ঘণ্টা আগে",
  },
];

// মতামত পোস্ট
const opinionPosts = [
  {
    id: 1,
    title: "অর্থনৈতিক উন্নয়নের চ্যালেঞ্জ ও সম্ভাবনা",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    author: "ড. আহমেদ করিম",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 2,
    title: "শিক্ষা ব্যবস্থা: বর্তমান ও ভবিষ্যৎ",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    author: "ফারহানা আক্তার",
    time: "৪ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "জলবায়ু পরিবর্তন: আমাদের দায়িত্ব",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    author: "প্রফেসর রহিম উদ্দিন",
    time: "৫ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "প্রযুক্তি ও সমাজ: নতুন দিগন্ত",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    author: "তানভীর হাসান",
    time: "৬ ঘণ্টা আগে",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BreakingNewsTicker />
      
      <main className="flex-1">
        <div className="container mx-auto px-4">
          {/* Two Column Layout starts from Hero: Main Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 mt-6">
            {/* Main Content Column */}
            <div className="space-y-8">
              {/* Hero Section - aligned with sidebar start */}
              <HeroSection />
              
              {/* Top News / Discussed Section */}
              <DiscussedSection />
              
              {/* Bangladesh Section */}
              <BangladeshSection />

              {/* World News - Mega Style with gradient title */}
              <CategorySection
                title="🌍 বিশ্ব"
                posts={worldNewsPosts}
                variant="mega"
              />

              {/* National News */}
              <CategorySection
                title="🇧🇩 জাতীয়"
                posts={nationalPosts}
                variant="list"
              />

              {/* Politics News */}
              <CategorySection
                title="রাজনীতি"
                posts={politicsPosts}
                variant="list"
              />

              {/* Sports */}
              <CategorySection
                title="⚽ খেলাধুলা"
                posts={sportsPosts}
                variant="default"
              />

              {/* Entertainment - Highlights Section */}
              <HighlightsSection />

              {/* Lifestyle */}
              <CategorySection
                title="💄 জীবনযাত্রা"
                posts={lifestylePosts}
                variant="grid"
              />

              {/* Photo Gallery */}
              <PhotoGallerySection />

              {/* Video Section */}
              <VideoSection />
            </div>

            {/* Sidebar Column - Sticky, starts from top news level */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <EnhancedSidebar />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
