import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  FileText, Eye, PenLine, Trash2, Plus, Search, Filter,
  BarChart3, Clock, CheckCircle2, Archive, Image as ImageIcon, X
} from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface PostsManagerProps {
  userId: string;
}

const CATEGORIES: Record<string, string> = {
  national: "জাতীয়",
  politics: "রাজনীতি",
  world: "বিশ্ব",
  sports: "খেলা",
  entertainment: "বিনোদন",
  lifestyle: "লাইফস্টাইল",
  opinion: "মতামত",
  photo: "ফটো",
  video: "ভিডিও",
};

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  draft: { label: "খসড়া", color: "bg-yellow-500/15 text-yellow-700 border-yellow-300" },
  published: { label: "প্রকাশিত", color: "bg-green-500/15 text-green-700 border-green-300" },
  archived: { label: "আর্কাইভ", color: "bg-muted text-muted-foreground border-border" },
};

const emptyForm = {
  title: "",
  content: "",
  excerpt: "",
  category: "national" as "national" | "politics" | "world" | "sports" | "entertainment" | "lifestyle" | "opinion" | "photo" | "video",
  subcategory: "",
  status: "draft" as "draft" | "published" | "archived",
  featured_image: "",
};

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "link", "image"],
    ["clean"],
  ],
};

