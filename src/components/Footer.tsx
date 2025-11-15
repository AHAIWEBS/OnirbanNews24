const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">আমাদের সম্পর্কে</h3>
            <p className="text-sm opacity-90">
              বাংলা সংবাদ - বিশ্বস্ত সংবাদের উৎস। সত্য ও নিরপেক্ষ সংবাদ পরিবেশনে আমরা প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">গোপনীয়তা নীতি</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">ব্যবহারের শর্তাবলী</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">যোগাযোগ</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">বিজ্ঞাপন</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">বিভাগসমূহ</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">জাতীয়</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">আন্তর্জাতিক</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">খেলা</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">বিনোদন</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">যোগাযোগ</h3>
            <ul className="space-y-2 text-sm">
              <li className="opacity-90">📧 info@banglanews.com</li>
              <li className="opacity-90">📱 +৮৮০ ১২৩৪-৫৬৭৮৯০</li>
              <li className="opacity-90">📍 ঢাকা, বাংলাদেশ</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-90">
          <p>© ২০২৫ বাংলা সংবাদ। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
