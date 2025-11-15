import { useState } from "react";
import { X } from "lucide-react";

const photoStories = [
  {
    id: 1,
    title: "ঢাকার রাস্তায় জীবনযাত্রা",
    images: [
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1561187891-02cb29be4dde?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=800&h=600&fit=crop",
    ],
    photographer: "আরিফুল ইসলাম",
    time: "২ ঘণ্টা আগে",
  },
  {
    id: 2,
    title: "গ্রামবাংলার সৌন্দর্য",
    images: [
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500622538537-542d1d7a3069?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&h=600&fit=crop",
    ],
    photographer: "রাফিয়া সুলতানা",
    time: "৪ ঘণ্টা আগে",
  },
];

const PhotoGallerySection = () => {
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
  }>({ isOpen: false, images: [], currentIndex: 0 });

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ isOpen: true, images, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, images: [], currentIndex: 0 });
  };

  const nextImage = () => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };

  const prevImage = () => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex === 0
          ? prev.images.length - 1
          : prev.currentIndex - 1,
    }));
  };

  return (
    <>
      <section className="py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-primary" />
          <h2 className="text-2xl font-bold">ফটো গ্যালারি</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {photoStories.map((story) => (
            <div
              key={story.id}
              className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-2 gap-1">
                {story.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square cursor-pointer group overflow-hidden"
                    onClick={() => openLightbox(story.images, index)}
                  >
                    <img
                      src={image}
                      alt={`${story.title} - ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {index === 3 && story.images.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          +{story.images.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{story.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>📷 {story.photographer}</span>
                  <span>{story.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-accent z-10"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white text-4xl hover:text-accent"
          >
            ‹
          </button>

          <img
            src={lightbox.images[lightbox.currentIndex]}
            alt="Gallery"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white text-4xl hover:text-accent"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {lightbox.currentIndex + 1} / {lightbox.images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallerySection;