const PostsManager = ({ userId }: PostsManagerProps) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsFetching(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*, profiles(full_name)")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("পোস্ট লোড করতে ব্যর্থ");
    } else {
      setPosts(data || []);
    }
    setIsFetching(false);
  };

  const stats = useMemo(() => {
    const total = posts.length;
    const published = posts.filter((p) => p.status === "published").length;
    const draft = posts.filter((p) => p.status === "draft").length;
    const archived = posts.filter((p) => p.status === "archived").length;
    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
    return { total, published, draft, archived, totalViews };
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "all" || post.category === filterCategory;
      const matchesStatus = filterStatus === "all" || post.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [posts, searchQuery, filterCategory, filterStatus]);

  const openCreateDialog = () => {
    setFormData({ ...emptyForm });
    setEditingId(null);
    setDialogOpen(true);
  };

  const openEditDialog = (post: any) => {
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || "",
      category: post.category,
      subcategory: post.subcategory || "",
      status: post.status,
      featured_image: post.featured_image || "",
    });
    setEditingId(post.id);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId) {
        const updateData: any = { ...formData };
        if (formData.status === "published") {
          updateData.published_at = new Date().toISOString();
        }
        const { error } = await supabase.from("posts").update(updateData).eq("id", editingId);
        if (error) throw error;
        toast.success("পোস্ট আপডেট হয়েছে!");
      } else {
        const postData = {
          ...formData,
          author_id: userId,
          published_at: formData.status === "published" ? new Date().toISOString() : null,
        };
        const { error } = await supabase.from("posts").insert([postData]);
        if (error) throw error;
        toast.success("পোস্ট তৈরি হয়েছে!");
      }
      setDialogOpen(false);
      setFormData({ ...emptyForm });
      setEditingId(null);
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message || "পোস্ট সংরক্ষণ করতে ব্যর্থ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
      toast.success("পোস্ট মুছে ফেলা হয়েছে");
      setDeleteConfirm(null);
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message || "পোস্ট মুছতে ব্যর্থ");
    }
  };

  const handleQuickStatusChange = async (id: string, newStatus: string) => {
    try {
      const updateData: any = { status: newStatus };
      if (newStatus === "published") updateData.published_at = new Date().toISOString();
      const { error } = await supabase.from("posts").update(updateData).eq("id", id);
      if (error) throw error;
      toast.success("অবস্থা পরিবর্তন হয়েছে");
      fetchPosts();
    } catch (error: any) {
      toast.error("অবস্থা পরিবর্তন ব্যর্থ");
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">মোট পোস্ট</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.published}</p>
                <p className="text-xs text-muted-foreground">প্রকাশিত</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-secondary/50 border-secondary">
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-secondary-foreground" />
              <div>
                <p className="text-2xl font-bold">{stats.draft}</p>
                <p className="text-xs text-muted-foreground">খসড়া</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/50">
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <Archive className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{stats.archived}</p>
                <p className="text-xs text-muted-foreground">আর্কাইভ</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-accent-foreground" />
              <div>
                <p className="text-2xl font-bold">{stats.totalViews}</p>
                <p className="text-xs text-muted-foreground">মোট ভিউ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex flex-1 gap-3 flex-wrap w-full">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="পোস্ট খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-1" />
              <SelectValue placeholder="ক্যাটাগরি" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সকল ক্যাটাগরি</SelectItem>
              {Object.entries(CATEGORIES).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="অবস্থা" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সকল অবস্থা</SelectItem>
              <SelectItem value="draft">খসড়া</SelectItem>
              <SelectItem value="published">প্রকাশিত</SelectItem>
              <SelectItem value="archived">আর্কাইভ</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openCreateDialog} className="gap-2 whitespace-nowrap">
          <Plus className="h-4 w-4" /> নতুন পোস্ট
        </Button>
      </div>

      {/* Posts Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            পোস্ট তালিকা ({filteredPosts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isFetching ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>কোনো পোস্ট পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col md:flex-row md:items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/30 bg-card transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-full md:w-20 h-14 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                    {post.featured_image ? (
                      <img
                        src={post.featured_image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-1">{post.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {post.excerpt || "কোনো সংক্ষিপ্ত বিবরণ নেই"}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {CATEGORIES[post.category] || post.category}
                      </Badge>
                      <span className={`text-[10px] px-1.5 py-0 rounded-full border ${STATUS_MAP[post.status]?.color}`}>
                        {STATUS_MAP[post.status]?.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {post.profiles?.full_name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatDate(post.created_at)}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <Eye className="h-3 w-3" /> {post.views}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {post.status === "draft" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs gap-1 text-primary border-primary/30 hover:bg-primary/10"
                        onClick={() => handleQuickStatusChange(post.id, "published")}
                      >
                        <CheckCircle2 className="h-3 w-3" /> প্রকাশ
                      </Button>
                    )}
                    {post.status === "published" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs gap-1"
                        onClick={() => handleQuickStatusChange(post.id, "archived")}
                      >
                        <Archive className="h-3 w-3" /> আর্কাইভ
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => openEditDialog(post)}
                    >
                      <PenLine className="h-4 w-4" />
                    </Button>
                    {deleteConfirm === post.id ? (
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 text-xs"
                          onClick={() => handleDelete(post.id)}
                        >
                          নিশ্চিত
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => setDeleteConfirm(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => setDeleteConfirm(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "পোস্ট সম্পাদনা করুন" : "নতুন পোস্ট তৈরি করুন"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">শিরোনাম *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="পোস্টের শিরোনাম লিখুন"
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
                placeholder="সংক্ষিপ্ত বিবরণ (ঐচ্ছিক)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featured_image">ফিচার্ড ছবি URL</Label>
              <div className="flex gap-2">
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.featured_image && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setFormData({ ...formData, featured_image: "" })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {formData.featured_image && (
                <img
                  src={formData.featured_image}
                  alt="Preview"
                  className="mt-2 rounded-md max-h-40 object-cover border"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>বিস্তারিত *</Label>
              <div className="border rounded-md">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  modules={quillModules}
                  placeholder="পোস্টের বিস্তারিত লিখুন..."
                  style={{ minHeight: "200px" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>ক্যাটাগরি *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as typeof formData.category })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORIES).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
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
                <Label>অবস্থা *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as typeof formData.status })}
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

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                বাতিল
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "সংরক্ষণ হচ্ছে..." : editingId ? "আপডেট করুন" : "পোস্ট তৈরি করুন"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostsManager;
