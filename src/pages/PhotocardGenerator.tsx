import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";

const PhotocardGenerator = () => {
  const [inputType, setInputType] = useState<"url" | "rss" | "manual">("manual");
  const [urlInput, setUrlInput] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFromUrl = async () => {
    if (!urlInput) {
      toast.error("URL প্রদান করুন");
      return;
    }
    
    setLoading(true);
    try {
      // Fetch content from URL
      const response = await fetch(urlInput);
      const html = await response.text();
      
      // Simple parsing (in production, use proper HTML parser)
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      const ogImageMatch = html.match(/<meta property="og:image" content="(.*?)"/i);
      
      if (titleMatch) setTitle(titleMatch[1]);
      if (ogImageMatch) setImageUrl(ogImageMatch[1]);
      
      toast.success("কন্টেন্ট লোড হয়েছে");
    } catch (error) {
      toast.error("URL থেকে কন্টেন্ট লোড করতে ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  const fetchFromRss = async () => {
    if (!urlInput) {
      toast.error("RSS URL প্রদান করুন");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(urlInput);
      const xml = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "text/xml");
      
      const items = xmlDoc.querySelectorAll("item");
      if (items.length > 0) {
        const firstItem = items[0];
        const titleEl = firstItem.querySelector("title");
        const descEl = firstItem.querySelector("description");
        const imageEl = firstItem.querySelector("enclosure");
        
        if (titleEl) setTitle(titleEl.textContent || "");
        if (descEl) setContent(descEl.textContent || "");
        if (imageEl) setImageUrl(imageEl.getAttribute("url") || "");
      }
      
      toast.success("RSS কন্টেন্ট লোড হয়েছে");
    } catch (error) {
      toast.error("RSS থেকে কন্টেন্ট লোড করতে ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  const downloadCard = async () => {
    const element = document.getElementById("photocard-preview");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
      
      const link = document.createElement("a");
      link.download = `photocard-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success("ছবি ডাউনলোড হয়েছে");
    } catch (error) {
      toast.error("ডাউনলোড করতে ব্যর্থ");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-foreground mb-8">ফটোকার্ড জেনারেটর</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>কন্টেন্ট ইনপুট</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>ইনপুট ধরন</Label>
                <Select value={inputType} onValueChange={(v: any) => setInputType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">ম্যানুয়াল</SelectItem>
                    <SelectItem value="url">URL</SelectItem>
                    <SelectItem value="rss">RSS Feed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(inputType === "url" || inputType === "rss") && (
                <div className="space-y-2">
                  <Label>{inputType === "rss" ? "RSS" : ""} URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder={`${inputType === "rss" ? "RSS" : ""} URL এখানে লিখুন`}
                    />
                    <Button 
                      onClick={inputType === "rss" ? fetchFromRss : fetchFromUrl}
                      disabled={loading}
                    >
                      {loading ? "লোড হচ্ছে..." : "লোড"}
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>শিরোনাম</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="শিরোনাম লিখুন"
                />
              </div>

              <div className="space-y-2">
                <Label>বিস্তারিত</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  placeholder="বিস্তারিত লিখুন"
                />
              </div>

              <div className="space-y-2">
                <Label>ছবির URL</Label>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="ছবির URL লিখুন"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>প্রিভিউ</span>
                <Button onClick={downloadCard} size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  ডাউনলোড
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                id="photocard-preview"
                className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-lg space-y-4"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                {title && (
                  <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                )}
                {content && (
                  <p className="text-muted-foreground leading-relaxed">{content}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhotocardGenerator;
