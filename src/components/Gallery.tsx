import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryImages } from "@/data/gallery";

export function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIdx(index);
  const closeLightbox = () => setSelectedIdx(null);

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % galleryImages.length);
  };

  return (
    <section id="gallery" className="relative w-full py-24 bg-[var(--navy)] text-[var(--parchment)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" as const }}
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[var(--gold)]" />
            <p className="font-sanskrit text-xs tracking-wider text-[var(--gold-soft)]">
              अतीतदृश्यम्
            </p>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl leading-tight">
            GLIMPSE OF <span className="italic text-[var(--gold-soft)]">TECHNIKA 2025</span>
          </h2>
          <p className="text-xs sm:text-sm tracking-wide text-[var(--parchment)]/60 uppercase mt-2 font-bold">
            Moments of Innovation & Victory
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.015 }}
              onClick={() => openLightbox(idx)}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 aspect-[4/3] cursor-pointer group"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold-soft)]">
                  Technica 2025
                </span>
                <p className="text-xs font-semibold text-[var(--parchment)] mt-1">
                  {image.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between w-full relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-soft)]">
                Image {selectedIdx + 1} of {galleryImages.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2 text-white hover:text-[var(--gold-soft)] transition-colors focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Stage (Image & Nav) */}
            <div className="relative flex-grow flex items-center justify-center max-h-[80vh] w-full my-4">
              {/* Prev Button */}
              <button
                onClick={showPrev}
                className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>

              <motion.img
                key={selectedIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={galleryImages[selectedIdx].src}
                alt={galleryImages[selectedIdx].alt}
                className="max-w-[90vw] max-h-[75vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />

              {/* Next Button */}
              <button
                onClick={showNext}
                className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center pb-4 relative z-10">
              <p className="text-sm font-semibold tracking-wide text-white">
                {galleryImages[selectedIdx].caption}
              </p>
              <p className="text-[9px] uppercase tracking-widest text-white/40 mt-1">
                Click outside to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
