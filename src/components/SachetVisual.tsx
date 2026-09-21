import React from 'react';
import { Product } from '../types';
import { MaskedByMeLogo } from './MaskedByMeLogo';

interface SachetVisualProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  interactive?: boolean;
  selected?: boolean;
  showShadow?: boolean;
}

export const SachetVisual: React.FC<SachetVisualProps> = ({
  product,
  size = 'md',
  className = '',
  interactive = false,
  selected = false,
  showShadow = true,
}) => {
  // Dimensions for different sizes
  const dimensions = {
    sm: { width: 130, height: 190, scale: 0.72 },
    md: { width: 190, height: 275, scale: 0.95 },
    lg: { width: 250, height: 360, scale: 1.15 },
    hero: { width: 310, height: 440, scale: 1.35 },
  };

  const { width, height } = dimensions[size];
  const isOil = product.category === 'oils';
  const isGel = product.category === 'gels';
  const isBooster = product.category === 'boosters';
  const isBase = product.category === 'bases';

  // Specific botanical engraving paths for background art
  const renderBotanicalArt = () => {
    return (
      <svg
        viewBox="0 0 160 160"
        className="absolute inset-x-4 top-16 w-36 h-36 mx-auto opacity-15 pointer-events-none stroke-current"
        style={{ color: product.colorAccent }}
        fill="none"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M 80 140 C 75 110 70 80 80 30" />
        <path d="M 78 115 C 60 105 45 95 38 80 C 48 82 62 90 77 105" />
        <path d="M 80 95 C 100 85 115 75 122 60 C 112 62 98 70 81 85" />
        <path d="M 79 75 C 65 65 52 55 48 42 C 58 44 70 52 79 67" />
        <path d="M 80 55 C 95 45 106 38 110 26 C 102 28 92 36 80 48" />
      </svg>
    );
  };

  if (product.packshotImage) {
    return (
      <div
        className={`relative select-none transition-all duration-300 ${
          interactive ? 'cursor-pointer hover:-translate-y-2 hover:rotate-[-0.5deg]' : ''
        } ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {showShadow && (
          <div
            className="absolute -bottom-3 inset-x-3 h-6 rounded-full blur-md opacity-35 bg-[#2E2822] -z-10 transition-transform duration-300"
            style={{ transform: selected ? 'scale(1.08)' : 'scale(1)' }}
          />
        )}
        <div
          className={`relative w-full h-full rounded-[10px] overflow-hidden flex items-center justify-center transition-all duration-300 ${
            selected
              ? 'ring-2 ring-[#F05401] ring-offset-2 ring-offset-[#FFFDF8] shadow-lg'
              : ''
          }`}
        >
          <img
            src={product.packshotImage}
            alt={`${product.name} ${product.subtitle}`}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative select-none transition-all duration-300 ${
        interactive ? 'cursor-pointer hover:-translate-y-2 hover:rotate-[-0.5deg]' : ''
      } ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Outer Drop Shadow on travertine surface */}
      {showShadow && (
        <div
          className="absolute -bottom-3 inset-x-3 h-6 rounded-full blur-md opacity-35 bg-[#2E2822] -z-10 transition-transform duration-300"
          style={{ transform: selected ? 'scale(1.08)' : 'scale(1)' }}
        />
      )}

      {/* Main Sachet Pouch Body */}
      <div
        className={`relative w-full h-full rounded-[10px] overflow-hidden flex flex-col justify-between border transition-all duration-300 ${
          selected
            ? 'ring-2 ring-[#F05401] ring-offset-2 ring-offset-[#FFFDF8] shadow-lg'
            : 'border-[#E6DEC8]'
        } ${
          isOil
            ? 'bg-gradient-to-b from-[#FFFDF8]/90 via-[#FDFBF2]/95 to-[#F7EFCF]/85 backdrop-blur-sm'
            : 'bg-[#FAF8F2]'
        }`}
        style={{
          boxShadow: selected
            ? '0 16px 32px -8px rgba(240, 84, 1, 0.22), 0 4px 12px rgba(0,0,0,0.05)'
            : '0 8px 24px -6px rgba(46, 40, 34, 0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        {/* Paper Grain / Substrate Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(#242321 0.75px, transparent 0.75px)`,
            backgroundSize: '6px 6px',
          }}
        />

        {/* Top Heat-Sealed Crimp Edge */}
        <div className="relative w-full h-6 border-b border-[#E8E0D2] bg-gradient-to-b from-[#F2ECE0] to-[#FAF7EF] flex items-center justify-between px-2.5 overflow-hidden">
          {/* Vertical crimp pattern ridges */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(140, 130, 115, 0.35) 2px, rgba(140, 130, 115, 0.35) 3px)',
            }}
          />

          {/* Left Tear Notch */}
          <div className="relative z-10 w-2 h-3.5 -ml-3 bg-[#E8E0D2] border-r border-[#C7BFA8] rounded-r-full shadow-inner" />
          
          {/* Subtle sealed batch code / notch guide */}
          <span className="relative z-10 text-[7px] uppercase tracking-widest text-[#9C9484] font-mono">
            {isBooster ? 'FREEZE-DRIED' : isOil ? 'VIRGIN COLD-PRESSED' : 'PURE CELLULAR'}
          </span>

          {/* Right Tear Notch */}
          <div className="relative z-10 w-2 h-3.5 -mr-3 bg-[#E8E0D2] border-l border-[#C7BFA8] rounded-l-full shadow-inner" />
        </div>

        {/* Sachet Content Area */}
        <div className="relative flex-1 flex flex-col items-center justify-between p-3.5 pt-2.5 z-10 text-center">
          
          {/* Brand Mark: Authoritative Masked BY ME logo in signature brand orange */}
          <div className="w-full flex justify-center py-1">
            <MaskedByMeLogo
              variant="orange"
              size={size === 'hero' ? 'md' : size === 'lg' ? 'sm' : 'xs'}
            />
          </div>

          {/* Botanical engraving in background */}
          {renderBotanicalArt()}

          {/* Typography Header on Sachet */}
          <div className="flex flex-col items-center gap-0.5 mt-0.5 z-10">
            <h4 className="font-sans font-bold text-[#242321] tracking-[0.14em] uppercase text-xs leading-tight">
              {product.name}
            </h4>
            <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-[#736E65] font-medium">
              {product.subtitle}
            </span>

            {/* Benefit Pill (e.g. GLOW, NOURISH, REFRESH) */}
            <div className="mt-1 px-2.5 py-0.5 rounded-full border border-[#DCD3C0] bg-[#F4EFE3]/80">
              <span className="text-[8px] tracking-[0.18em] uppercase font-semibold text-[#5A554D]">
                {product.benefitTag}
              </span>
            </div>
          </div>

          {/* Centerpiece Hero Ingredient Art / Powder Mound / Oil Viscosity */}
          <div className="relative w-24 h-24 my-1 flex items-center justify-center">
            {/* Soft ambient aura in product's accent color */}
            <div
              className="absolute w-20 h-20 rounded-full blur-xl opacity-25"
              style={{ backgroundColor: product.colorAccent }}
            />

            {/* Realistic ingredient visual representation */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#E6DEC8] shadow-sm bg-white/70">
              <img
                src={product.rawIngredientImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              {/* Powder pyramid or oil glaze highlight overlay */}
              {isBooster && (
                <div
                  className="absolute bottom-0 inset-x-0 h-7 opacity-85 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(to top, ${product.colorAccent} 0%, transparent 100%)`,
                  }}
                >
                  <span className="text-[7px] font-mono tracking-wider text-white uppercase drop-shadow-sm">
                    5g Active
                  </span>
                </div>
              )}
              {isOil && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-200/20 to-white/40 pointer-events-none" />
              )}
            </div>
          </div>

          {/* Sachet Footer Details */}
          <div className="w-full border-t border-[#E8E0D2]/70 pt-1.5 flex items-center justify-between text-[8px] tracking-wider uppercase text-[#736E65] font-sans">
            <span className="font-semibold text-[#242321]">
              {product.category.toUpperCase()}
            </span>
            <span className="font-mono text-[#5A554D]">
              {product.netVol}
            </span>
          </div>

        </div>

        {/* Bottom Sealed Crimp Edge */}
        <div className="w-full h-3 border-t border-[#E8E0D2] bg-[#F2ECE0] opacity-75 flex items-center justify-center">
          <div 
            className="w-full h-full opacity-30"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(140, 130, 115, 0.3) 2px, rgba(140, 130, 115, 0.3) 3px)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
