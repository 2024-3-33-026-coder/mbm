import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HeroCampaignStage } from './HeroCampaignStage';

interface HeroEditorialProps {
  onBuildMaskClick?: () => void;
  onExploreClick?: () => void;
  onExploreSystem?: () => void;
  onStartLab?: () => void;
  onSelectProductBySlug?: (slug: string) => void;
}

const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const HeroEditorial: React.FC<HeroEditorialProps> = ({
  onBuildMaskClick,
  onExploreClick,
  onExploreSystem,
  onStartLab,
  onSelectProductBySlug,
}) => {
  const handleBuild = onStartLab || onBuildMaskClick || (() => {});
  const handleExplore = onExploreSystem || onExploreClick || (() => {});
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const stageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  // Subtle Mouse Parallax on Desktop
  const springX = useSpring(0, { stiffness: 90, damping: 22 });
  const springY = useSpring(0, { stiffness: 90, damping: 22 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      springX.set(x);
      springY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FFFDF8] overflow-hidden flex flex-col justify-between pt-3 sm:pt-5 lg:pt-6 pb-3 sm:pb-4 select-none border-b border-[#EFE7DA] min-h-0 h-auto lg:h-[clamp(620px,78vh,800px)]"
      data-cursor="CAMPAIGN"
    >
      {/* Warm Ambient Atmosphere & Natural Light Flare */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(254, 231, 181, 0.55) 0%, rgba(255, 253, 248, 0) 70%)' }}
        />
        <div 
          className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(240, 84, 1, 0.04) 0%, rgba(255, 253, 248, 0) 70%)' }}
        />
      </div>

      {/* Top Editorial Eyebrow & System Authority Strip */}
      <div className="relative z-20 max-w-[1520px] mx-auto w-full px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeCurve }}
          className="flex items-center gap-2.5"
        >
          <span className="w-2 h-2 rounded-full bg-[#F05401] animate-pulse" />
          <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#736E65] uppercase">
            THE INGREDIENT-FIRST SKIN SYSTEM
          </span>
        </motion.div>

        {/* System Equation Chip: BASE + BOOSTER + GEL + OIL */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: easeCurve }}
          className="hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6EE] border border-[#E9E1CE] text-[10px] lg:text-[11px] font-mono text-[#5A554D] tracking-wider uppercase"
        >
          <span className="font-semibold text-[#1B261D]">BASE</span>
          <span className="text-[#F05401] font-bold">+</span>
          <span className="font-semibold text-[#1B261D]">BOOSTER</span>
          <span className="text-[#F05401] font-bold">+</span>
          <span className="font-semibold text-[#1B261D]">GEL</span>
          <span className="text-[#F05401] font-bold">+</span>
          <span className="font-semibold text-[#1B261D]">OIL</span>
        </motion.div>
      </div>

      {/* Main Luxury Skincare Campaign Layout (42% Typography / 58% Product Still Life) */}
      <div className="relative z-10 max-w-[1520px] mx-auto w-full px-6 sm:px-8 lg:px-12 my-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4 py-2 sm:py-3 lg:py-1">
        
        {/* ========================================================
            LEFT SIDE: CONFIDENT EDITORIAL HEADLINE & RITUAL CTAS (42%)
           ======================================================== */}
        <motion.div
          style={{ y: headlineY, opacity: opacityFade }}
          className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-2 lg:pt-0"
        >
          {/* Main Campaign Headline: CRAFT. MIX. UNMASK. */}
          <div className="space-y-0.5 sm:space-y-1">
            
            {/* Word 01: CRAFT. */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: easeCurve }}
                className="font-serif text-[100px] text-[#1B261D] uppercase leading-[0.88] tracking-[-0.03em] font-normal"
                style={{ fontSize: '100px' }}
              >
                CRAFT.
              </motion.h1>
            </div>

            {/* Word 02: MIX. */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: easeCurve }}
                className="font-serif text-[100px] text-[#1B261D] uppercase leading-[0.88] tracking-[-0.03em] font-normal"
                style={{ fontSize: '100px' }}
              >
                MIX.
              </motion.h1>
            </div>

            {/* Word 03: UNMASK. with Signature Orange Accent */}
            <div className="overflow-hidden flex items-baseline gap-3 sm:gap-4 flex-wrap">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: easeCurve }}
                className="font-serif text-[100px] text-[#F05401] italic uppercase leading-[0.88] tracking-[-0.03em] font-normal"
                style={{ fontSize: '100px' }}
              >
                UNMASK.
              </motion.h1>

              {/* Kinetic Self-drawing Signature Orange Micro-line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: easeCurve }}
                className="origin-left hidden sm:block h-[3px] md:h-[3.5px] flex-1 max-w-[140px] bg-[#F05401] rounded-full self-center"
              />
            </div>
          </div>

          {/* Quieter Supporting Paragraph */}
          <div className="mt-4 sm:mt-5 max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: easeCurve }}
              className="text-sm sm:text-base text-[#5A554D] font-light leading-relaxed"
            >
              28 single-origin botanical actives. Freeze-dried at –40°C in oxygen-tight sachets. Zero preservatives, zero water fillers. Build a ritual that's entirely your own.
            </motion.p>

            {/* CTAs: Primary & Secondary */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: easeCurve }}
              className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5"
            >
              {/* Primary Luxury CTA */}
              <button
                id="hero-build-mask-cta"
                onClick={handleBuild}
                data-cursor="BUILD"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#242321] text-[#FFFDF8] hover:bg-[#F05401] transition-colors duration-400 font-sans text-xs tracking-[0.2em] uppercase font-semibold overflow-hidden shadow-lg rounded-[2px]"
              >
                <Sparkles size={14} className="text-[#F05401] group-hover:text-white transition-colors" />
                <span>BUILD YOUR MASK</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F05401] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>

              {/* Secondary Minimal Text Link */}
              <button
                id="hero-explore-ingredients-cta"
                onClick={handleExplore}
                data-cursor="EXPLORE"
                className="group inline-flex items-center gap-2 py-2 text-xs font-sans tracking-[0.2em] uppercase font-semibold text-[#242321] hover:text-[#F05401] transition-colors bg-transparent border-b border-[#242321]/30 hover:border-[#F05401]"
              >
                <span>EXPLORE 28 INGREDIENTS</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Editorial Metadata Annotation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-4 pt-3 border-t border-[#EAE3D3] flex items-center gap-4 text-[10px] font-mono text-[#8C8578] uppercase tracking-wider"
            >
              <span>100% BIOACTIVE</span>
              <span>•</span>
              <span>NITROGEN SEALED</span>
              <span>•</span>
              <span>0% WATER DILUTION</span>
            </motion.div>
          </div>
        </motion.div>

        {/* ========================================================
            RIGHT SIDE: LARGE CINEMATIC PRODUCT CAMPAIGN COMPOSITION (58%)
           ======================================================== */}
        <motion.div
          style={{
            y: stageY,
            scale: stageScale,
          }}
          className="lg:col-span-7 xl:col-span-7 relative w-full flex items-center justify-center order-1 lg:order-2"
        >
          {/* The Physical Luxury Campaign Stage on Travertine */}
          <HeroCampaignStage
            parallaxX={springX}
            parallaxY={springY}
            onSelectProduct={(slug) => {
              if (onSelectProductBySlug) {
                onSelectProductBySlug(slug);
              } else {
                handleBuild();
              }
            }}
          />
        </motion.div>

      </div>

      {/* ========================================================
          BOTTOM VIEWPORT: SUBTLE GLIMPSE OF NEXT SECTION
         ======================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="relative z-10 max-w-[1520px] mx-auto w-full px-6 sm:px-8 lg:px-12 pt-2 sm:pt-2.5 border-t border-[#EFE7DA] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-[#736E65]"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#242321] font-semibold">01/04</span>
          <span>THE INGREDIENT SYSTEM</span>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <span className="hover:text-[#242321] cursor-pointer transition-colors">6 BASES</span>
          <span>•</span>
          <span className="hover:text-[#242321] cursor-pointer transition-colors">14 BOOSTERS</span>
          <span>•</span>
          <span className="hover:text-[#242321] cursor-pointer transition-colors">2 GELS</span>
          <span>•</span>
          <span className="hover:text-[#242321] cursor-pointer transition-colors">4 OILS</span>
        </div>

        <button
          onClick={handleExplore}
          className="text-[#F05401] font-semibold tracking-wider flex items-center gap-1.5 hover:underline focus:outline-none"
        >
          <span>28 INGREDIENTS ARCHIVE</span>
          <span className="animate-bounce">↓</span>
        </button>
      </motion.div>
    </section>
  );
};
