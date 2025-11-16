import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PenSquare, Lock } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SidebarPostEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "national" as any,
    status: "draft" as any,
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (roleData?.role === "admin" || roleData?.role === "reporter") {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Access check failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error("দয়া করে লগইন করুন");
      return;
    }

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
        status: "draft",
      });
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.message || "পোস্ট তৈরি করতে ব্যর্থ");
    }
  };

  if (!isAdmin) return null;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 p-4">
      {!isOpen ? (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="w-full gap-2"
          variant="default"
        >
          <PenSquare className="w-4 h-4" />
          নতুন পোস্ট লিখুন
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Lock className="w-4 h-4" />
              অ্যাডমিন পোস্ট এডিটর
            </h3>
            <Button 
              type="button" 
              onClick={() => setIsOpen(false)} 
              variant="ghost" 
              size="sm"
              className="h-6 px-2 text-xs"
            >
              বন্ধ করুন
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs">শিরোনাম</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="h-8 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="text-xs">সংক্ষিপ্ত বিবরণ</Label>
            <Input
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="h-8 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">বিস্তারিত (রিচ টেক্সট)</Label>
            <div className="bg-background rounded-md border">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link'],
                    ['clean']
                  ],
                }}
                className="text-sm"
                style={{ minHeight: '150px' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label className="text-xs">ক্যাটাগরি</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="national">জাতীয়</SelectItem>
                  <SelectItem value="international">আন্তর্জাতিক</SelectItem>
                  <SelectItem value="sports">খেলাধুলা</SelectItem>
                  <SelectItem value="entertainment">বিনোদন</SelectItem>
                  <SelectItem value="technology">প্রযুক্তি</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">স্ট্যাটাস</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">খসড়া</SelectItem>
                  <SelectItem value="published">প্রকাশিত</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full h-8 text-xs">
            পোস্ট তৈরি করুন
          </Button>
        </form>
      )}
    </Card>
  );
};

export default SidebarPostEditor;
