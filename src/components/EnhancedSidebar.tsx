import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const trendingPosts = [
  { id: 1, title: "প্রযুক্তি খাতে নতুন বিনিয়োগ আসছে", views: "২৫০০" },
  { id: 2, title: "শিক্ষা ব্যবস্থায় সংস্কারের ঘোষণা", views: "২২০০" },
  { id: 3, title: "স্বাস্থ্য সেবায় নতুন পদক্ষেপ", views: "১৮০০" },
  { id: 4, title: "পরিবেশ সংরক্ষণে নতুন উদ্যোগ", views: "১৫০০" },
];

const EnhancedSidebar = () => {
  const [specialContent, setSpecialContent] = useState<any>({ this_day: null, quote: null, people: null });
  const [horoscope, setHoroscope] = useState<any[]>([]);
  const [prayerTimes, setPrayerTimes] = useState<any>(null);

  useEffect(() => {
    fetchSpecialContent();
    fetchHoroscope();
    fetchPrayerTimes();
  }, []);

  const fetchSpecialContent = async () => {
    const types = ["this_day", "quote", "people"];
    const newContent: any = {};

    for (const type of types) {
      const { data } = await supabase
        .from("special_content")
        .select("*")
        .eq("content_type", type)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      newContent[type] = data;
    }

    setSpecialContent(newContent);
  };

  const fetchHoroscope = async () => {
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("horoscope")
      .select("*")
      .eq("date", today)
      .limit(12);

    setHoroscope(data || []);
  };

  const fetchPrayerTimes = async () => {
    const { data } = await supabase
      .from("prayer_times")
      .select("*")
      .eq("is_active", true)
      .single();

    setPrayerTimes(data);
  };

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

      {/* Special Content Widget */}
      <div className="bg-card rounded-lg border border-border p-6">
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">এইদিনে</TabsTrigger>
            <TabsTrigger value="quote">উক্তি</TabsTrigger>
            <TabsTrigger value="people">পিপলস</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="mt-4">
            {specialContent.this_day ? (
              <div className="space-y-2">
                <h3 className="font-bold text-sm">{specialContent.this_day.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {specialContent.this_day.content}
                </p>
                {specialContent.this_day.source_url && (
                  <a href={specialContent.this_day.source_url} className="text-xs text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    আরও জানুন →
                  </a>
                )}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">কোনো তথ্য নেই</p>
            )}
          </TabsContent>
          <TabsContent value="quote" className="mt-4">
            {specialContent.quote ? (
              <div className="space-y-2">
                <div className="relative pl-4 border-l-4 border-accent">
                  <p className="text-sm italic leading-relaxed">
                    "{specialContent.quote.content}"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    — {specialContent.quote.title}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">কোনো উক্তি নেই</p>
            )}
          </TabsContent>
          <TabsContent value="people" className="mt-4">
            {specialContent.people ? (
              <div className="space-y-2">
                <h3 className="font-bold text-sm">{specialContent.people.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {specialContent.people.content}
                </p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">কোনো তথ্য নেই</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Horoscope Widget */}
      {horoscope.length > 0 && (
        <Card className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-bold text-lg mb-4 text-primary">আজকের রাশিফল</h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {horoscope.map((item) => (
              <div key={item.id} className="border-b border-border last:border-0 pb-3 last:pb-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-sm">{item.sign}</h4>
                  {item.lucky_number && (
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">
                      {item.lucky_number}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.prediction}
                </p>
                {item.lucky_color && (
                  <p className="text-xs text-primary mt-1">রঙ: {item.lucky_color}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Prayer Times Widget */}
      {prayerTimes && (
        <Card className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-bold text-lg mb-4 text-primary">নামাজের সময়সূচী</h3>
          <p className="text-xs text-muted-foreground mb-3">{prayerTimes.location}</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-semibold">ফজর</span>
              <span className="text-sm">{prayerTimes.fajr}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-semibold">যোহর</span>
              <span className="text-sm">{prayerTimes.dhuhr}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-semibold">আসর</span>
              <span className="text-sm">{prayerTimes.asr}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-semibold">মাগরিব</span>
              <span className="text-sm">{prayerTimes.maghrib}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-semibold">এশা</span>
              <span className="text-sm">{prayerTimes.isha}</span>
            </div>
          </div>
        </Card>
      )}

      {/* Advertisement Space */}
      <div className="bg-muted rounded-lg p-12 text-center">
        <p className="text-muted-foreground">বিজ্ঞাপন স্থান</p>
      </div>
    </aside>
  );
};

export default EnhancedSidebar;
