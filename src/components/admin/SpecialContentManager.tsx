import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface SpecialContentManagerProps {
  userId: string;
}

const SpecialContentManager = ({ userId }: SpecialContentManagerProps) => {
  const [contents, setContents] = useState<any>({ this_day: [], quote: [], people: [] });
  const [activeType, setActiveType] = useState<"this_day" | "quote" | "people">("this_day");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
    source_url: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    const types = ["this_day", "quote", "people"];
    const newContents: any = {};

    for (const type of types) {
      const { data } = await supabase
        .from("special_content")
        .select("*")
        .eq("content_type", type)
        .order("created_at", { ascending: false })
        .limit(10);

      newContents[type] = data || [];
    }

    setContents(newContents);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("special_content").insert([{
        ...formData,
        content_type: activeType,
        created_by: userId,
      }]);

      if (error) throw error;

      toast.success("কন্টেন্ট সফলভাবে যোগ হয়েছে!");
      setFormData({
        title: "",
        content: "",
        image_url: "",
        source_url: "",
        date: new Date().toISOString().split("T")[0],
      });
      fetchContents();
    } catch (error: any) {
      toast.error(error.message || "কন্টেন্ট যোগ করতে ব্যর্থ");
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("special_content")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      toast.success(currentStatus ? "নিষ্ক্রিয় করা হয়েছে" : "সক্রিয় করা হয়েছে");
      fetchContents();
    } catch (error: any) {
      toast.error("অবস্থা পরিবর্তন করতে ব্যর্থ");
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeType} onValueChange={(v) => setActiveType(v as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="this_day">এইদিনে</TabsTrigger>
          <TabsTrigger value="quote">উক্তি</TabsTrigger>
          <TabsTrigger value="people">পিপলস</TabsTrigger>
        </TabsList>

        <TabsContent value={activeType} className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>নতুন কন্টেন্ট যোগ করুন</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">শিরোনাম</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">বিস্তারিত</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image_url">ইমেজ URL (ঐচ্ছিক)</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="source_url">সোর্স URL (ঐচ্ছিক)</Label>
                    <Input
                      id="source_url"
                      value={formData.source_url}
                      onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                    />
                  </div>
                </div>

                {activeType === "this_day" && (
                  <div className="space-y-2">
                    <Label htmlFor="date">তারিখ</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                )}

                <Button type="submit" className="w-full">
                  কন্টেন্ট যোগ করুন
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {activeType === "this_day" && "এইদিনে"}
                {activeType === "quote" && "উক্তি"}
                {activeType === "people" && "পিপলস"}
                {" "}কন্টেন্ট ({contents[activeType].length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contents[activeType].map((item: any) => (
                  <div key={item.id} className="border border-border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{item.title}</h3>
                      <Button
                        size="sm"
                        variant={item.is_active ? "default" : "outline"}
                        onClick={() => toggleActive(item.id, item.is_active)}
                      >
                        {item.is_active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.content}</p>
                    {item.source_url && (
                      <a href={item.source_url} className="text-xs text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        সোর্স দেখুন
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpecialContentManager;
