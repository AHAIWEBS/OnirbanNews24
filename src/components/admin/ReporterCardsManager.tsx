import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import QRCode from "qrcode";

const ReporterCardsManager = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [formData, setFormData] = useState({
    designation: "",
    district: "",
    upazila: "",
  });

  useEffect(() => {
    fetchCards();
    fetchUsers();
  }, []);

  const fetchCards = async () => {
    const { data, error } = await supabase
      .from("reporter_cards")
      .select("*, profiles(full_name, email)")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("কার্ড লোড করতে ব্যর্থ");
      return;
    }

    setCards(data || []);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email");

    if (error) return;
    setUsers(data || []);
  };

  const generateCardNumber = () => {
    return `REP${Date.now().toString().slice(-8)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) {
      toast.error("অনুগ্রহ করে একজন ব্যবহারকারী নির্বাচন করুন");
      return;
    }

    try {
      const cardNumber = generateCardNumber();
      const qrData = JSON.stringify({
        cardNumber,
        userId: selectedUser,
        designation: formData.designation,
        issueDate: new Date().toISOString(),
      });

      const qrCodeDataURL = await QRCode.toDataURL(qrData);

      const { error } = await supabase.from("reporter_cards").insert([{
        user_id: selectedUser,
        card_number: cardNumber,
        designation: formData.designation,
        district: formData.district,
        upazila: formData.upazila,
        qr_code_data: qrCodeDataURL,
      }]);

      if (error) throw error;

      toast.success("প্রতিনিধি কার্ড সফলভাবে তৈরি হয়েছে!");
      setFormData({ designation: "", district: "", upazila: "" });
      setSelectedUser("");
      fetchCards();
    } catch (error: any) {
      toast.error(error.message || "কার্ড তৈরি করতে ব্যর্থ");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>নতুন প্রতিনিধি কার্ড তৈরি করুন</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>ব্যবহারকারী নির্বাচন করুন</Label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              >
                <option value="">নির্বাচন করুন</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">পদবী</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="যেমন: জেলা প্রতিনিধি"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="district">জেলা</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="upazila">উপজেলা</Label>
                <Input
                  id="upazila"
                  value={formData.upazila}
                  onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              কার্ড তৈরি করুন
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>প্রতিনিধি কার্ডসমূহ ({cards.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div key={card.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{card.profiles?.full_name}</h3>
                    <p className="text-sm text-muted-foreground">{card.designation}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {card.district}, {card.upazila}
                    </p>
                  </div>
                  <img src={card.qr_code_data} alt="QR Code" className="w-20 h-20" />
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs font-mono text-muted-foreground">
                    কার্ড নং: {card.card_number}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ইস্যু: {new Date(card.issue_date).toLocaleDateString("bn-BD")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReporterCardsManager;
