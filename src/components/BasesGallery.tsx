import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Plus, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { MaskedByMeLogo } from './MaskedByMeLogo';

interface BasesGalleryProps {
  bases: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const BasesGallery: React.FC<BasesGalleryProps> = ({
  bases,
  onSelectProduct,
  onAddToCart,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const clampedIndex = Math.max(0, Math.min(index, bases.length - 1));
    const container = scrollContainerRef.current;
    const children = container.children;
    if (children[clampedIndex]) {
      (children[clampedIndex] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest',
      });
      setCurrentIndex(clampedIndex);
    }
  };

  return (
    <section
      className="relative w-full py-24 sm:py-32 bg-[#FAF6EE] overflow-hidden select-none border-b border-[#EFE7DA]"
      data-cursor="DRAG"
    >
      {/* Top Editorial Headline */}
      <div className="max-w-[1520px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F05401]" />
            <span className="micro-label text-[#736E65]">
              Part 01 • The Matrix
            </span>
          </div>
          <h2 className="headline-sub font-serif text-[#242321] uppercase">
            6 STRUCTURAL <br />
            <span className="text-[#F05401] italic">BASES.</span>
          </h2>
        </div>

        {/* Navigation Controls & Progress */}
        <div className="flex items-center gap-6">
          <div className="font-mono text-xs tracking-widest text-[#736E65]">
            <span className="text-[#242321] font-bold text-sm">
              0{currentIndex + 1}
            </span>{' '}
            / 0{bases.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border border-[#242321]/20 flex items-center justify-center text-[#242321] hover:border-[#242321] hover:bg-[#242321] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
              aria-label="Previous Base"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => scrollToIndex(currentIndex + 1)}
              disabled={currentIndex === bases.length - 1}
              className="w-12 h-12 rounded-full border border-[#242321]/20 flex items-center justify-center text-[#242321] hover:border-[#242321] hover:bg-[#242321] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
              aria-label="Next Base"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Drag / Trackpad Gallery */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-8 overflow-x-auto px-6 sm:px-8 lg:px-12 scrollbar-none snap-x snap-mandatory pt-4 pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={(e) => {
          const target = e.currentTarget;
          const scrollLeft = target.scrollLeft;
          const itemWidth = target.clientWidth * 0.75;
          const idx = Math.round(scrollLeft / itemWidth);
          if (idx !== currentIndex && idx >= 0 && idx < bases.length) {
            setCurrentIndex(idx);
          }
        }}
      >
        {bases.map((base, idx) => {
          return (
            <div
              key={base.id}
              className="flex-shrink-0 w-[85vw] sm:w-[540px] lg:w-[620px] snap-start relative group"
            >
              {/* Massive Editorial Frame */}
              <div className="relative h-full bg-[#FFFDF8] border border-[#E8DFC8] rounded-2xl overflow-hidden p-8 sm:p-10 flex flex-col justify-between shadow-xl transition-transform duration-500 hover:-translate-y-1">
                
                {/* Top Technical Metadata */}
                <div className="flex items-start justify-between border-b border-[#242321]/10 pb-6">
                  <div>
                    <span className="font-mono text-xs tracking-widest text-[#F05401] font-bold block mb-1">
                      0{idx + 1} // STRUCTURAL BASE
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#736E65] uppercase">
                      {base.benefitTag}
                    </span>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-lg font-bold text-[#242321] block">
                      ${base.price} USD
                    </span>
                    <span className="text-[10px] text-[#736E65] uppercase">
                      {base.netVol} POUCH
                    </span>
                  </div>
                </div>

                {/* Center: Massive Name + Overlapping Product Photo Escaping Grid */}
                <div className="my-8 relative">
                  
                  {/* Huge Ingredient Name */}
                  <h3 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight text-[#242321] uppercase leading-[0.9]">
                    {base.name}
                  </h3>
                  <span className="font-serif italic text-2xl sm:text-3xl text-[#736E65] block mt-1">
                    {base.subtitle}
                  </span>

                  {/* Escaped Product Image Overlay */}
                  <div className="relative mt-6 aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#E8DFC8] bg-[#FAF6EE]">
                    <img
                      src={base.rawIngredientImage}
                      alt={base.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[10%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#242321]/60 via-transparent to-transparent" />

                    {/* Sachet Mini Overlay */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#E8DFC8] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F05401]" />
                      <span className="font-mono text-[9px] tracking-wider text-[#242321] uppercase font-semibold">
                        CELLULAR DELIVERY MATRIX
                      </span>
                    </div>
                  </div>

                  {/* Micro Description */}
                  <p className="mt-6 text-sm text-[#5A554D] leading-relaxed line-clamp-2 font-light">
                    {base.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-[#242321]/10 flex items-center justify-between gap-4">
                  <button
                    onClick={() => onSelectProduct(base)}
                    data-cursor="VIEW"
                    className="text-xs font-mono font-bold tracking-widest uppercase text-[#242321] hover:text-[#F05401] flex items-center gap-2 transition-colors"
                  >
                    <span>INSPECT ACTIVES & PROVENANCE</span>
                    <ArrowRight size={13} />
                  </button>

                  <button
                    onClick={() => onAddToCart(base)}
                    data-cursor="ADD"
                    className="px-5 py-2.5 rounded-full bg-[#242321] text-white hover:bg-[#F05401] transition-colors font-mono text-[10px] tracking-widest uppercase font-semibold flex items-center gap-1.5"
                  >
                    <Plus size={12} />
                    <span>ADD SINGLE BASE</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
