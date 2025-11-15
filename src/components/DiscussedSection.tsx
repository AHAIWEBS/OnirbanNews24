import { useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const discussedPosts = [
  {
    id: 1,
    title: "অর্থনৈতিক সংকট মোকাবেলায় সরকারের নতুন পদক্ষেপ",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop",
  },
  {
    id: 2,
    title: "জলবায়ু পরিবর্তনে বাংলাদেশের ঝুঁকি বৃদ্ধি",
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=500&fit=crop",
  },
  {
    id: 3,
    title: "শিক্ষা ব্যবস্থায় আধুনিকায়নের নতুন উদ্যোগ",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop",
  },
  {
    id: 4,
    title: "স্বাস্থ্য সেবায় বৈপ্লবিক পরিবর্তন আসছে",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=500&fit=crop",
  },
  {
    id: 5,
    title: "প্রযুক্তি খাতে বিনিয়োগ বাড়াতে নতুন নীতিমালা",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=500&fit=crop",
  },
];

const DiscussedSection = () => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-accent" />
        <h2 className="text-2xl font-bold">আলোচিত</h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayPlugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {discussedPosts.map((post) => (
            <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/4">
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Quotation Mark */}
                  <div className="absolute top-4 left-4 text-white/40 text-6xl leading-none font-serif">
                    "
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </section>
  );
};

export default DiscussedSection;
