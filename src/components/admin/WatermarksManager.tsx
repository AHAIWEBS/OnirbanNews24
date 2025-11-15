import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface WatermarksManagerProps {
  userId: string;
}

const WatermarksManager = ({ userId }: WatermarksManagerProps) => {
  const [watermarks, setWatermarks] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    position: "bottom-right",
    opacity: 0.7,
    size: 100,
  });

  useEffect(() => {
    fetchWatermarks();
  }, []);

  const fetchWatermarks = async () => {
    const { data, error } = await supabase
      .from("watermarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("ওয়াটারমার্ক লোড করতে ব্যর্থ");
      return;
    }

    setWatermarks(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("watermarks").insert([{
        ...formData,
        created_by: userId,
      }]);

      if (error) throw error;

      toast.success("ওয়াটারমার্ক সফলভাবে যোগ হয়েছে!");
      setFormData({
        name: "",
        image_url: "",
        position: "bottom-right",
        opacity: 0.7,
        size: 100,
      });
      fetchWatermarks();
    } catch (error: any) {
      toast.error(error.message || "ওয়াটারমার্ক যোগ করতে ব্যর্থ");
    }
  };

  const setDefaultWatermark = async (id: string) => {
    try {
      await supabase.from("watermarks").update({ is_default: false }).neq("id", id);
      const { error } = await supabase.from("watermarks").update({ is_default: true }).eq("id", id);

      if (error) throw error;

      toast.success("ডিফল্ট ওয়াটারমার্ক সেট হয়েছে!");
      fetchWatermarks();
    } catch (error: any) {
      toast.error("ডিফল্ট সেট করতে ব্যর্থ");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>নতুন ওয়াটারমার্ক যোগ করুন</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">নাম</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">ইমেজ URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>অবস্থান</Label>
                <Select 
                  value={formData.position} 
                  onValueChange={(value) => setFormData({ ...formData, position: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-left">উপরে বাম</SelectItem>
                    <SelectItem value="top-right">উপরে ডান</SelectItem>
                    <SelectItem value="bottom-left">নিচে বাম</SelectItem>
                    <SelectItem value="bottom-right">নিচে ডান</SelectItem>
                    <SelectItem value="center">কেন্দ্র</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="opacity">স্বচ্ছতা: {formData.opacity}</Label>
                <Input
                  id="opacity"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={formData.opacity}
                  onChange={(e) => setFormData({ ...formData, opacity: parseFloat(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">আকার: {formData.size}px</Label>
                <Input
                  id="size"
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              ওয়াটারমার্ক যোগ করুন
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>সকল ওয়াটারমার্ক ({watermarks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {watermarks.map((watermark) => (
              <div key={watermark.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{watermark.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      অবস্থান: {watermark.position}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      স্বচ্ছতা: {watermark.opacity} | আকার: {watermark.size}px
                    </p>
                  </div>
                  {watermark.is_default && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      ডিফল্ট
                    </span>
                  )}
                </div>
                <img 
                  src={watermark.image_url} 
                  alt={watermark.name} 
                  className="w-32 h-32 object-contain bg-muted rounded"
                />
                {!watermark.is_default && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setDefaultWatermark(watermark.id)}
                    className="w-full"
                  >
                    ডিফল্ট হিসেবে সেট করুন
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WatermarksManager;
