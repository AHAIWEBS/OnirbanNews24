import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import TopStories from "@/components/TopStories";
import HighlightsSection from "@/components/HighlightsSection";
import CategorySection from "@/components/CategorySection";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

// Sample data for different sections
const worldNewsPosts = [
  {
    id: 1,
    title: "এশিয়া: নতুন অর্থনৈতিক জোট গঠনের পরিকল্পনা",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop",
    category: "এশিয়া",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 2,
    title: "ইউরোপ: জলবায়ু পরিবর্তন মোকাবেলায় নতুন পদক্ষেপ",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
    category: "ইউরোপ",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "আমেরিকা: প্রযুক্তি খাতে নতুন বিনিয়োগ",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    category: "আমেরিকা",
    time: "৩ ঘণ্টা আগে",
  },
];

const nationalPosts = [
  {
    id: 1,
    title: "সংসদে নতুন বিল পাস: শিক্ষা খাতে বড় পরিবর্তন আসছে",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop",
    category: "রাজনীতি",
    time: "৩০ মিনিট আগে",
  },
  {
    id: 2,
    title: "স্বাস্থ্য মন্ত্রণালয়ের নতুন উদ্যোগ",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "অবকাঠামো উন্নয়নে নতুন প্রকল্প",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "কৃষি খাতে ভর্তুকি বৃদ্ধির ঘোষণা",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop",
    time: "৩ ঘণ্টা আগে",
  },
];

const entertainmentPosts = [
  {
    id: 1,
    title: "নতুন চলচ্চিত্রে ভিন্ন চরিত্রে জনপ্রিয় নায়ক",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=400&fit=crop",
    time: "৪৫ মিনিট আগে",
  },
  {
    id: 2,
    title: "সংগীত জগতে নতুন মুখ",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "টেলিভিশন নাটকে নতুন ধারা",
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

const lifestylePosts = [
  {
    id: 1,
    title: "স্বাস্থ্যকর জীবনযাপনের নতুন টিপস",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 2,
    title: "ফ্যাশন: এই মৌসুমের ট্রেন্ড",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "খাদ্য ও পুষ্টি: সুস্বাস্থ্যের চাবিকাঠি",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop",
    time: "৩ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "ভ্রমণ: দেশের সুন্দর স্থানসমূহ",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=400&fit=crop",
    time: "৪ ঘণ্টা আগে",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <HeroSlider />
            </div>
            <div>
              <TopStories />
            </div>
          </div>

          {/* Highlights Section */}
          <HighlightsSection />

          {/* Main Content with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* World News */}
              <CategorySection
                title="বিশ্ব সংবাদ"
                posts={worldNewsPosts}
                variant="default"
              />

              {/* National & Politics */}
              <CategorySection
                title="জাতীয় ও রাজনীতি"
                posts={nationalPosts}
                variant="list"
              />

              {/* Entertainment */}
              <CategorySection
                title="বিনোদন"
                posts={entertainmentPosts}
                variant="grid"
              />

              {/* Lifestyle */}
              <CategorySection
                title="জীবনযাপন"
                posts={lifestylePosts}
                variant="grid"
              />
            </div>

            {/* Sidebar */}
            <div>
              <Sidebar />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
