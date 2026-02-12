import { FC, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

type VideoItem = {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
};

const videos: VideoItem[] = [
  {
    id: 1,
    title: "Nova coleção BFashion",
    description: "Descubra as tendências que estão a marcar esta estação.",
    videoUrl: "/videos/1.mp4",
  },
  {
    id: 2,
    title: "Elegância Feminina 2026",
    description: "Peças sofisticadas para mulheres modernas.",
    videoUrl: "/videos/1.mp4",
  },
  {
    id: 3,
    title: "Behind The Brand",
    description: "Veja como escolhemos cada detalhe da coleção.",
    videoUrl: "/videos/1.mp4",
  },
  {
    id: 4,
    title: "Tendências da Semana",
    description: "Os looks mais desejados do momento.",
    videoUrl: "/videos/1.mp4",
  },
];

const VideoNewsCarousel: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex && isPlaying) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isPlaying]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const next = () => {
    setActiveIndex((prev) =>
      prev === videos.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? videos.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            Novidades BFashion
          </h2>
          <p className="text-gray-500">
            Explore os nossos vídeos e descubra as últimas tendências com Bander e Bibi!
          </p>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-6 justify-center items-center relative">
          <button
            onClick={prev}
            className="absolute left-0 bg-white shadow-md rounded-full p-3 hover:scale-105 transition z-20"
          >
            <ChevronLeft />
          </button>

          {videos.map((video, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={video.id}
                onClick={() => setActiveIndex(index)}
                className="relative cursor-pointer"
                animate={{
                  scale: isActive ? 1.08 : 0.75,
                  opacity: isActive ? 1 : 0.45,
                  y: isActive ? -10 : 10,
                }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <div
                  className={`relative rounded-3xl overflow-hidden shadow-xl bg-black transition-all ${
                    isActive ? "w-[300px] h-[520px]" : "w-[200px] h-[380px]"
                  }`}
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video.videoUrl}
                    loop
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <h3 className="font-semibold text-lg">{video.title}</h3>
                    <p className="text-sm opacity-90">
                      {video.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <button
            onClick={next}
            className="absolute right-0 bg-white shadow-md rounded-full p-3 hover:scale-105 transition z-20"
          >
            <ChevronRight />
          </button>
        </div>

        {/* MOBILE */}
        <div className="md:hidden relative w-full max-w-sm mx-auto">
          <AnimatePresence>
            <motion.div
              key={activeIndex}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -80) next();
                if (info.offset.x > 80) prev();
              }}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="relative w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl bg-black">
                <video
                  ref={(el) => (videoRefs.current[activeIndex] = el)}
                  src={videos[activeIndex].videoUrl}
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-20 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">
                    {videos[activeIndex].title}
                  </h3>
                  <p className="text-sm opacity-90">
                    {videos[activeIndex].description}
                  </p>
                </div>

                <button
                  onClick={togglePlay}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span className="text-sm font-medium">
                    Ver novidade agora
                  </span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-4">
            {videos.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-black" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoNewsCarousel;
