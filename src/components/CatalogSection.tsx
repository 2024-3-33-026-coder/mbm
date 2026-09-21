import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface CatalogSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenLabWithProduct?: (product: Product) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onOpenLabWithProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGoal, setSelectedGoal] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'ALL 28 INGREDIENTS', count: 28 },
    { id: 'bases', label: '01 BASES', count: 6 },
    { id: 'boosters', label: '02 BOOSTERS', count: 14 },
    { id: 'gels', label: '03 GELS', count: 2 },
    { id: 'oils', label: '04 OILS', count: 4 },
  ];

  const goals = [
    { id: 'all', label: 'ALL BENEFITS' },
    { id: 'glow', label: 'GLOW' },
    { id: 'hydrate', label: 'HYDRATE' },
    { id: 'detox', label: 'DETOX' },
    { id: 'nourish', label: 'NOURISH' },
    { id: 'refresh', label: 'SOOTHE' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesGoal =
      selectedGoal === 'all' || p.skinGoals.some((g) => g.toLowerCase() === selectedGoal.toLowerCase());
    return matchesCat && matchesGoal;
  });

  return (
    <section
      id="catalog"
      className="relative w-full py-28 sm:py-36 bg-[#FFFDF8] overflow-hidden select-none border-b border-[#EFE7DA]"
      data-cursor="EXPLORE"
    >
      <div className="max-w-[1520px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Massive Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#242321]/15">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F05401]" />
              <span className="micro-label text-[#736E65]">
                Section 04 // Complete Botanical Index
              </span>
            </div>
            
            <h2 className="headline-sub font-serif text-[#242321] uppercase">
              THE 28 <br />
              <span className="text-[#F05401] italic">RAW BIOACTIVES.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm text-[#5A554D] font-light leading-relaxed">
              Every single ingredient is certified 100% pure, single-origin, and harvested at peak biological activity. No synthetic binders, no parabens, no artificial fragrances.
            </p>
          </div>
        </div>

        {/* Minimal Editorial Filter Bar */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#242321]/10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-full font-mono text-[10px] tracking-widest uppercase transition-all ${
                  selectedCategory === c.id
                    ? 'bg-[#242321] text-white shadow-sm'
                    : 'border border-[#242321]/20 text-[#5A554D] hover:border-[#242321] hover:text-[#242321]'
                }`}
              >
                {c.label} [{c.count}]
              </button>
            ))}
          </div>

          {/* Goal Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGoal(g.id)}
                className={`text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded transition-colors ${
                  selectedGoal === g.id
                    ? 'text-[#F05401] font-bold underline underline-offset-4'
                    : 'text-[#736E65] hover:text-[#242321]'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

        </div>

        {/* Editorial Product Grid with Progressive Hover Reveal */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => {
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col justify-between cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                  data-cursor="VIEW"
                >
                  {/* Image Frame with Progressive Scale & Escaped Bounds */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#E8DFC8] bg-[#FAF8F2] shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:border-[#242321]/30">
                    <img
                      src={product.rawIngredientImage}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-108"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#242321]/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Category Label Pill Top */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="font-mono text-[8px] tracking-widest text-[#242321] uppercase bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded border border-[#E8DFC8]">
                        {product.category}
                      </span>
                    </div>

                    {/* Price Tag Top Right */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="font-mono text-xs font-bold text-white drop-shadow-md">
                        ${product.price}
                      </span>
                    </div>

                    {/* Bottom Progressive Details Appearing on Hover */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-2">
                      <div className="font-mono text-[9px] text-[#FEE7B5] uppercase tracking-widest">
                        {product.benefitTag}
                      </div>

                      <h3 className="font-serif text-2xl uppercase tracking-wide leading-tight">
                        {product.name}
                      </h3>

                      {/* Animated Orange Micro-line */}
                      <div className="w-0 group-hover:w-full h-[2px] bg-[#F05401] transition-all duration-400" />

                      {/* Quick Add Button Sliding into Position */}
                      <div className="pt-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[10px] font-mono tracking-wider text-white/80">
                          {product.netVol} POUCH
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                          }}
                          data-cursor="ADD"
                          className="px-3 py-1.5 rounded-full bg-[#F05401] hover:bg-white hover:text-[#242321] text-white font-mono text-[9px] tracking-widest uppercase font-bold flex items-center gap-1 transition-colors"
                        >
                          <Plus size={10} />
                          <span>ADD SINGLE</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
