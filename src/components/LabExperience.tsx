import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, Check, RefreshCw, ShoppingBag, Eye } from 'lucide-react';
import { Product, MaskFormula, ProductCategory } from '../types';
import { MaskedByMeLogo } from './MaskedByMeLogo';

interface LabExperienceProps {
  products: Product[];
  onAddFormulaToCart: (formula: MaskFormula) => void;
  onOpenProductDetail: (product: Product) => void;
  initialBooster?: Product | null;
}

export const LabExperience: React.FC<LabExperienceProps> = ({
  products,
  onAddFormulaToCart,
  onOpenProductDetail,
  initialBooster,
}) => {
  // Separate products by category
  const bases = products.filter((p) => p.category === 'bases');
  const boosters = products.filter((p) => p.category === 'boosters');
  const gels = products.filter((p) => p.category === 'gels');
  const oils = products.filter((p) => p.category === 'oils');

  // Step state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Selected components
  const [selectedBase, setSelectedBase] = useState<Product>(bases[0] || products[0]);
  const [selectedBooster, setSelectedBooster] = useState<Product>(
    initialBooster || boosters[0] || products[1]
  );
  const [selectedGel, setSelectedGel] = useState<Product>(gels[0] || products[2]);
  const [selectedOil, setSelectedOil] = useState<Product>(oils[0] || products[3]);

  // Assembly animation view state
  const [isAssembling, setIsAssembling] = useState(false);
  const [customMaskName, setCustomMaskName] = useState('Bespoke Bioactive Ritual');

  // Current category list based on step
  const getStepData = () => {
    switch (currentStep) {
      case 1:
        return {
          title: 'STEP 01 // CHOOSE A BASE',
          subtitle: 'The Mineral & Cellular Carrier',
          category: 'bases' as ProductCategory,
          items: bases,
          selected: selectedBase,
          setSelected: setSelectedBase,
        };
      case 2:
        return {
          title: 'STEP 02 // ADD A BOOSTER',
          subtitle: 'Flash Freeze-Dried Bioactive Active',
          category: 'boosters' as ProductCategory,
          items: boosters,
          selected: selectedBooster,
          setSelected: setSelectedBooster,
        };
      case 3:
        return {
          title: 'STEP 03 // ADD HYDRATION',
          subtitle: 'Pure Hydrophilic Delivery Matrix',
          category: 'gels' as ProductCategory,
          items: gels,
          selected: selectedGel,
          setSelected: setSelectedGel,
        };
      case 4:
        return {
          title: 'STEP 04 // FINISH WITH OIL',
          subtitle: 'Virgin Cold-Pressed Lipid Lock',
          category: 'oils' as ProductCategory,
          items: oils,
          selected: selectedOil,
          setSelected: setSelectedOil,
        };
    }
  };

  const stepData = getStepData();

  // Curated master presets
  const handleLoadPreset = (
    baseId: string,
    boosterId: string,
    gelId: string,
    oilId: string,
    name: string
  ) => {
    const b = bases.find((p) => p.id === baseId);
    const bo = boosters.find((p) => p.id === boosterId);
    const g = gels.find((p) => p.id === gelId);
    const o = oils.find((p) => p.id === oilId);
    if (b) setSelectedBase(b);
    if (bo) setSelectedBooster(bo);
    if (g) setSelectedGel(g);
    if (o) setSelectedOil(o);
    setCustomMaskName(name);
    setIsAssembling(true);
  };

  const handleSynthesizeAndAdd = () => {
    const formula: MaskFormula = {
      id: `formula-${Date.now()}`,
      name: customMaskName,
      targetGoal: `${selectedBooster.benefitTag} • ${selectedBase.name}`,
      base: selectedBase,
      booster: selectedBooster,
      gel: selectedGel,
      oil: selectedOil,
      createdAt: new Date().toLocaleDateString(),
    };
    onAddFormulaToCart(formula);
  };

  return (
    <section
      id="mask-lab"
      className="relative min-h-[100svh] w-full bg-[#FAF6EE] py-20 sm:py-28 select-none overflow-hidden border-b border-[#EFE7DA]"
      data-cursor="BUILD"
    >
      <div className="max-w-[1520px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Massive Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#242321]/15">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F05401]" />
              <span className="micro-label text-[#736E65]">
                Section 03 // Interactive Laboratory
              </span>
            </div>
            
            <h2 className="headline-cinema font-serif text-[#242321] uppercase">
              BUILD <br />
              <span className="text-[#F05401] italic">YOUR MASK.</span>
            </h2>
          </div>

          {/* Master Presets Quick Bar */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#736E65] uppercase">
              OR LOAD CURATED MASTER FORMULAS:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() =>
                  handleLoadPreset(
                    'base-seamoss',
                    'booster-turmeric',
                    'gel-sea-moss-marine',
                    'oil-rosehip',
                    'The Golden Radiance'
                  )
                }
                className="px-3 py-1.5 rounded-full border border-[#242321]/20 hover:border-[#F05401] hover:text-[#F05401] text-[#242321] text-[10px] font-mono tracking-wider uppercase transition-all"
              >
                Golden Radiance
              </button>
              <button
                onClick={() =>
                  handleLoadPreset(
                    'base-bentonite',
                    'booster-activated-charcoal',
                    'gel-aloe-vera-matrix',
                    'oil-tea-tree',
                    'The Obsidian Detox'
                  )
                }
                className="px-3 py-1.5 rounded-full border border-[#242321]/20 hover:border-[#F05401] hover:text-[#F05401] text-[#242321] text-[10px] font-mono tracking-wider uppercase transition-all"
              >
                Obsidian Detox
              </button>
              <button
                onClick={() =>
                  handleLoadPreset(
                    'base-aloe',
                    'booster-cucumber',
                    'gel-aloe-vera-matrix',
                    'oil-jojoba',
                    'The Barrier Quench'
                  )
                }
                className="px-3 py-1.5 rounded-full border border-[#242321]/20 hover:border-[#F05401] hover:text-[#F05401] text-[#242321] text-[10px] font-mono tracking-wider uppercase transition-all"
              >
                Barrier Quench
              </button>
            </div>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-b border-[#242321]/10 pb-6">
          {[
            { step: 1, name: '01 BASE', choice: selectedBase.name },
            { step: 2, name: '02 BOOSTER', choice: selectedBooster.name },
            { step: 3, name: '03 GEL', choice: selectedGel.name },
            { step: 4, name: '04 OIL', choice: selectedOil.name },
          ].map((item) => {
            const isCurrent = currentStep === item.step;
            return (
              <button
                key={item.step}
                onClick={() => {
                  setCurrentStep(item.step as 1 | 2 | 3 | 4);
                  setIsAssembling(false);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-[#242321] text-[#FFFDF8] border-[#242321] shadow-lg'
                    : 'bg-[#FFFDF8] text-[#242321] border-[#E8DFC8] hover:border-[#242321]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] tracking-widest uppercase ${
                      isCurrent ? 'text-[#F05401] font-bold' : 'text-[#736E65]'
                    }`}
                  >
                    {item.name}
                  </span>
                  <Check size={14} className={isCurrent ? 'text-[#F05401]' : 'text-emerald-600'} />
                </div>
                <div className="font-serif text-lg sm:text-xl font-medium tracking-wide mt-1 truncate">
                  {item.choice}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Studio Stage: Step View OR Assembled Ritual Composition */}
        {!isAssembling ? (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Giant Selected Ingredient Display */}
            <div className="lg:col-span-7">
              <div className="bg-[#FFFDF8] border border-[#E8DFC8] rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
                
                {/* Step Subtitle */}
                <div className="flex items-center justify-between border-b border-[#242321]/10 pb-4">
                  <span className="font-mono text-xs text-[#F05401] font-bold tracking-widest uppercase">
                    {stepData.title}
                  </span>
                  <span className="font-mono text-xs text-[#736E65] uppercase">
                    {stepData.subtitle}
                  </span>
                </div>

                <div className="my-8 grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
                  
                  {/* Selected Ingredient Imagery */}
                  <div className="sm:col-span-6 relative aspect-square rounded-2xl overflow-hidden border border-[#E8DFC8] bg-[#FAF8F2] shadow-md">
                    <img
                      src={stepData.selected.rawIngredientImage}
                      alt={stepData.selected.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#242321]/70 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 text-white font-mono text-[10px] uppercase">
                      <span className="block text-[#FEE7B5]">NET VOLUME:</span>
                      <span className="font-bold">{stepData.selected.netVol} POUCH</span>
                    </div>
                  </div>

                  {/* Selected Specs */}
                  <div className="sm:col-span-6 space-y-4">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#F05401] px-2.5 py-1 rounded bg-[#FFF2EB] border border-[#FCD9C6]">
                      {stepData.selected.benefitTag}
                    </span>

                    <h3 className="font-serif text-4xl sm:text-5xl uppercase text-[#242321] leading-none">
                      {stepData.selected.name}
                    </h3>
                    
                    <span className="font-serif italic text-xl text-[#736E65] block">
                      {stepData.selected.subtitle}
                    </span>

                    <p className="text-sm text-[#5A554D] leading-relaxed font-light">
                      {stepData.selected.description}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => onOpenProductDetail(stepData.selected)}
                        className="text-xs font-mono font-bold tracking-wider text-[#242321] hover:text-[#F05401] flex items-center gap-1.5 transition-colors uppercase"
                      >
                        <Eye size={13} />
                        <span>VIEW FULL INCI & PROVENANCE</span>
                      </button>
                    </div>
                  </div>

                </div>

                {/* Step Navigation Bar */}
                <div className="pt-6 border-t border-[#242321]/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (currentStep > 1) setCurrentStep((currentStep - 1) as 1 | 2 | 3 | 4);
                    }}
                    disabled={currentStep === 1}
                    className="text-xs font-mono tracking-widest uppercase text-[#736E65] hover:text-[#242321] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    <span>PREVIOUS STEP</span>
                  </button>

                  {currentStep < 4 ? (
                    <button
                      onClick={() => setCurrentStep((currentStep + 1) as 1 | 2 | 3 | 4)}
                      className="px-6 py-3 bg-[#242321] text-white hover:bg-[#F05401] transition-colors font-mono text-xs tracking-widest uppercase font-bold flex items-center gap-2 rounded-full"
                    >
                      <span>NEXT STEP</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsAssembling(true)}
                      className="px-8 py-3.5 bg-[#F05401] hover:bg-[#d94b00] text-white transition-colors font-mono text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2 rounded-full shadow-lg"
                    >
                      <Sparkles size={14} />
                      <span>SYNTHESIZE RITUAL</span>
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* Right: Ingredient Choice Selector Ribbon */}
            <div className="lg:col-span-5 space-y-3 max-h-[640px] overflow-y-auto pr-2">
              <span className="font-mono text-xs text-[#736E65] tracking-widest uppercase block mb-2">
                SELECT {stepData.category.toUpperCase()} ({stepData.items.length} OPTIONS):
              </span>

              {stepData.items.map((item) => {
                const isSelected = stepData.selected.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => stepData.setSelected(item)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between gap-4 transition-all ${
                      isSelected
                        ? 'bg-[#FFFDF8] border-[#F05401] ring-1 ring-[#F05401] shadow-md'
                        : 'bg-[#FAF6EE] border-[#E8DFC8] hover:border-[#242321]/40'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#E8DFC8] bg-white flex-shrink-0">
                        <img
                          src={item.rawIngredientImage}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-serif text-lg font-medium text-[#242321]">
                          {item.name}
                        </div>
                        <span className="text-[10px] font-mono text-[#736E65] uppercase">
                          {item.benefitTag}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-[#242321] block">
                        ${item.price}
                      </span>
                      {isSelected && (
                        <span className="text-[9px] font-mono text-[#F05401] font-bold uppercase">
                          SELECTED
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        ) : (
          /* FORMULA ASSEMBLY ANIMATION VIEW */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-10 bg-[#FFFDF8] border border-[#E8DFC8] rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden"
          >
            {/* Top Assembly Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#242321]/10 pb-6">
              <div>
                <span className="text-[10px] font-mono text-[#F05401] font-bold tracking-[0.25em] uppercase block">
                  FORMULATION SYNTHESIS COMPLETE
                </span>
                <input
                  type="text"
                  value={customMaskName}
                  onChange={(e) => setCustomMaskName(e.target.value)}
                  className="font-serif text-3xl sm:text-5xl uppercase text-[#242321] bg-transparent border-b border-dashed border-[#242321]/30 focus:border-[#F05401] focus:outline-none mt-1 w-full max-w-xl"
                  title="Rename Your Custom Ritual"
                />
              </div>

              <div className="text-right font-mono">
                <span className="text-3xl font-bold text-[#242321] block">
                  $42.00 USD
                </span>
                <span className="text-[10px] text-[#F05401] uppercase font-bold tracking-wider">
                  SPECIAL 4-PART BUNDLE RATE (SAVE $10)
                </span>
              </div>
            </div>

            {/* 4-Component Collision Assembly Visual */}
            <div className="my-12 relative flex items-center justify-center min-h-[360px] sm:min-h-[420px]">
              
              {/* Center Assembled Ceramic Mixing Bowl */}
              <div className="relative z-20 w-48 h-48 sm:w-60 sm:h-60 rounded-full border-4 border-[#E8DFC8] bg-[#FAF8F2] shadow-2xl flex flex-col items-center justify-center p-6 text-center">
                <MaskedByMeLogo variant="orange" size="xs" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#736E65] mt-2">
                  FRESH EMULSION
                </span>
                <span className="font-serif text-lg text-[#242321] font-semibold mt-1">
                  Ready to Blend
                </span>
                <span className="text-[8px] font-mono text-[#F05401] mt-1 font-bold">
                  COMPLIMENTARY CERAMIC BOWL INCLUDED
                </span>
              </div>

              {/* 1. Base Entering From Left */}
              <motion.div
                initial={{ x: '-160%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-2 sm:left-12 z-10 w-36 sm:w-48 bg-[#FAF6EE] p-4 rounded-xl border border-[#E8DFC8] shadow-lg text-left"
              >
                <span className="text-[8px] font-mono text-[#F05401] font-bold block uppercase">
                  01 BASE
                </span>
                <h4 className="font-serif text-base text-[#242321] uppercase font-bold truncate">
                  {selectedBase.name}
                </h4>
                <span className="text-[9px] font-mono text-[#736E65] block">
                  {selectedBase.netVol}
                </span>
              </motion.div>

              {/* 2. Booster Entering From Top */}
              <motion.div
                initial={{ y: '-160%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 z-10 w-36 sm:w-48 bg-[#FAF6EE] p-4 rounded-xl border border-[#E8DFC8] shadow-lg text-center"
              >
                <span className="text-[8px] font-mono text-[#F05401] font-bold block uppercase">
                  02 BOOSTER
                </span>
                <h4 className="font-serif text-base text-[#242321] uppercase font-bold truncate">
                  {selectedBooster.name}
                </h4>
                <span className="text-[9px] font-mono text-[#736E65] block">
                  5g Cryo-Active
                </span>
              </motion.div>

              {/* 3. Gel Entering From Bottom */}
              <motion.div
                initial={{ y: '160%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 z-10 w-36 sm:w-48 bg-[#FAF6EE] p-4 rounded-xl border border-[#E8DFC8] shadow-lg text-center"
              >
                <span className="text-[8px] font-mono text-[#F05401] font-bold block uppercase">
                  03 HYDRATION
                </span>
                <h4 className="font-serif text-base text-[#242321] uppercase font-bold truncate">
                  {selectedGel.name}
                </h4>
                <span className="text-[9px] font-mono text-[#736E65] block">
                  10ml Gel Matrix
                </span>
              </motion.div>

              {/* 4. Oil Entering From Right */}
              <motion.div
                initial={{ x: '160%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-2 sm:right-12 z-10 w-36 sm:w-48 bg-[#FAF6EE] p-4 rounded-xl border border-[#E8DFC8] shadow-lg text-right"
              >
                <span className="text-[8px] font-mono text-[#F05401] font-bold block uppercase">
                  04 LIPID SEAL
                </span>
                <h4 className="font-serif text-base text-[#242321] uppercase font-bold truncate">
                  {selectedOil.name}
                </h4>
                <span className="text-[9px] font-mono text-[#736E65] block">
                  5ml Virgin Oil
                </span>
              </motion.div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-8 border-t border-[#242321]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setIsAssembling(false)}
                className="text-xs font-mono tracking-widest uppercase text-[#736E65] hover:text-[#242321] flex items-center gap-2"
              >
                <RefreshCw size={14} />
                <span>EDIT COMPONENTS</span>
              </button>

              <button
                onClick={handleSynthesizeAndAdd}
                className="w-full sm:w-auto px-10 py-5 bg-[#242321] hover:bg-[#F05401] text-white transition-colors duration-300 font-mono text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 rounded-full shadow-2xl"
              >
                <ShoppingBag size={16} />
                <span>ADD BESPOKE RITUAL TO BAG • $42 USD</span>
              </button>
            </div>

          </motion.div>
        )}

      </div>
    </section>
  );
};
