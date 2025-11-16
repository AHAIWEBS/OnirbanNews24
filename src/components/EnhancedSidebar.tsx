import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import SidebarPostEditor from "./SidebarPostEditor";
import WeatherWidget from "./WeatherWidget";

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
  const [openDialog, setOpenDialog] = useState<"this_day" | "quote" | "people" | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", url: "" });

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

  const handleSubmit = async (type: "this_day" | "quote" | "people") => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("special_content").insert([{
        content_type: type,
        title: formData.title,
        content: formData.content,
        source_url: formData.url,
        created_by: user?.id,
        date: new Date().toISOString().split("T")[0],
      }]);

      if (error) throw error;

      toast.success("কন্টেন্ট যোগ হয়েছে!");
      setFormData({ title: "", content: "", url: "" });
      setOpenDialog(null);
      fetchSpecialContent();
    } catch (error: any) {
      toast.error(error.message || "যোগ করতে ব্যর্থ");
    }
  };

  const fetchFromUrl = async () => {
    if (!formData.url) {
      toast.error("URL প্রদান করুন");
      return;
    }

    try {
      const response = await fetch(formData.url);
      const html = await response.text();
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      if (titleMatch) {
        setFormData({ ...formData, title: titleMatch[1] });
      }
      toast.success("URL থেকে লোড হয়েছে");
    } catch (error) {
      toast.error("URL থেকে লোড করতে ব্যর্থ");
    }
  };

  const renderDialog = (type: "this_day" | "quote" | "people", title: string) => (
    <Dialog open={openDialog === type} onOpenChange={(open) => setOpenDialog(open ? type : null)}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title} যোগ করুন</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>URL / RSS</Label>
            <div className="flex gap-2">
              <Input
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="URL বা RSS লিংক"
              />
              <Button onClick={fetchFromUrl} size="sm">লোড</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>শিরোনাম</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>বিস্তারিত</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
            />
          </div>
          <Button onClick={() => handleSubmit(type)} className="w-full">
            সাবমিট করুন
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <aside className="space-y-6">
      {/* Admin Post Editor */}
      <SidebarPostEditor />

      {/* Weather Widget */}
      <WeatherWidget />

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
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">বিশেষ কন্টেন্ট</h3>
        </div>
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today" className="relative">
              এইদিনে
              <span className="absolute -top-1 -right-1">{renderDialog("this_day", "এইদিনে")}</span>
            </TabsTrigger>
            <TabsTrigger value="quote" className="relative">
              উক্তি
              <span className="absolute -top-1 -right-1">{renderDialog("quote", "উক্তি")}</span>
            </TabsTrigger>
            <TabsTrigger value="people" className="relative">
              পিপলস
              <span className="absolute -top-1 -right-1">{renderDialog("people", "পিপলস")}</span>
            </TabsTrigger>
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

      {/* Prayer Times Widget - Unique Design */}
      {prayerTimes && (
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 border-emerald-200 dark:border-emerald-800 p-6 overflow-hidden relative">
          {/* Decorative Islamic pattern background */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
            <div className="w-full h-full border-4 border-emerald-600 dark:border-emerald-400 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-emerald-600 dark:border-emerald-400 rounded-full" />
          </div>
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
              <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-100">নামাজের সময়সূচী</h3>
            </div>
            
            <div className="flex items-center gap-2 mb-4 text-sm text-emerald-700 dark:text-emerald-300">
              <MapPin className="w-4 h-4" />
              <span>{prayerTimes.location}</span>
            </div>

            <div className="space-y-2">
              {[
                { name: "ফজর", time: prayerTimes.fajr, emoji: "🌅" },
                { name: "যোহর", time: prayerTimes.dhuhr, emoji: "☀️" },
                { name: "আসর", time: prayerTimes.asr, emoji: "🌤️" },
                { name: "মাগরিব", time: prayerTimes.maghrib, emoji: "🌆" },
                { name: "এশা", time: prayerTimes.isha, emoji: "🌙" },
              ].map((prayer, idx) => (
                <div 
                  key={idx}
                  className="flex justify-between items-center py-3 px-4 bg-white/60 dark:bg-black/30 rounded-lg hover:bg-white/80 dark:hover:bg-black/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{prayer.emoji}</span>
                    <span className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                      {prayer.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200 font-mono">
                    {prayer.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Online Poll Widget */}
      <Card className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-bold text-lg mb-4 text-primary">অনলাইন জরিপ</h3>
        <div className="space-y-4">
          <p className="font-semibold text-sm">আগামী নির্বাচনে সবচেয়ে গুরুত্বপূর্ণ বিষয় কোনটি?</p>
          {[
            { text: "অর্থনৈতিক উন্নয়ন", percent: 35 },
            { text: "শিক্ষা ব্যবস্থা", percent: 25 },
            { text: "স্বাস্থ্যসেবা", percent: 20 },
            { text: "দুর্নীতি দমন", percent: 20 },
          ].map((option, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">{option.text}</span>
                <span className="text-sm font-bold text-primary">{option.percent}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${option.percent}%` }}
                />
              </div>
            </div>
          ))}
          <Button className="w-full mt-4" size="sm">ভোট দিন</Button>
        </div>
      </Card>

      {/* Advertisement Space */}
      <div className="bg-muted rounded-lg p-12 text-center">
        <p className="text-muted-foreground">বিজ্ঞাপন স্থান</p>
      </div>
    </aside>
  );
};

export default EnhancedSidebar;
