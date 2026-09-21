import React, { useState, useMemo } from 'react';
import { Product, MaskFormula, ProductCategory } from '../types';
import { ALL_PRODUCTS, PRESET_RITUALS } from '../data/products';
import { SachetVisual } from './SachetVisual';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  ShoppingBag, 
  Layers, 
  Flame, 
  Droplets, 
  Sun,
  Info,
  Gift
} from 'lucide-react';

interface FormulaBuilderProps {
  onAddFormulaToCart: (formula: MaskFormula) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const FormulaBuilder: React.FC<FormulaBuilderProps> = ({
  onAddFormulaToCart,
  onOpenProductDetail,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Selected components
  const [selectedBase, setSelectedBase] = useState<Product | null>(
    ALL_PRODUCTS.find((p) => p.id === 'base-aloe') || null
  );
  const [selectedBooster, setSelectedBooster] = useState<Product | null>(
    ALL_PRODUCTS.find((p) => p.id === 'booster-turmeric') || null
  );
  const [selectedGel, setSelectedGel] = useState<Product | null>(
    ALL_PRODUCTS.find((p) => p.id === 'gel-hyaluronic') || null
  );
  const [selectedOil, setSelectedOil] = useState<Product | null>(
    ALL_PRODUCTS.find((p) => p.id === 'oil-jojoba') || null
  );

  const [customName, setCustomName] = useState<string>('The Luminous Alchemist');
  const [isWhisking, setIsWhisking] = useState<boolean>(false);

  // Categorized products
  const bases = useMemo(() => ALL_PRODUCTS.filter((p) => p.category === 'bases'), []);
  const boosters = useMemo(() => ALL_PRODUCTS.filter((p) => p.category === 'boosters'), []);
  const gels = useMemo(() => ALL_PRODUCTS.filter((p) => p.category === 'gels'), []);
  const oils = useMemo(() => ALL_PRODUCTS.filter((p) => p.category === 'oils'), []);

  // Compute combined skin benefits & primary color tone
  const combinedGoals = useMemo(() => {
    const set = new Set<string>();
    [selectedBase, selectedBooster, selectedGel, selectedOil].forEach((prod) => {
      if (prod) prod.skinGoals.forEach((g) => set.add(g.toUpperCase()));
    });
    return Array.from(set);
  }, [selectedBase, selectedBooster, selectedGel, selectedOil]);

  // Combined bowl color representation
  const bowlColor = useMemo(() => {
    if (!selectedBooster) return selectedBase?.colorAccent || '#EFE8DC';
    return selectedBooster.colorAccent;
  }, [selectedBase, selectedBooster]);

  // Handle Preset Selection
  const applyPreset = (presetId: string) => {
    const preset = PRESET_RITUALS.find((r) => r.id === presetId);
    if (!preset) return;

    setSelectedBase(ALL_PRODUCTS.find((p) => p.id === preset.baseId) || null);
    setSelectedBooster(ALL_PRODUCTS.find((p) => p.id === preset.boosterId) || null);
    setSelectedGel(ALL_PRODUCTS.find((p) => p.id === preset.gelId) || null);
    setSelectedOil(ALL_PRODUCTS.find((p) => p.id === preset.oilId) || null);
    setCustomName(preset.name);
    
    // trigger whimsical whisk animation
    setIsWhisking(true);
    setTimeout(() => setIsWhisking(false), 800);
  };

  const handleWhiskNow = () => {
    setIsWhisking(true);
    setTimeout(() => setIsWhisking(false), 1000);
  };

  const isComplete = selectedBase && selectedBooster && selectedGel && selectedOil;

  const handleSaveAndAddToCart = () => {
    if (!isComplete) return;

    const formula: MaskFormula = {
      id: `formula-${Date.now()}`,
      name: customName.trim() || 'My Custom Ritual',
      targetGoal: combinedGoals.join(' • '),
      base: selectedBase,
      booster: selectedBooster,
      gel: selectedGel,
      oil: selectedOil,
      createdAt: new Date().toLocaleDateString(),
    };

    onAddFormulaToCart(formula);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#F05401] font-semibold block mb-2">
          THE APOTHECARY LAB
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#242321] tracking-tight">
          Craft Your Bespoke Skin Ritual
        </h1>
        <p className="text-sm text-[#736E65] mt-3 leading-relaxed">
          Four distinct biochemical steps working in harmony. Combine a structural base, 
          freeze-dried phytonutrient booster, molecular hydration gel, and virgin cold-pressed lipid seal.
        </p>

        {/* Preset Quick Select Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mt-5">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#9C9484] mr-1">
            CURATED PRESETS:
          </span>
          {PRESET_RITUALS.map((ritual) => (
            <button
              key={ritual.id}
              onClick={() => applyPreset(ritual.id)}
              className="text-xs px-3 py-1.5 rounded-full border border-[#E8E0D2] bg-[#FAF6EE] hover:border-[#F05401] hover:text-[#F05401] transition-all font-medium text-[#4D4841]"
            >
              {ritual.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Mixing Bowl (Left/Center on desktop) & Step Selector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ========================================================
            LEFT COLUMN: THE CERAMIC FORMULATION BOWL VISUALIZER
           ======================================================== */}
        <div className="lg:col-span-5 bg-[#FAF6EE] border border-[#E8E0D2] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between shadow-sm sticky top-28">
          
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#736E65] font-semibold">
              REAL-TIME FORMULATION BOWL
            </span>
            <button
              onClick={handleWhiskNow}
              className="text-xs font-semibold uppercase tracking-wider text-[#F05401] hover:underline flex items-center gap-1"
            >
              <RotateCcw size={13} className={isWhisking ? 'animate-spin' : ''} />
              WHISK EMULSION
            </button>
          </div>

          {/* Ceramic Formulation Bowl Simulation */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-4 flex items-center justify-center">
            {/* Outer porcelain bowl rim & shadow */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFDF8] to-[#EBE4D5] border-4 border-[#DDD4C3] shadow-2xl flex items-center justify-center p-5 relative overflow-hidden">
              
              {/* Inner bowl depth gradient */}
              <div className="w-full h-full rounded-full bg-[#E5DDD0] shadow-inner relative flex items-center justify-center overflow-hidden border border-[#D0C7B6]">
                
                {/* Active Blend Liquid/Paste Visual */}
                <div
                  className={`w-4/5 h-4/5 rounded-full transition-all duration-700 relative overflow-hidden flex items-center justify-center shadow-lg ${
                    isWhisking ? 'scale-105 rotate-180' : ''
                  }`}
                  style={{
                    backgroundColor: bowlColor,
                    boxShadow: 'inset 0 4px 14px rgba(0,0,0,0.25)',
                  }}
                >
                  {/* Swirl texture */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-black/30" />
                  
                  {/* Powder grains & oil glazes */}
                  {selectedBooster && (
                    <div 
                      className="absolute inset-x-4 top-4 h-16 rounded-full blur-md opacity-50"
                      style={{ backgroundColor: selectedBooster.colorAccent }}
                    />
                  )}

                  {/* Whisk motion swirl ripples */}
                  <svg
                    viewBox="0 0 100 100"
                    className={`w-full h-full opacity-35 stroke-white fill-none transition-transform duration-1000 ${
                      isWhisking ? 'animate-spin' : ''
                    }`}
                  >
                    <path
                      d="M 50 15 C 70 15, 85 30, 85 50 C 85 70, 70 85, 50 85 C 30 85, 20 70, 20 50 C 20 35, 35 25, 50 25 C 65 25, 75 35, 75 50"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <span className="relative z-10 text-[9px] uppercase font-mono tracking-widest text-white/90 drop-shadow-md font-bold px-2 py-0.5 rounded bg-black/20 backdrop-blur-xs">
                    {selectedBase?.name} + {selectedBooster?.name}
                  </span>
                </div>

                {/* Bamboo spatula handle visual overlay */}
                <div className="absolute -top-3 -right-3 w-16 h-40 bg-gradient-to-b from-[#C49B66] via-[#B38855] to-[#8C6233] rounded-full transform rotate-45 opacity-85 shadow-md pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Formula Custom Name & Skin Goals */}
          <div className="w-full text-center space-y-2 mt-2">
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Name your ritual..."
              className="w-full text-center font-serif text-xl sm:text-2xl font-bold bg-transparent border-b border-transparent hover:border-[#D0C7B6] focus:border-[#F05401] focus:outline-none text-[#242321] transition-colors"
            />

            <div className="flex items-center justify-center flex-wrap gap-1.5 pt-1">
              {combinedGoals.map((goal, i) => (
                <span
                  key={i}
                  className="text-[9px] font-mono tracking-[0.16em] uppercase px-2 py-0.5 rounded bg-[#FAF2DE] border border-[#E3D8BE] text-[#5A554D] font-semibold"
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>

          {/* Four Active Components Strip */}
          <div className="w-full grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-[#E8E0D2] text-center">
            
            {/* Step 1: Base */}
            <div 
              onClick={() => setCurrentStep(1)}
              className={`p-2 rounded-lg cursor-pointer transition-all border ${
                currentStep === 1 ? 'border-[#F05401] bg-white shadow-xs' : 'border-transparent hover:bg-white/60'
              }`}
            >
              <span className="text-[8px] font-mono uppercase tracking-wider text-[#9C9484] block">01 BASE</span>
              <p className="text-[11px] font-bold text-[#242321] truncate mt-0.5">
                {selectedBase ? selectedBase.name : 'Choose'}
              </p>
            </div>

            {/* Step 2: Booster */}
            <div 
              onClick={() => setCurrentStep(2)}
              className={`p-2 rounded-lg cursor-pointer transition-all border ${
                currentStep === 2 ? 'border-[#F05401] bg-white shadow-xs' : 'border-transparent hover:bg-white/60'
              }`}
            >
              <span className="text-[8px] font-mono uppercase tracking-wider text-[#9C9484] block">02 BOOSTER</span>
              <p className="text-[11px] font-bold text-[#242321] truncate mt-0.5">
                {selectedBooster ? selectedBooster.name : 'Choose'}
              </p>
            </div>

            {/* Step 3: Gel */}
            <div 
              onClick={() => setCurrentStep(3)}
              className={`p-2 rounded-lg cursor-pointer transition-all border ${
                currentStep === 3 ? 'border-[#F05401] bg-white shadow-xs' : 'border-transparent hover:bg-white/60'
              }`}
            >
              <span className="text-[8px] font-mono uppercase tracking-wider text-[#9C9484] block">03 GEL</span>
              <p className="text-[11px] font-bold text-[#242321] truncate mt-0.5">
                {selectedGel ? selectedGel.name : 'Choose'}
              </p>
            </div>

            {/* Step 4: Oil */}
            <div 
              onClick={() => setCurrentStep(4)}
              className={`p-2 rounded-lg cursor-pointer transition-all border ${
                currentStep === 4 ? 'border-[#F05401] bg-white shadow-xs' : 'border-transparent hover:bg-white/60'
              }`}
            >
              <span className="text-[8px] font-mono uppercase tracking-wider text-[#9C9484] block">04 OIL</span>
              <p className="text-[11px] font-bold text-[#242321] truncate mt-0.5">
                {selectedOil ? selectedOil.name : 'Choose'}
              </p>
            </div>
          </div>

          {/* Pricing & Add Ritual to Bag Card */}
          <div className="w-full mt-5 pt-4 border-t border-[#E8E0D2] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono text-[#242321]">$42</span>
                  <span className="text-xs text-[#9C9484] line-through font-mono">$48</span>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    SAVE $6 BUNDLE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#5A554D] mt-1">
                  <Gift size={13} className="text-[#F05401]" />
                  <span>Includes ceramic bowl & bamboo applicator</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveAndAddToCart}
              disabled={!isComplete}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                isComplete
                  ? 'bg-[#242321] text-white hover:bg-[#F05401]'
                  : 'bg-[#E8E0D2] text-[#9C9484] cursor-not-allowed'
              }`}
            >
              <ShoppingBag size={16} />
              <span>ADD 4-PART RITUAL TO BAG • $42</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: 4-STEP INGREDIENT SELECTION ACCORDION / TABS
           ======================================================== */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step Navigation Tabs */}
          <div className="grid grid-cols-4 gap-2 bg-[#F7F3EB] p-1.5 rounded-xl border border-[#E8E0D2]">
            <button
              onClick={() => setCurrentStep(1)}
              className={`py-2.5 px-2 rounded-lg text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                currentStep === 1
                  ? 'bg-[#242321] text-white shadow-xs'
                  : 'text-[#736E65] hover:text-[#242321]'
              }`}
            >
              <Layers size={14} />
              <span className="hidden sm:inline">1. BASE</span>
              <span className="sm:hidden">1</span>
            </button>

            <button
              onClick={() => setCurrentStep(2)}
              className={`py-2.5 px-2 rounded-lg text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                currentStep === 2
                  ? 'bg-[#242321] text-white shadow-xs'
                  : 'text-[#736E65] hover:text-[#242321]'
              }`}
            >
              <Flame size={14} />
              <span className="hidden sm:inline">2. BOOSTER</span>
              <span className="sm:hidden">2</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className={`py-2.5 px-2 rounded-lg text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                currentStep === 3
                  ? 'bg-[#242321] text-white shadow-xs'
                  : 'text-[#736E65] hover:text-[#242321]'
              }`}
            >
              <Droplets size={14} />
              <span className="hidden sm:inline">3. GEL</span>
              <span className="sm:hidden">3</span>
            </button>

            <button
              onClick={() => setCurrentStep(4)}
              className={`py-2.5 px-2 rounded-lg text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                currentStep === 4
                  ? 'bg-[#242321] text-white shadow-xs'
                  : 'text-[#736E65] hover:text-[#242321]'
              }`}
            >
              <Sun size={14} />
              <span className="hidden sm:inline">4. OIL</span>
              <span className="sm:hidden">4</span>
            </button>
          </div>

          {/* Step 1: BASES */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#242321]">
                    Step 1: Choose Your Structural Base
                  </h3>
                  <p className="text-xs text-[#736E65]">
                    Provides the physical clay mud, marine algae, or rich plant butter matrix (6 Options).
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-semibold text-[#F05401] hover:underline flex items-center gap-1 shrink-0"
                >
                  Next: Booster <ArrowRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bases.map((base) => {
                  const isSelected = selectedBase?.id === base.id;
                  return (
                    <div
                      key={base.id}
                      onClick={() => setSelectedBase(base)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 relative ${
                        isSelected
                          ? 'border-[#F05401] bg-[#FFF8F4] ring-1 ring-[#F05401]'
                          : 'border-[#E8E0D2] bg-white hover:border-[#D0C7B6]'
                      }`}
                    >
                      <div className="shrink-0 w-16 h-22 flex items-center justify-center">
                        <SachetVisual product={base} size="sm" showShadow={false} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-[#F05401]">
                            {base.benefitTag}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#F05401] text-white flex items-center justify-center">
                              <Check size={12} strokeWidth={3} />
                            </div>
                          )}
                        </div>

                        <h4 className="font-bold text-sm text-[#242321] mt-0.5">
                          {base.name}
                        </h4>
                        <p className="text-[11px] text-[#736E65] font-mono">
                          {base.netVol} • {base.subtitle}
                        </p>
                        <p className="text-xs text-[#5A554D] line-clamp-2 mt-1.5 leading-relaxed">
                          {base.description}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#242321]">
                            ${base.price}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenProductDetail(base);
                            }}
                            className="text-[10px] text-[#736E65] hover:text-[#242321] underline"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: BOOSTERS */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#242321]">
                    Step 2: Choose Your Freeze-Dried Booster
                  </h3>
                  <p className="text-xs text-[#736E65]">
                    Cryogenically dried at -40°C. Standardized active plant compounds (14 Options).
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-[#736E65] hover:text-[#242321]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-xs font-semibold text-[#F05401] hover:underline flex items-center gap-1"
                  >
                    Next: Gel <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[580px] overflow-y-auto pr-1">
                {boosters.map((booster) => {
                  const isSelected = selectedBooster?.id === booster.id;
                  return (
                    <div
                      key={booster.id}
                      onClick={() => {
                        setSelectedBooster(booster);
                        handleWhiskNow();
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 relative ${
                        isSelected
                          ? 'border-[#F05401] bg-[#FFF8F4] ring-1 ring-[#F05401]'
                          : 'border-[#E8E0D2] bg-white hover:border-[#D0C7B6]'
                      }`}
                    >
                      <div className="shrink-0 w-16 h-22 flex items-center justify-center">
                        <SachetVisual product={booster} size="sm" showShadow={false} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-[#F05401]">
                            {booster.benefitTag}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#F05401] text-white flex items-center justify-center">
                              <Check size={12} strokeWidth={3} />
                            </div>
                          )}
                        </div>

                        <h4 className="font-bold text-sm text-[#242321] mt-0.5">
                          {booster.name}
                        </h4>
                        <p className="text-[11px] text-[#736E65] font-mono">
                          {booster.netVol} • Freeze-Dried
                        </p>
                        <p className="text-xs text-[#5A554D] line-clamp-2 mt-1.5 leading-relaxed">
                          {booster.description}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#242321]">
                            ${booster.price}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenProductDetail(booster);
                            }}
                            className="text-[10px] text-[#736E65] hover:text-[#242321] underline"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: GELS */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#242321]">
                    Step 3: Choose Your Hydration Matrix Gel
                  </h3>
                  <p className="text-xs text-[#736E65]">
                    Supplies pure hydrophilic hydration to activate the booster powders (2 Options).
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-[#736E65] hover:text-[#242321]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="text-xs font-semibold text-[#F05401] hover:underline flex items-center gap-1"
                  >
                    Next: Oil <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gels.map((gel) => {
                  const isSelected = selectedGel?.id === gel.id;
                  return (
                    <div
                      key={gel.id}
                      onClick={() => setSelectedGel(gel)}
                      className={`p-5 rounded-xl border cursor-pointer transition-all flex items-start gap-4 relative ${
                        isSelected
                          ? 'border-[#F05401] bg-[#FFF8F4] ring-1 ring-[#F05401]'
                          : 'border-[#E8E0D2] bg-white hover:border-[#D0C7B6]'
                      }`}
                    >
                      <div className="shrink-0 w-18 h-24 flex items-center justify-center">
                        <SachetVisual product={gel} size="sm" showShadow={false} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-[#F05401]">
                            {gel.benefitTag}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#F05401] text-white flex items-center justify-center">
                              <Check size={12} strokeWidth={3} />
                            </div>
                          )}
                        </div>

                        <h4 className="font-bold text-base text-[#242321] mt-0.5">
                          {gel.name}
                        </h4>
                        <p className="text-xs text-[#736E65] font-mono">
                          {gel.netVol} • Hydration Gel
                        </p>
                        <p className="text-xs text-[#5A554D] mt-2 leading-relaxed">
                          {gel.description}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-mono font-bold text-[#242321]">
                            ${gel.price}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenProductDetail(gel);
                            }}
                            className="text-xs text-[#736E65] hover:text-[#242321] underline"
                          >
                            Read Science
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: OILS */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#242321]">
                    Step 4: Choose Your Lipid Barrier Seal
                  </h3>
                  <p className="text-xs text-[#736E65]">
                    First cold-pressed botanical oils to seal moisture and enhance lipophilic delivery (4 Options).
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-xs text-[#736E65] hover:text-[#242321]"
                >
                  Back to Gel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {oils.map((oil) => {
                  const isSelected = selectedOil?.id === oil.id;
                  return (
                    <div
                      key={oil.id}
                      onClick={() => setSelectedOil(oil)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 relative ${
                        isSelected
                          ? 'border-[#F05401] bg-[#FFF8F4] ring-1 ring-[#F05401]'
                          : 'border-[#E8E0D2] bg-white hover:border-[#D0C7B6]'
                      }`}
                    >
                      <div className="shrink-0 w-16 h-22 flex items-center justify-center">
                        <SachetVisual product={oil} size="sm" showShadow={false} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-[#F05401]">
                            {oil.benefitTag}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#F05401] text-white flex items-center justify-center">
                              <Check size={12} strokeWidth={3} />
                            </div>
                          )}
                        </div>

                        <h4 className="font-bold text-sm text-[#242321] mt-0.5">
                          {oil.name}
                        </h4>
                        <p className="text-[11px] text-[#736E65] font-mono">
                          {oil.netVol} • First Cold-Pressed
                        </p>
                        <p className="text-xs text-[#5A554D] line-clamp-2 mt-1.5 leading-relaxed">
                          {oil.description}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#242321]">
                            ${oil.price}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenProductDetail(oil);
                            }}
                            className="text-[10px] text-[#736E65] hover:text-[#242321] underline"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mixing Instructions Helper Box */}
          <div className="bg-[#FAF6EE] border border-[#E8E0D2] rounded-xl p-4 flex items-start gap-3 text-xs text-[#5A554D]">
            <Info size={17} className="text-[#F05401] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#242321] block mb-0.5">
                How To Mix Your Custom Ritual At Home:
              </span>
              <span>
                1. Tear open Base into the bowl. 2. Whisk in Booster powder with the bamboo spatula until uniform. 
                3. Drizzle Gel to achieve your desired spreadable emulsion. 4. Finish with 3 drops of Oil to seal hydration.
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
