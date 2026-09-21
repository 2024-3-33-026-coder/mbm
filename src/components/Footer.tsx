import React from 'react';
import { MaskedByMeLogo } from './MaskedByMeLogo';
import { ActivePage, ProductCategory } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onSelectCategory }) => {
  return (
    <footer className="bg-[#1C1B19] text-[#FFFDF8] pt-24 pb-16 border-t border-[#2F2D2A] select-none">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20 border-b border-[#2F2D2A] items-start">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F05401] font-bold block mb-3">
              THE BIOLOGICAL PURITY STANDARD
            </span>
            <p className="headline-sub font-serif text-[#FFFDF8] uppercase leading-[0.9]">
              28 RAW BIOACTIVES. <br />
              <span className="text-[#736E65] italic">ISOLATED UNTIL YOU FORMULATE.</span>
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-4 lg:pt-0">
            <p className="text-sm sm:text-base text-[#A8A196] font-light leading-relaxed max-w-md">
              Most skincare companies formulate for 24-month warehouse stability with synthetic preservatives. Masked By Me formulates for biological activity on skin. Freshly activated at the moment of application.
            </p>

            <div className="pt-8">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#736E65] block mb-2">
                THE DISPATCH ARCHIVE
              </span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to The Apothecary Dispatch.');
                }}
                className="flex items-center border-b border-[#4D4841] focus-within:border-[#F05401] pb-2 max-w-md transition-colors"
              >
                <input
                  type="email"
                  placeholder="Enter email for research monographs & private lots"
                  required
                  className="bg-transparent text-sm text-white placeholder-[#736E65] focus:outline-none flex-1 font-mono text-xs"
                />
                <button
                  type="submit"
                  className="text-xs font-mono tracking-widest uppercase text-[#F05401] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>JOIN</span>
                  <ArrowRight size={13} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 4 Clean Editorial Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-b border-[#2F2D2A] text-xs font-mono tracking-wider">
          
          {/* Column 1: System */}
          <div className="space-y-4">
            <span className="text-[#F05401] font-bold tracking-widest uppercase block">
              01 // THE SYSTEM
            </span>
            <ul className="space-y-2.5 text-[#A8A196]">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('bases');
                    setActivePage('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  6 Structural Bases
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('boosters');
                    setActivePage('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  14 Cryo-Boosters
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('gels');
                    setActivePage('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  2 Hydration Gels
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('oils');
                    setActivePage('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  4 Virgin Lipid Seals
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Laboratory */}
          <div className="space-y-4">
            <span className="text-[#F05401] font-bold tracking-widest uppercase block">
              02 // LABORATORY
            </span>
            <ul className="space-y-2.5 text-[#A8A196]">
              <li>
                <button
                  onClick={() => setActivePage('build-your-mask')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Sparkles size={11} className="text-[#F05401]" />
                  <span>Build Your Mask Studio</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('shop')}
                  className="hover:text-white transition-colors"
                >
                  Curated Ritual Bundles
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-white transition-colors"
                >
                  The Cryo-Drying Method
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-white transition-colors"
                >
                  Zero-Dilution Index
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Research */}
          <div className="space-y-4">
            <span className="text-[#F05401] font-bold tracking-widest uppercase block">
              03 // RESEARCH & INCI
            </span>
            <ul className="space-y-2.5 text-[#A8A196]">
              <li>
                <button
                  onClick={() => setActivePage('journal')}
                  className="hover:text-white transition-colors"
                >
                  Clinical Monographs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-white transition-colors"
                >
                  Phytochemical Database
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-white transition-colors"
                >
                  Provenance & Sourcing
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('journal')}
                  className="hover:text-white transition-colors"
                >
                  The Apothecary Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Archival & Legal */}
          <div className="space-y-4">
            <span className="text-[#F05401] font-bold tracking-widest uppercase block">
              04 // ARCHIVE & EDITIONS
            </span>
            <ul className="space-y-2.5 text-[#A8A196]">
              <li>
                <span className="text-[#736E65]">Stockholm • Paris • Tokyo</span>
              </li>
              <li>
                <span className="text-[#736E65]">Batch 2026.01 Edition</span>
              </li>
              <li>
                <span className="text-[#736E65]">ISO 22716 Clean Standard</span>
              </li>
              <li>
                <span className="text-[#736E65]">Nitrogen Flushed Sachets</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Massive Confident Typography Banner */}
        <div className="pt-16 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="font-serif text-[12vw] leading-[0.75] uppercase text-[#FFFDF8] tracking-tighter opacity-90">
              MASKED BY ME
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 font-mono text-[10px] text-[#736E65] tracking-widest uppercase">
            <span>© 2026 MASKED BY ME APOTHECARY</span>
            <span>ALL RIGHTS RESERVED</span>
            <span className="text-[#F05401]">100% UNADULTERATED</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
