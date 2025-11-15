import { useState } from "react";
import frame1 from "@/assets/frames/frame-1.jpg";
import frame2 from "@/assets/frames/frame-2.jpg";
import frame3 from "@/assets/frames/frame-3.png";
import frame4 from "@/assets/frames/frame-4.jpg";
import frame5 from "@/assets/frames/frame-5.jpg";
import frame6 from "@/assets/frames/frame-6.webp";
import frame7 from "@/assets/frames/frame-7.png";

const frames = [frame1, frame2, frame3, frame4, frame5, frame6, frame7];

interface PostFrameOverlayProps {
  imageUrl: string;
  title: string;
  showFrameSelector?: boolean;
}

const PostFrameOverlay = ({ imageUrl, title, showFrameSelector = false }: PostFrameOverlayProps) => {
  const [selectedFrame, setSelectedFrame] = useState(0);

  if (!showFrameSelector) {
    return (
      <div className="relative w-full h-full group">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={frames[0]}
            alt="Frame"
            className="w-full h-full object-cover mix-blend-multiply opacity-80"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-[4/5]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
          <img
            src={frames[selectedFrame]}
            alt="Frame"
            className="w-full h-full object-cover mix-blend-multiply opacity-80"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {frames.map((frame, index) => (
          <button
            key={index}
            onClick={() => setSelectedFrame(index)}
            className={`relative w-20 h-20 rounded border-2 transition-all ${
              selectedFrame === index
                ? "border-primary scale-105"
                : "border-border hover:border-accent"
            }`}
          >
            <img
              src={frame}
              alt={`Frame ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostFrameOverlay;
