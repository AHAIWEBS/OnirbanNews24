import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import PostsManager from "@/components/admin/PostsManager";
import ReporterCardsManager from "@/components/admin/ReporterCardsManager";
import WatermarksManager from "@/components/admin/WatermarksManager";
import SpecialContentManager from "@/components/admin/SpecialContentManager";
import HoroscopeManager from "@/components/admin/HoroscopeManager";

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("আপনাকে লগইন করতে হবে");
        navigate("/auth");
        return;
      }

      setUser(user);

      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (error || !roles) {
        toast.error("আপনার অ্যাডমিন অ্যাক্সেস নেই");
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      toast.error("অ্যাক্সেস যাচাই করতে ব্যর্থ");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("লগআউট সফল");
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">অ্যাডমিন প্যানেল</h1>
            <p className="text-sm text-muted-foreground">বাংলা সংবাদ</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/")}>
              হোমে যান
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              লগআউট
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="posts">পোস্ট</TabsTrigger>
            <TabsTrigger value="reporters">প্রতিনিধি কার্ড</TabsTrigger>
            <TabsTrigger value="watermarks">ওয়াটারমার্ক</TabsTrigger>
            <TabsTrigger value="special">বিশেষ কন্টেন্ট</TabsTrigger>
            <TabsTrigger value="horoscope">রাশিফল</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <PostsManager userId={user?.id} />
          </TabsContent>

          <TabsContent value="reporters" className="mt-6">
            <ReporterCardsManager />
          </TabsContent>

          <TabsContent value="watermarks" className="mt-6">
            <WatermarksManager userId={user?.id} />
          </TabsContent>

          <TabsContent value="special" className="mt-6">
            <SpecialContentManager userId={user?.id} />
          </TabsContent>

          <TabsContent value="horoscope" className="mt-6">
            <HoroscopeManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
