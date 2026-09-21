import React from 'react';
import { MaskedByMeLogo } from './MaskedByMeLogo';
import { 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  RefreshCw, 
  Layers, 
  ThermometerSnowflake, 
  DropletOff, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import { ActivePage } from '../types';

interface AboutViewProps {
  onBuildMask: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBuildMask }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Editorial Hero Statement */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#F05401] font-semibold block">
          THE MANIFESTO
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-[#242321] tracking-tight leading-tight">
          Rejecting the Compromise of Pre-Mixed Cosmetics
        </h1>
        <p className="text-base sm:text-lg text-[#5A554D] leading-relaxed pt-2">
          Traditional skincare jars sit on department store shelves for eighteen months, 
          diluted with 75% ordinary water and held together by artificial biocides and acrylates. 
          We believe real skin nourishment happens the moment living botanicals meet water.
        </p>
      </div>

      {/* Comparison Grid: Old Skincare vs. Masked By Me */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* The Industry Standard */}
        <div className="bg-[#FAF6EE] border border-[#E8E0D2] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D2]">
            <span className="text-xs font-mono tracking-wider uppercase text-[#736E65] font-semibold">
              TRADITIONAL JAR FORMULATIONS
            </span>
            <span className="text-xs text-red-600 font-mono font-bold">COMPROMISED</span>
          </div>

          <ul className="space-y-3 text-xs text-[#5A554D]">
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold shrink-0">•</span>
              <span><strong>70-85% Water Dilution:</strong> You pay luxury prices primarily for sanitized tap water.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold shrink-0">•</span>
              <span><strong>Harsh Chemical Preservatives:</strong> Phenoxyethanol, parabens, and acrylates required to kill microbial blooms in warm jars.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold shrink-0">•</span>
              <span><strong>Degraded Polyphenols:</strong> Heat processing and prolonged exposure to air oxidize active vitamins by up to 80% before opening.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold shrink-0">•</span>
              <span><strong>Rigid One-Size Fits All:</strong> Your skin changes with sleep, weather, and hormones, but the jar never adjusts.</span>
            </li>
          </ul>
        </div>

        {/* The Masked By Me Standard */}
        <div className="bg-[#FFFDF8] border-2 border-[#F05401]/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#F05401]/20">
            <span className="text-xs font-mono tracking-wider uppercase text-[#F05401] font-bold">
              THE MASKED BY ME METHOD
            </span>
            <span className="text-xs text-[#F05401] font-mono font-bold">PURE BOTANICAL</span>
          </div>

          <ul className="space-y-3 text-xs text-[#242321]">
            <li className="flex items-start gap-3">
              <span className="text-[#F05401] font-bold shrink-0">✓</span>
              <span><strong>Cryo-Stabilized Actives:</strong> Freeze-dried at -40°C in vacuum chambers, locking in 98.4% of living cellular nutrients.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F05401] font-bold shrink-0">✓</span>
              <span><strong>Zero Water & Zero Preservatives:</strong> Pure single-origin raw powders, cold-pressed oils, and pristine botanical gels.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F05401] font-bold shrink-0">✓</span>
              <span><strong>Activated at Your Fingertips:</strong> Blended in seconds in your ceramic bowl right before application. Peak freshness guaranteed.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F05401] font-bold shrink-0">✓</span>
              <span><strong>Total Modular Customization:</strong> Adjust clays, boosters, gels, and oils according to today’s exact skin condition.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* The 4-Part Biochemical Architecture */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#736E65] block mb-1">
            METHODOLOGY
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#242321]">
            The 4-Part Facial Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#FAF6EE] border border-[#E8E0D2] space-y-2">
            <span className="font-mono text-xs text-[#F05401] font-bold">STAGE 01</span>
            <h3 className="font-bold text-sm text-[#242321]">Structural Base</h3>
            <p className="text-xs text-[#5A554D] leading-relaxed">
              French Green Clay, Sea Moss, or Dead Sea Mud creates a cation-exchange matrix that pulls impurities while stabilizing the mask volume.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FAF6EE] border border-[#E8E0D2] space-y-2">
            <span className="font-mono text-xs text-[#F05401] font-bold">STAGE 02</span>
            <h3 className="font-bold text-sm text-[#242321]">Freeze-Dried Booster</h3>
            <p className="text-xs text-[#5A554D] leading-relaxed">
              Standardized plant extracts—such as Turmeric Curcuminoids or Beetroot Betalains—deliver targeted clinical cellular support.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FAF6EE] border border-[#E8E0D2] space-y-2">
            <span className="font-mono text-xs text-[#F05401] font-bold">STAGE 03</span>
            <h3 className="font-bold text-sm text-[#242321]">Hydration Matrix Gel</h3>
            <p className="text-xs text-[#5A554D] leading-relaxed">
              Multi-molecular weight hyaluronic acid and pure aloe vera polysaccharide chains dissolve powders into a silky emulsion.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FAF6EE] border border-[#E8E0D2] space-y-2">
            <span className="font-mono text-xs text-[#F05401] font-bold">STAGE 04</span>
            <h3 className="font-bold text-sm text-[#242321]">Lipid Barrier Seal</h3>
            <p className="text-xs text-[#5A554D] leading-relaxed">
              First cold-pressed golden jojoba, argan, or rosehip oils lock in moisture, prevent clay cracking, and eliminate staining.
            </p>
          </div>
        </div>
      </div>

      {/* Sustainable Sachet Packaging */}
      <div className="bg-[#242321] text-[#EFE8DC] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#F05401] font-bold">
            PACKAGING RESPONSIBILITY
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">
            100% Recyclable Nitrogen-Sealed Sachets
          </h2>
          <p className="text-xs sm:text-sm text-[#A8A196] leading-relaxed">
            By eliminating heavy glass jars and water weight, we reduce carbon transit emissions by 72%. 
            Our individual pouches are manufactured from certified FSC barrier paper and lined with an oxygen-impermeable plant foil, nitrogen-flushed to preserve freshness for 36 months without refrigeration.
          </p>
        </div>

        <button
          onClick={onBuildMask}
          className="px-6 py-3.5 rounded-xl bg-[#F05401] text-white hover:bg-[#D94B00] transition-colors font-semibold uppercase tracking-wider text-xs flex items-center gap-2 shrink-0 shadow-lg"
        >
          <span>BUILD YOUR FIRST RITUAL</span>
          <ArrowRight size={15} />
        </button>
      </div>

    </div>
  );
};
