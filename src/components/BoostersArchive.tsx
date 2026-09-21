import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Plus, Sparkles, Filter } from 'lucide-react';
import { Product } from '../types';
import { MaskedByMeLogo } from './MaskedByMeLogo';

interface BoostersArchiveProps {
  boosters: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenLabWithBooster: (booster: Product) => void;
}

export const BoostersArchive: React.FC<BoostersArchiveProps> = ({
  boosters,
  onSelectProduct,
  onAddToCart,
  onOpenLabWithBooster,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<string>('all');

  const goals = [
    { id: 'all', label: 'ALL 14' },
    { id: 'glow', label: 'GLOW & RADIANCE' },
    { id: 'detox', label: 'DETOX & CLARIFY' },
    { id: 'hydrate', label: 'HYDRATION' },
    { id: 'nourish', label: 'NOURISH & BARRIER' },
    { id: 'firm', label: 'FIRM & CELLULAR' },
  ];

  const filteredBoosters = boosters.filter((b) => {
    if (selectedGoal === 'all') return true;
    return b.skinGoals.some((g) => g.toLowerCase() === selectedGoal.toLowerCase());
  });

  return (
    <section
      className="relative w-full py-28 sm:py-36 bg-[#FFFDF8] overflow-hidden select-none border-b border-[#EFE7DA]"
      data-cursor="EXPLORE"
    >
      {/* Background Subtle Accent Aura */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full blur-[150px] bg-[#F05401]/5 pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Massive Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-16 border-b border-[#242321]/15">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F05401]" />
              <span className="micro-label text-[#736E65]">
                Part 02 • High Potency Bioactives
              </span>
            </div>
            
            <h2 className="headline-huge font-serif text-[#242321] uppercase">
              14 <br />
              <span className="text-[#F05401] italic">BOOSTERS.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-base text-[#5A554D] font-light leading-relaxed mb-6">
              Cryogenic freeze-drying at –40°C eliminates thermal oxidation. 99% of original cellular enzymes and antioxidant polyphenols remain preserved in single-dose nitrogen envelopes.
            </p>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id)}
                  className={`px-3 py-1.5 rounded-full font-mono text-[9px] tracking-widest uppercase transition-all ${
                    selectedGoal === g.id
                      ? 'bg-[#242321] text-white shadow-sm'
                      : 'border border-[#242321]/20 text-[#5A554D] hover:border-[#242321] hover:text-[#242321]'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Magazine-Style Asymmetric Visual Archive */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {filteredBoosters.map((booster, index) => {
            // Asymmetric rhythm layout: alternate spans
            const isFeaturedLarge = index % 5 === 0;
            const isMedium = index % 5 === 1 || index % 5 === 2;
            const spanClass = isFeaturedLarge
              ? 'lg:col-span-8'
              : isMedium
              ? 'lg:col-span-4'
              : 'lg:col-span-6';

            return (
              <motion.div
                key={booster.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                className={`${spanClass} group relative flex flex-col justify-between`}
              >
                {/* Product Composition Box */}
                <div
                  className={`relative w-full rounded-2xl overflow-hidden border border-[#E8DFC8] bg-[#FAF8F2] p-8 sm:p-10 flex flex-col justify-between shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-[#242321]/30 ${
                    isFeaturedLarge ? 'min-h-[580px]' : 'min-h-[480px]'
                  }`}
                >
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between z-10">
                    <span className="font-mono text-xs text-[#F05401] font-bold tracking-widest uppercase">
                      LOT 0{index + 1} // CRYO-ACTIVE
                    </span>
                    <span className="font-mono text-xs text-[#242321] font-bold">
                      ${booster.price} USD
                    </span>
                  </div>

                  {/* Center Content: Layered Sachet & Powder Art */}
                  <div className="my-8 relative flex flex-col items-start z-10">
                    
                    <span className="font-mono text-[9px] tracking-widest uppercase text-[#736E65] mb-1">
                      {booster.benefitTag}
                    </span>

                    <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#242321] leading-none">
                      {booster.name}
                    </h3>
                    <span className="font-serif italic text-xl sm:text-2xl text-[#736E65] mt-1">
                      {booster.subtitle}
                    </span>

                    {/* Escaped Macro Photo & Powder Mound */}
                    <div className="relative mt-6 w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#E8DFC8] bg-white shadow-inner">
                      <img
                        src={booster.rawIngredientImage}
                        alt={booster.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#242321]/60 via-transparent to-transparent" />

                      {/* Pill Badge */}
                      <div className="absolute bottom-3 left-3 bg-[#FFFDF8]/90 backdrop-blur-sm px-2.5 py-1 rounded text-[8px] font-mono tracking-widest uppercase text-[#242321] border border-[#E8DFC8]">
                        5G CRYO-POWDER
                      </div>
                    </div>

                    <p className="mt-4 text-xs sm:text-sm text-[#5A554D] leading-relaxed line-clamp-2 font-light">
                      {booster.description}
                    </p>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-4 border-t border-[#242321]/10 flex items-center justify-between gap-3 z-10">
                    <button
                      onClick={() => onSelectProduct(booster)}
                      data-cursor="VIEW"
                      className="text-xs font-mono font-bold tracking-wider uppercase text-[#242321] hover:text-[#F05401] flex items-center gap-1.5 transition-colors"
                    >
                      <span>INSPECT</span>
                      <ArrowRight size={12} />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenLabWithBooster(booster)}
                        data-cursor="BUILD"
                        className="px-3.5 py-2 rounded-full border border-[#F05401] text-[#F05401] hover:bg-[#F05401] hover:text-white transition-colors font-mono text-[9px] tracking-widest uppercase font-semibold flex items-center gap-1"
                      >
                        <Sparkles size={11} />
                        <span>RITUAL LAB</span>
                      </button>

                      <button
                        onClick={() => onAddToCart(booster)}
                        data-cursor="ADD"
                        className="px-3.5 py-2 rounded-full bg-[#242321] text-white hover:bg-[#F05401] transition-colors font-mono text-[9px] tracking-widest uppercase font-semibold flex items-center gap-1"
                      >
                        <Plus size={11} />
                        <span>ADD</span>
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
