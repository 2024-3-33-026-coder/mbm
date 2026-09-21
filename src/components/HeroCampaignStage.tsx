import React, { useState } from 'react';
import { motion, MotionValue } from 'motion/react';
import { MaskedByMeLogo } from './MaskedByMeLogo';
import { Sparkles, Eye } from 'lucide-react';

interface HeroCampaignStageProps {
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
  onSelectProduct?: (productSlug: string) => void;
  className?: string;
}

const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const HeroCampaignStage: React.FC<HeroCampaignStageProps> = ({
  parallaxX,
  parallaxY,
  onSelectProduct,
  className = '',
}) => {
  const [hoveredSachet, setHoveredSachet] = useState<string | null>(null);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${className}`}
    >
      {/* ========================================================
          LAYER 0: WARM NATURAL SUNLIGHT & DAPPLED LEAF SHADOWS
         ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Warm late-morning sunlight beam coming from top-left */}
        <div 
          className="absolute -top-20 -left-20 w-[140%] h-[140%] opacity-70"
          style={{
            background: 'radial-gradient(ellipse 65% 55% at 30% 25%, rgba(254, 231, 181, 0.45) 0%, rgba(255, 253, 248, 0) 70%)',
          }}
        />

        {/* Dynamic Dappled Foliage Shadows (natural tree leaves swaying in sunlight) */}
        <motion.div
          animate={{
            x: [-6, 6, -6],
            y: [-4, 5, -4],
            rotate: [-0.5, 0.5, -0.5],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 opacity-[0.16] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse 120px 80px at 20% 30%, #383025 0%, transparent 70%),
                              radial-gradient(ellipse 160px 100px at 75% 20%, #383025 0%, transparent 70%),
                              radial-gradient(ellipse 90px 140px at 45% 45%, #383025 0%, transparent 65%),
                              radial-gradient(ellipse 180px 110px at 85% 70%, #383025 0%, transparent 70%),
                              radial-gradient(ellipse 110px 90px at 15% 85%, #383025 0%, transparent 65%)`,
            filter: 'blur(16px)',
          }}
        />
      </div>

      {/* ========================================================
          LAYER 1: SCULPTURAL TRAVERTINE / LIMESTONE PLATFORM STAGE
         ======================================================== */}
      <motion.div
        style={{
          x: parallaxX ? parallaxX : 0,
          y: parallaxY ? parallaxY : 0,
        }}
        className="relative z-10 w-full max-w-[680px] h-[480px] sm:h-[520px] md:h-[550px] lg:h-[580px] flex items-center justify-center"
      >
        {/* Travertine Base Foundation Slab (Bottom Stone Floor) */}
        <div 
          className="absolute -bottom-2 inset-x-4 h-28 sm:h-32 rounded-[20px] border border-[#DDD4C1] shadow-2xl overflow-hidden -z-10"
          style={{
            background: 'linear-gradient(175deg, #F3ECE0 0%, #E8DFCE 45%, #DFD5C0 100%)',
            boxShadow: '0 30px 60px -15px rgba(50, 42, 33, 0.16), 0 0 0 1px rgba(220, 209, 189, 0.4)',
          }}
        >
          {/* Porous Limestone Pitting & Texture */}
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#4A3F33 1px, transparent 1px), radial-gradient(#2E261E 1.5px, transparent 1.5px)',
              backgroundSize: '12px 12px, 28px 28px',
              backgroundPosition: '0 0, 14px 14px',
            }}
          />
          {/* Subtle Chiseled Top Edge Bevel */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-white/70 shadow-sm" />
        </div>

        {/* Back-Left Travertine Pedestal Step (Elevated for Sea Moss) */}
        <div 
          className="absolute left-0 sm:left-4 top-[18%] w-[210px] sm:w-[240px] h-[190px] rounded-xl border border-[#DCD3C0] -z-10"
          style={{
            background: 'linear-gradient(160deg, #F4EEE3 0%, #E9E0CE 60%, #DDD2BF 100%)',
            boxShadow: '0 18px 36px -10px rgba(56, 45, 34, 0.18), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
          }}
        >
          {/* Top Edge Bevel */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-white/80" />
          {/* Side Shadow cast onto middle terrace */}
          <div className="absolute -right-6 top-6 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent blur-sm" />
        </div>

        {/* Back-Right Travertine Pedestal Step (Elevated for Shea Butter) */}
        <div 
          className="absolute right-0 sm:right-4 top-[12%] w-[220px] sm:w-[250px] h-[220px] rounded-xl border border-[#DCD3C0] -z-10"
          style={{
            background: 'linear-gradient(165deg, #F5EFE4 0%, #EAE1D0 55%, #DDD3BF 100%)',
            boxShadow: '0 20px 40px -12px rgba(56, 45, 34, 0.18), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
          }}
        >
          <div className="absolute top-0 inset-x-0 h-[2px] bg-white/80" />
          <div className="absolute -left-6 top-8 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent blur-sm" />
        </div>

        {/* ========================================================
            LAYER 2: AUTHENTIC BOTANICAL MATERIALS ON THE STONE
           ======================================================== */}

        {/* 1. Sea Moss: Golden Amber Wild Branching Algae on Left Step */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: easeCurve }}
          className="absolute left-[-16px] sm:left-[-4px] top-[14%] z-10 w-[140px] sm:w-[170px] pointer-events-none"
        >
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=85"
            alt="Raw Amber Irish Sea Moss on Travertine"
            className="w-full h-auto object-contain filter contrast-110 drop-shadow-[0_12px_16px_rgba(40,32,22,0.35)]"
          />
          {/* Sunlight dew droplet reflection */}
          <div className="absolute bottom-2 right-4 w-7 h-7 rounded-full bg-gradient-to-br from-white/90 via-amber-100/60 to-transparent border border-white/60 shadow-lg blur-[0.4px]" />
        </motion.div>

        {/* 2. Shea Butter: Cracked Raw Shea Nuts & Creamy Chunks on Right Step */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: easeCurve }}
          className="absolute right-[-14px] sm:right-[-2px] bottom-[22%] z-10 w-[150px] sm:w-[180px] pointer-events-none"
        >
          <img
            src="https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=600&q=85"
            alt="Raw Cracked Shea Nuts and Unrefined Shea Butter Chunks"
            className="w-full h-auto object-contain filter contrast-105 drop-shadow-[0_14px_20px_rgba(40,32,22,0.32)]"
          />
        </motion.div>

        {/* 3. Foreground Aloe Vera: Fresh Cut Succulent Leaf & Clear Gel Bead */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: easeCurve }}
          className="absolute left-6 sm:left-14 bottom-1 z-30 flex items-end gap-3 pointer-events-none"
        >
          {/* Fresh Cut Aloe Slice */}
          <div className="relative w-28 sm:w-36 drop-shadow-[0_16px_22px_rgba(20,30,20,0.38)]">
            <img
              src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=85"
              alt="Fresh Cut Succulent Aloe Vera with Crystalline Gel"
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>
          {/* Clear Botanical Dew Gel Drop on Stone */}
          <div 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/70 backdrop-blur-[1px] relative -bottom-1"
            style={{
              background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(230, 245, 230, 0.6) 45%, rgba(120, 160, 120, 0.3) 100%)',
              boxShadow: '0 8px 16px -2px rgba(25, 45, 25, 0.28), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
            }}
          />
        </motion.div>

        {/* ========================================================
            LAYER 3: THE THREE PRECISE MASKED BY ME PACKAGING SACHETS
           ======================================================== */}

        {/* SACHET 1: SEA MOSS BASE GEL (Left elevated, slightly back) */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.75, delay: 0.3, ease: easeCurve }}
          whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
          onMouseEnter={() => setHoveredSachet('seamoss')}
          onMouseLeave={() => setHoveredSachet(null)}
          onClick={() => onSelectProduct?.('sea-moss-base-gel')}
          className="absolute left-8 sm:left-14 top-[10%] sm:top-[8%] z-15 cursor-pointer group"
          style={{ transformOrigin: 'bottom center' }}
        >
          <div 
            className="w-[170px] sm:w-[200px] md:w-[215px] bg-[#FAF8F2] rounded-[10px] border border-[#E4DCB9] p-3.5 sm:p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300"
            style={{
              boxShadow: hoveredSachet === 'seamoss'
                ? '0 28px 50px -10px rgba(50, 40, 28, 0.32), 0 0 0 2px #F05401'
                : '0 20px 38px -12px rgba(50, 40, 28, 0.22), 0 2px 6px rgba(0, 0, 0, 0.04)',
            }}
          >
            {/* Top Crimp Texture with fine ribs */}
            <div 
              className="absolute top-0 inset-x-0 h-3 border-b border-[#E6DEC7] flex items-center justify-between px-2"
              style={{
                backgroundImage: 'repeating-linear-gradient(to right, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)',
              }}
            >
              <div className="w-1.5 h-1.5 bg-[#E6DEC7] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#E6DEC7] rounded-full" />
            </div>

            {/* Bottom Crimp Texture */}
            <div 
              className="absolute bottom-0 inset-x-0 h-3 border-t border-[#E6DEC7]"
              style={{
                backgroundImage: 'repeating-linear-gradient(to right, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)',
              }}
            />

            {/* Sachet Content */}
            <div className="pt-2 pb-1">
              <div className="flex justify-center mb-2">
                <MaskedByMeLogo variant="dark" size="xs" />
              </div>

              <div className="mt-2 text-left">
                <h3 className="font-serif text-2xl sm:text-[28px] text-[#1B261D] uppercase tracking-wide leading-none font-medium">
                  SEA<br />MOSS
                </h3>
                <span className="block text-[9px] font-sans font-bold tracking-[0.25em] text-[#736E65] uppercase mt-2">
                  BASE GEL
                </span>
                <span className="block text-[7.5px] font-mono tracking-widest text-[#8B734B] uppercase mt-1 font-semibold">
                  SOOTHE • HYDRATE
                </span>
              </div>

              {/* Sachet Botanical Graphic on Right Side */}
              <div className="relative mt-2.5 h-20 w-full overflow-hidden rounded-md bg-[#F4EFE6]/60">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80"
                  alt="Sea Moss Active Extraction"
                  className="w-full h-full object-cover grayscale-[15%] contrast-110 opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-2 text-[7.5px] font-mono text-[#736E65] space-y-0.5 border-t border-[#EAE3D2] pt-1.5">
                <div>PURE BOTANICAL GEL</div>
                <div>SINGLE INGREDIENT</div>
              </div>

              <div className="mt-2 flex items-center justify-between text-[8px] font-mono font-bold text-[#1B261D]">
                <span>NET VOL. 10 ML</span>
                <span className="text-[#F05401] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  <Eye size={10} />
                  <span>VIEW</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SACHET 2: SHEA BUTTER BASE (Right elevated, slightly back) */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 1.5 }}
          transition={{ duration: 0.75, delay: 0.4, ease: easeCurve }}
          whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
          onMouseEnter={() => setHoveredSachet('sheabutter')}
          onMouseLeave={() => setHoveredSachet(null)}
          onClick={() => onSelectProduct?.('shea-butter-base')}
          className="absolute right-6 sm:right-12 top-[6%] sm:top-[4%] z-15 cursor-pointer group"
          style={{ transformOrigin: 'bottom center' }}
        >
          <div 
            className="w-[170px] sm:w-[200px] md:w-[215px] bg-[#FAF8F2] rounded-[10px] border border-[#E4DCB9] p-3.5 sm:p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300"
            style={{
              boxShadow: hoveredSachet === 'sheabutter'
                ? '0 28px 50px -10px rgba(50, 40, 28, 0.32), 0 0 0 2px #F05401'
                : '0 20px 38px -12px rgba(50, 40, 28, 0.22), 0 2px 6px rgba(0, 0, 0, 0.04)',
            }}
          >
            {/* Top Crimp Texture */}
            <div 
              className="absolute top-0 inset-x-0 h-3 border-b border-[#E6DEC7] flex items-center justify-between px-2"
              style={{
                backgroundImage: 'repeating-linear-gradient(to right, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)',
              }}
            />

            {/* Bottom Crimp Texture */}
            <div 
              className="absolute bottom-0 inset-x-0 h-3 border-t border-[#E6DEC7]"
              style={{
                backgroundImage: 'repeating-linear-gradient(to right, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)',
              }}
            />

            <div className="pt-2 pb-1">
              <div className="flex justify-center mb-2">
                <MaskedByMeLogo variant="dark" size="xs" />
              </div>

              <div className="mt-2 text-left">
                <h3 className="font-serif text-2xl sm:text-[28px] text-[#1B261D] uppercase tracking-wide leading-none font-medium">
                  SHEA<br />BUTTER
                </h3>
                <span className="block text-[9px] font-sans font-bold tracking-[0.25em] text-[#736E65] uppercase mt-2">
                  BASE
                </span>
                <span className="block text-[7.5px] font-mono tracking-widest text-[#CBB282] uppercase mt-1 font-semibold">
                  NOURISH • SEAL
                </span>
              </div>

              {/* Sachet Botanical Graphic */}
              <div className="relative mt-2.5 h-20 w-full overflow-hidden rounded-md bg-[#F4EFE6]/60">
                <img
                  src="https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=400&q=80"
                  alt="Raw Shea Butter and Nut"
                  className="w-full h-full object-cover contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-2 text-[7.5px] font-mono text-[#736E65] space-y-0.5 border-t border-[#EAE3D2] pt-1.5">
                <div>PURE BOTANICAL BUTTER</div>
                <div>SINGLE INGREDIENT</div>
              </div>

              <div className="mt-2 flex items-center justify-between text-[8px] font-mono font-bold text-[#1B261D]">
                <span>NET VOL. 15 G</span>
                <span className="text-[#F05401] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  <Eye size={10} />
                  <span>VIEW</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SACHET 3: ALOE VERA BASE GEL (Foreground Center - Star of the Still Life) */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeCurve }}
          whileHover={{ y: -8, scale: 1.03 }}
          onMouseEnter={() => setHoveredSachet('aloe')}
          onMouseLeave={() => setHoveredSachet(null)}
          onClick={() => onSelectProduct?.('aloe-vera-base-gel')}
          className="relative z-25 cursor-pointer group"
          style={{ transformOrigin: 'bottom center' }}
        >
          {/* Floating Luxury Inspection Tag on Hover */}
          {hoveredSachet === 'aloe' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#242321] text-[#FFFDF8] px-3.5 py-1.5 rounded-full text-[9px] font-mono tracking-widest uppercase flex items-center gap-1.5 whitespace-nowrap shadow-xl z-30"
            >
              <Sparkles size={11} className="text-[#F05401]" />
              <span>STEP 01 • HYDRATING BASE GEL</span>
            </motion.div>
          )}

          <div 
            className="w-[200px] sm:w-[235px] md:w-[250px] relative transition-all duration-300"
            style={{
              filter: hoveredSachet === 'aloe'
                ? 'drop-shadow(0 32px 52px rgba(45, 36, 25, 0.45)) drop-shadow(0 0 0 2px #F05401)'
                : 'drop-shadow(0 26px 46px rgba(45, 36, 25, 0.30)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08))',
            }}
          >
            <img
              id="hero-aloe-vera-sachet"
              src="/565767.png"
              alt="Masked By Me Aloe Vera Base Gel Official Sachet"
              className="w-full h-auto object-contain select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
            {/* Interactive Luxury Formulate Tag Overlay on Hover */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 pointer-events-none">
              <span className="bg-[#1B261D]/92 backdrop-blur-sm text-[#FFFDF8] text-[8.5px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 whitespace-nowrap border border-white/10">
                <span>FORMULATE WITH ALOE</span>
                <span className="text-[#F05401]">→</span>
              </span>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};
