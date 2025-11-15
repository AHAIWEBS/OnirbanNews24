import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const trendingPosts = [
  { id: 1, title: "প্রযুক্তি খাতে নতুন বিনিয়োগ আসছে", views: "২৫০০" },
  { id: 2, title: "শিক্ষা ব্যবস্থায় সংস্কারের ঘোষণা", views: "২২০০" },
  { id: 3, title: "স্বাস্থ্য সেবায় নতুন পদক্ষেপ", views: "১৮০০" },
  { id: 4, title: "পরিবেশ সংরক্ষণে নতুন উদ্যোগ", views: "১৫০০" },
];

const Sidebar = () => {
  return (
    <aside className="space-y-6">
      {/* Trending Widget */}
      <div className="bg-card rounded-lg border border-border p-6">
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trending">ট্রেন্ডিং</TabsTrigger>
            <TabsTrigger value="popular">পাঠক প্রিয়</TabsTrigger>
            <TabsTrigger value="recent">ফিরে দেখা</TabsTrigger>
          </TabsList>
          <TabsContent value="trending" className="mt-4">
            <div className="space-y-4">
              {trendingPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex gap-3 group cursor-pointer border-b border-border last:border-0 pb-3 last:pb-0"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm leading-snug group-hover:text-accent transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      👁 {post.views} ভিউ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="popular" className="mt-4">
            <div className="space-y-4">
              {trendingPosts.slice().reverse().map((post, index) => (
                <div
                  key={post.id}
                  className="flex gap-3 group cursor-pointer border-b border-border last:border-0 pb-3 last:pb-0"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm leading-snug group-hover:text-accent transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      ❤ {post.views} পছন্দ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recent" className="mt-4">
            <div className="space-y-4">
              {trendingPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex gap-3 group cursor-pointer border-b border-border last:border-0 pb-3 last:pb-0"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-muted text-foreground rounded flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm leading-snug group-hover:text-accent transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      ২৪ ঘণ্টা আগে
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Special Widget */}
      <div className="bg-card rounded-lg border border-border p-6">
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">এই দিনে</TabsTrigger>
            <TabsTrigger value="quote">উক্তি</TabsTrigger>
            <TabsTrigger value="people">পিপলস</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="mt-4">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                ১৯৭১ সালের এই দিনে মুক্তিযুদ্ধে একটি গুরুত্বপূর্ণ বিজয় অর্জিত হয়।
              </p>
              <p className="text-sm font-medium">
                "ইতিহাস আমাদের শিক্ষা দেয়, ভবিষ্যৎ আমাদের পথ দেখায়।"
              </p>
            </div>
          </TabsContent>
          <TabsContent value="quote" className="mt-4">
            <div className="relative p-4 bg-muted rounded-lg">
              <div className="text-accent text-4xl absolute top-0 left-0 opacity-30">"</div>
              <p className="text-sm italic pl-6">
                সফলতার জন্য প্রয়োজন একাগ্রতা, কঠোর পরিশ্রম এবং অধ্যবসায়।
              </p>
              <p className="text-xs text-muted-foreground mt-2 text-right">
                — বঙ্গবন্ধু শেখ মুজিবুর রহমান
              </p>
            </div>
          </TabsContent>
          <TabsContent value="people" className="mt-4">
            <div className="space-y-4">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">জনপ্রিয় ব্যক্তিত্ব</h4>
                  <p className="text-xs text-muted-foreground">অবদান: ৫০+</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ad Space */}
      <div className="bg-muted rounded-lg border border-border p-6 text-center">
        <p className="text-sm text-muted-foreground">বিজ্ঞাপন স্থান</p>
        <div className="aspect-square bg-background rounded-lg mt-4 flex items-center justify-center">
          <span className="text-muted-foreground">৩০০x২৫০</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
