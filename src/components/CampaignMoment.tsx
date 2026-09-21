import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, Droplet, Sun } from 'lucide-react';

interface CampaignMomentProps {
  onBuildMaskClick: () => void;
  onExploreJournal: () => void;
}

export const CampaignMoment: React.FC<CampaignMomentProps> = ({
  onBuildMaskClick,
  onExploreJournal,
}) => {
  return (
    <section className="relative min-h-[90svh] w-full bg-[#441825] text-[#FEE7B5] overflow-hidden flex flex-col justify-between py-24 select-none border-y border-[#F05401]/20">
      {/* Background Cinematic Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] bg-[#F05401]/15" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] bg-black/40" />
      </div>

      {/* Top Editorial Eyebrow */}
      <div className="relative z-10 max-w-[1520px] mx-auto w-full px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F05401]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FEE7B5]/80">
            Campaign Frame // Manifesto
          </span>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-[#FEE7B5]/60 hidden sm:block">
          THE BIOLOGICAL PURITY STANDARD
        </div>
      </div>

      {/* Centerpiece: Enormous Campaign Typography */}
      <div className="relative z-10 max-w-[1520px] mx-auto w-full px-6 sm:px-8 lg:px-12 my-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="headline-cinema font-serif text-[#FFFDF8] uppercase leading-[0.84]">
                28 INGREDIENTS. <br />
                <span className="text-[#F05401] italic">ZERO DILUTION.</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg sm:text-2xl text-[#FEE7B5]/90 font-serif font-light max-w-2xl leading-relaxed pt-4"
            >
              Commercial jars are 80% dead water and synthetic biocides to sustain 2-year warehouse shelf life. Masked By Me isolates raw bioactives in cryogenic foil. You activate them live with pure hydration at home.
            </motion.p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-8 rounded-2xl bg-black/25 border border-white/10 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3 text-white font-mono text-xs tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#F05401]" />
                <span>FRESHNESS COMPARISON</span>
              </div>

              <div className="space-y-3 font-mono text-xs pt-2">
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-[#A69F92]">Standard Skin Jar</span>
                  <span className="text-[#FEE7B5]">8% Actives • 2yr Old</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-[#A69F92]">Masked By Me Sachet</span>
                  <span className="text-[#F05401] font-bold">100% Bioactive</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A69F92]">Artificial Biocides</span>
                  <span className="text-[#FEE7B5]">0.0% (Zero)</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={onBuildMaskClick}
                  className="w-full py-4 bg-[#F05401] hover:bg-[#d94b00] text-white transition-colors font-mono text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2"
                >
                  <Sparkles size={14} />
                  <span>START YOUR FORMULATION</span>
                </button>
                <button
                  onClick={onExploreJournal}
                  className="w-full py-3 border border-[#FEE7B5]/30 hover:border-[#FEE7B5] text-[#FEE7B5] transition-colors font-mono text-[10px] tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  <span>READ CLINICAL MONOGRAPHS</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Ticker */}
      <div className="relative z-10 w-full border-t border-white/10 pt-6 overflow-hidden">
        <div className="flex items-center gap-12 whitespace-nowrap animate-pulse font-mono text-xs tracking-[0.3em] uppercase text-[#FEE7B5]/70">
          <span>ALOE VERA</span>
          <span>•</span>
          <span>SEA MOSS 92 MINERALS</span>
          <span>•</span>
          <span>TURMERIC CURCUMIN 95%</span>
          <span>•</span>
          <span>FRENCH BEETROOT</span>
          <span>•</span>
          <span>MATCHA EGCG</span>
          <span>•</span>
          <span>VIRGIN ROSEHIP LIPID</span>
          <span>•</span>
          <span>VOLCANIC BENTONITE</span>
          <span>•</span>
          <span>HIBISCUS AHA</span>
          <span>•</span>
          <span>ISRAELI JOJOBA</span>
          <span>•</span>
          <span>RAW GHANAIAN SHEA</span>
        </div>
      </div>
    </section>
  );
};
