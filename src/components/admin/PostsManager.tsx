import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface PostsManagerProps {
  userId: string;
}

const PostsManager = ({ userId }: PostsManagerProps) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "national" as any,
    subcategory: "",
    status: "draft" as any,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, profiles(full_name)")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("পোস্ট লোড করতে ব্যর্থ");
      return;
    }

    setPosts(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const postData = {
        ...formData,
        author_id: userId,
        published_at: formData.status === "published" ? new Date().toISOString() : null,
      };

      const { error } = await supabase.from("posts").insert([postData]);

      if (error) throw error;

      toast.success("পোস্ট সফলভাবে তৈরি হয়েছে!");
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        category: "national",
        subcategory: "",
        status: "draft",
      });
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message || "পোস্ট তৈরি করতে ব্যর্থ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>নতুন পোস্ট তৈরি করুন</CardTitle>
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
              <Label htmlFor="excerpt">সংক্ষিপ্ত বিবরণ</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">বিস্তারিত</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>ক্যাটাগরি</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">জাতীয়</SelectItem>
                    <SelectItem value="politics">রাজনীতি</SelectItem>
                    <SelectItem value="world">বিশ্ব</SelectItem>
                    <SelectItem value="sports">খেলা</SelectItem>
                    <SelectItem value="entertainment">বিনোদন</SelectItem>
                    <SelectItem value="lifestyle">লাইফস্টাইল</SelectItem>
                    <SelectItem value="opinion">মতামত</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory">সাব-ক্যাটাগরি</Label>
                <Input
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  placeholder="ঐচ্ছিক"
                />
              </div>

              <div className="space-y-2">
                <Label>অবস্থা</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">খসড়া</SelectItem>
                    <SelectItem value="published">প্রকাশিত</SelectItem>
                    <SelectItem value="archived">আর্কাইভ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "সংরক্ষণ হচ্ছে..." : "পোস্ট সংরক্ষণ করুন"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>সকল পোস্ট ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border border-border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>লেখক: {post.profiles?.full_name}</span>
                  <span>ক্যাটাগরি: {post.category}</span>
                  <span>অবস্থা: {post.status}</span>
                  <span>ভিউ: {post.views}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostsManager;
