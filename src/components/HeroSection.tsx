import HeroSlider from "./HeroSlider";

const HeroSection = () => {
  return (
    <section className="py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-accent" />
        <h2 className="text-2xl font-bold">প্রধান সংবাদ</h2>
      </div>
      <HeroSlider />
    </section>
  );
};

export default HeroSection;
