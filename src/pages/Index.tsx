import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HighlightsSection from "@/components/HighlightsSection";
import CategorySection from "@/components/CategorySection";
import DiscussedSection from "@/components/DiscussedSection";
import BangladeshSection from "@/components/BangladeshSection";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

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

// বিশ্ব সংবাদ
const worldNewsPosts = [
  {
    id: 1,
    title: "এশিয়া: আঞ্চলিক অর্থনৈতিক জোট গঠনের চূড়ান্ত পর্যায়",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop",
    category: "এশিয়া",
    time: "৪৫ মিনিট আগে",
  },
  {
    id: 2,
    title: "ইউরোপ: জলবায়ু পরিবর্তন মোকাবেলায় নতুন আইন",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
    category: "ইউরোপ",
    time: "১ ঘণ্টা আগে",
  },
  {
    id: 3,
    title: "আমেরিকা: প্রযুক্তি খাতে বিশাল বিনিয়োগের ঘোষণা",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    category: "আমেরিকা",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 4,
    title: "আফ্রিকা: খাদ্য নিরাপত্তায় নতুন কর্মসূচি",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&h=300&fit=crop",
    category: "আফ্রিকা",
    time: "৩ ঘণ্টা আগে",
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
      
      <main className="flex-1">
        <div className="container mx-auto px-4">
          {/* Hero Section with Top Stories - Full Width */}
          <HeroSection />

          {/* Highlights Section - Full Width */}
          <HighlightsSection />
          
          {/* Discussed Section - Full Width */}
          <DiscussedSection />
          
          {/* Bangladesh Section - Full Width */}
          <BangladeshSection />

          {/* Main Content with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* National News */}
              <CategorySection
                title="জাতীয়"
                posts={nationalPosts}
                variant="list"
              />

              {/* Politics News */}
              <CategorySection
                title="রাজনীতি"
                posts={politicsPosts}
                variant="list"
              />

              {/* World News */}
              <CategorySection
                title="বিশ্ব সংবাদ"
                posts={worldNewsPosts}
                variant="default"
              />

              {/* Sports */}
              <CategorySection
                title="খেলাধুলা"
                posts={sportsPosts}
                variant="default"
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

              {/* Opinion Section with Auto-Scroll */}
              <section className="py-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-primary" />
                  <h2 className="text-2xl font-bold">মতামত</h2>
                </div>

                <div className="relative overflow-hidden h-[600px]">
                  <div className="animate-scroll-up space-y-6">
                    {[...opinionPosts, ...opinionPosts].map((post, index) => (
                      <div
                        key={`${post.id}-${index}`}
                        className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow group cursor-pointer"
                      >
                        <div className="flex gap-4">
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <img
                              src={post.image}
                              alt={post.author}
                              className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="relative">
                              <div className="absolute -top-2 -left-2 text-accent text-3xl opacity-20 leading-none">
                                "
                              </div>
                              <h3 className="font-bold leading-snug group-hover:text-accent transition-colors pl-4">
                                {post.title}
                              </h3>
                            </div>
                            <p className="text-sm font-medium text-primary mt-2">
                              {post.author}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {post.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
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
