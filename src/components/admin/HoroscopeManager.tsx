import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const zodiacSigns = [
  { value: "মেষ", label: "মেষ (Aries)" },
  { value: "বৃষ", label: "বৃষ (Taurus)" },
  { value: "মিথুন", label: "মিথুন (Gemini)" },
  { value: "কর্কট", label: "কর্কট (Cancer)" },
  { value: "সিংহ", label: "সিংহ (Leo)" },
  { value: "কন্যা", label: "কন্যা (Virgo)" },
  { value: "তুলা", label: "তুলা (Libra)" },
  { value: "বৃশ্চিক", label: "বৃশ্চিক (Scorpio)" },
  { value: "ধনু", label: "ধনু (Sagittarius)" },
  { value: "মকর", label: "মকর (Capricorn)" },
  { value: "কুম্ভ", label: "কুম্ভ (Aquarius)" },
  { value: "মীন", label: "মীন (Pisces)" },
];

const HoroscopeManager = () => {
  const [horoscopes, setHoroscopes] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    sign: "মেষ",
    date: new Date().toISOString().split("T")[0],
    prediction: "",
    lucky_number: "",
    lucky_color: "",
  });

  useEffect(() => {
    fetchHoroscopes();
  }, []);

  const fetchHoroscopes = async () => {
    const { data, error } = await supabase
      .from("horoscope")
      .select("*")
      .order("date", { ascending: false })
      .limit(50);

    if (error) {
      toast.error("রাশিফল লোড করতে ব্যর্থ");
      return;
    }

    setHoroscopes(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("horoscope").insert([{
        sign: formData.sign,
        date: formData.date,
        prediction: formData.prediction,
        lucky_number: formData.lucky_number ? parseInt(formData.lucky_number) : null,
        lucky_color: formData.lucky_color || null,
      }]);

      if (error) throw error;

      toast.success("রাশিফল সফলভাবে যোগ হয়েছে!");
      setFormData({
        sign: "মেষ",
        date: new Date().toISOString().split("T")[0],
        prediction: "",
        lucky_number: "",
        lucky_color: "",
      });
      fetchHoroscopes();
    } catch (error: any) {
      if (error.message.includes("duplicate")) {
        toast.error("এই রাশি এবং তারিখের জন্য ইতিমধ্যে রাশিফল আছে");
      } else {
        toast.error(error.message || "রাশিফল যোগ করতে ব্যর্থ");
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>নতুন রাশিফল যোগ করুন</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>রাশি</Label>
                <Select 
                  value={formData.sign} 
                  onValueChange={(value) => setFormData({ ...formData, sign: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {zodiacSigns.map((sign) => (
                      <SelectItem key={sign.value} value={sign.value}>
                        {sign.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">তারিখ</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prediction">ভবিষ্যদ্বাণী</Label>
              <Textarea
                id="prediction"
                value={formData.prediction}
                onChange={(e) => setFormData({ ...formData, prediction: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lucky_number">ভাগ্যবান সংখ্যা (ঐচ্ছিক)</Label>
                <Input
                  id="lucky_number"
                  type="number"
                  value={formData.lucky_number}
                  onChange={(e) => setFormData({ ...formData, lucky_number: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lucky_color">ভাগ্যবান রঙ (ঐচ্ছিক)</Label>
                <Input
                  id="lucky_color"
                  value={formData.lucky_color}
                  onChange={(e) => setFormData({ ...formData, lucky_color: e.target.value })}
                  placeholder="যেমন: লাল, সবুজ"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              রাশিফল যোগ করুন
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>সকল রাশিফল ({horoscopes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {horoscopes.map((item) => (
              <div key={item.id} className="border border-border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{item.sign}</h3>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.date).toLocaleDateString("bn-BD")}
                    </p>
                  </div>
                  {item.lucky_number && (
                    <span className="text-sm bg-accent text-accent-foreground px-2 py-1 rounded">
                      ভাগ্যবান সংখ্যা: {item.lucky_number}
                    </span>
                  )}
                </div>
                <p className="text-sm">{item.prediction}</p>
                {item.lucky_color && (
                  <p className="text-xs text-muted-foreground">
                    ভাগ্যবান রঙ: {item.lucky_color}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HoroscopeManager;
