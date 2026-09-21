import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface SystemSectionProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenLab: () => void;
}

interface CategorySystemItem {
  id: ProductCategory;
  num: string;
  name: string;
  subtitle: string;
  count: number;
  role: string;
  description: string;
  materials: string;
  atmosphereBg: string;
  previewImage: string;
  accentDetail: string;
}

export const SystemSection: React.FC<SystemSectionProps> = ({
  onSelectCategory,
  onOpenLab,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('bases');

  const categories: CategorySystemItem[] = [
    {
      id: 'bases',
      num: '01',
      name: 'BASES',
      subtitle: 'THE MINERAL & CELLULAR MATRIX',
      count: 6,
      role: 'Foundational Structure & Osmotic Carrier',
      description:
        'Bioactive aloe inner-gel, Irish sea moss rich in 92 trace minerals, pure unrefined Ghanaian shea butter, and micronized volcanic clays (bentonite, kaolin, french green). The base dictates viscosity and skin contact.',
      materials: 'Crushed volcanic stone, marine mucilage, raw crystalline earth.',
      atmosphereBg: '#FAF6EE',
      previewImage:
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85',
      accentDetail: '6 PURE STRUCTURAL BASES',
    },
    {
      id: 'boosters',
      num: '02',
      name: 'BOOSTERS',
      subtitle: 'CRYO-DRIED BIOACTIVE EXTRACTS',
      count: 14,
      role: 'High-Potency Active Phytochemicals',
      description:
        'Flash-frozen at –40°C in oxygen-free chamber sachets. Golden curcumin, French beetroot, matcha EGCG polyphenols, activated coconut charcoal, hibiscus flower AHA anthocyanins, and wild blueberry enzymes. Zero thermal degradation.',
      materials: 'Vivid botanical powders, micronized crystalline polyphenols.',
      atmosphereBg: '#FDF7F2',
      previewImage:
        'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=85',
      accentDetail: '14 FLASH-FROZEN BIOACTIVES',
    },
    {
      id: 'gels',
      num: '03',
      name: 'GELS',
      subtitle: 'MOLECULAR HYDRATION VEHICLES',
      count: 2,
      role: 'Solvent & Transepidermal Delivery',
      description:
        'Biocompatible hydrophilic hydrogels that instantly dissolve the freeze-dried booster powders without heat or agitation, delivering instant hydration and cellular cushion deep into stratum corneum.',
      materials: 'Translucent aqueous matrix, cold-distilled marine dew.',
      atmosphereBg: '#F4F8F8',
      previewImage:
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=85',
      accentDetail: '2 HYDRATION MATRICES',
    },
    {
      id: 'oils',
      num: '04',
      name: 'OILS',
      subtitle: 'VIRGIN COLD-PRESSED LIPID SEALS',
      count: 4,
      role: 'Occlusive Shield & Fatty Acid Lock',
      description:
        'Single-origin virgin botanicals pressed below 35°C: Patagonian Rosehip (retinoic acid precursors), Israeli Jojoba (sebum-mimetic wax esters), Moroccan Argan (linoleic recovery), and Organic Australian Tea Tree (purifying terpinen-4-ol).',
      materials: 'Reflective liquid amber, golden unrefined lipids.',
      atmosphereBg: '#FDFBF2',
      previewImage:
        'https://images.unsplash.com/photo-1608248597359-bb43644fcfcb?auto=format&fit=crop&w=1200&q=85',
      accentDetail: '4 VIRGIN LIPID SEALS',
    },
  ];

  const currentItem = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <section
      className="relative w-full py-24 sm:py-32 transition-colors duration-700 select-none overflow-hidden border-b border-[#EFE7DA]"
      style={{ backgroundColor: currentItem.atmosphereBg }}
      data-cursor="EXPLORE"
    >
      <div className="max-w-[1520px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header: Huge Editorial Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#242321]/15">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F05401]" />
              <span className="micro-label text-[#736E65]">
                Section 02 • System Architecture
              </span>
            </div>
            <h2 className="headline-sub font-serif text-[#242321] uppercase">
              FOUR PARTS. <br />
              <span className="text-[#F05401] italic">INFINITE RITUALS.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm md:text-base text-[#5A554D] font-light leading-relaxed">
              Standard jars blend water, actives, and preservatives into an unstable emulsion. Masked By Me isolates each functional dimension until the exact minute you apply it to your skin.
            </p>
          </div>
        </div>

        {/* 4 Massive Typographic Rows */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Categories List */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#242321]/15">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;

              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setActiveCategory(cat.id)}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`group relative py-8 sm:py-10 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'pl-4 sm:pl-6' : 'hover:pl-4'
                  }`}
                  data-cursor="VIEW"
                >
                  {/* Active Indicator Orange Line */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#F05401]"
                    initial={false}
                    animate={{ opacity: isSelected ? 1 : 0, scaleY: isSelected ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-8">
                      {/* Number */}
                      <span
                        className={`font-mono text-sm sm:text-base tracking-widest uppercase transition-colors duration-300 ${
                          isSelected ? 'text-[#F05401] font-bold' : 'text-[#736E65] group-hover:text-[#242321]'
                        }`}
                      >
                        {cat.num}
                      </span>

                      {/* Giant Category Name */}
                      <h3
                        className={`font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase transition-all duration-300 ${
                          isSelected
                            ? 'text-[#242321] translate-x-2'
                            : 'text-[#242321]/50 group-hover:text-[#242321] group-hover:translate-x-1'
                        }`}
                      >
                        {cat.name}
                      </h3>
                    </div>

                    {/* Count Pill */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs sm:text-sm tracking-widest text-[#736E65] uppercase">
                        [{cat.count} INGREDIENTS]
                      </span>
                      <ArrowRight
                        size={18}
                        className={`transition-all duration-300 ${
                          isSelected
                            ? 'text-[#F05401] translate-x-1 opacity-100'
                            : 'text-[#242321]/30 opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subtitle & Role */}
                  <div className="mt-3 flex items-center gap-4 text-xs font-mono tracking-wider uppercase text-[#736E65]">
                    <span className="text-[#242321] font-semibold">{cat.subtitle}</span>
                    <span>•</span>
                    <span>{cat.role}</span>
                  </div>

                  {/* Expanded Detail when active */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-4 pt-2 overflow-hidden"
                      >
                        <p className="text-sm sm:text-base text-[#5A554D] leading-relaxed max-w-xl">
                          {cat.description}
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCategory(cat.id);
                            }}
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#F05401] hover:underline"
                          >
                            <span>VIEW ALL {cat.count} {cat.name}</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Art-Directed Image Preview & Material Specs */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 sticky top-28">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#E8DFC8] bg-[#242321] shadow-2xl">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentItem.previewImage}
                    alt={currentItem.name}
                    className="w-full h-full object-cover grayscale-[15%] contrast-110"
                  />
                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242321]/80 via-transparent to-[#242321]/30" />

                  {/* Floating Material Stamp */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white font-mono text-[10px] tracking-widest uppercase">
                    <span className="px-2.5 py-1 rounded bg-[#F05401] font-bold">
                      {currentItem.num} // {currentItem.name}
                    </span>
                    <span className="opacity-80">{currentItem.accentDetail}</span>
                  </div>

                  {/* Bottom Technical Spec overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white text-left space-y-2">
                    <span className="text-[9px] font-mono tracking-widest text-[#FEE7B5] uppercase block">
                      RAW TEXTURE & SOURCE MATERIAL
                    </span>
                    <p className="text-sm font-sans font-light leading-snug text-white/90">
                      {currentItem.materials}
                    </p>
                    <div className="pt-2 border-t border-white/20 flex items-center justify-between font-mono text-[10px]">
                      <span>ISOLATION PROTOCOL</span>
                      <span className="text-[#FEE7B5] font-semibold">100% UNADULTERATED</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Micro Quick CTA to Mask Lab */}
            <div className="mt-4 flex items-center justify-between px-2">
              <span className="text-xs font-mono text-[#736E65]">
                COMBINE 4 CATEGORIES IN THE MASK LAB
              </span>
              <button
                onClick={onOpenLab}
                className="text-xs font-mono font-bold uppercase tracking-wider text-[#242321] hover:text-[#F05401] flex items-center gap-1.5 transition-colors"
              >
                <span>OPEN LAB</span>
                <Sparkles size={12} className="text-[#F05401]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
