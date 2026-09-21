import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MaskedByMeLogo } from './MaskedByMeLogo';
import { ActivePage, ProductCategory, CategoryFilter } from '../types';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (cat: CategoryFilter) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMegaOpen, setShopMegaOpen] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<ProductCategory>('bases');

  // Track scroll direction for luxury navbar compression
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 80 && currentScrollY > lastScrollY) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      id: 'bases' as ProductCategory,
      num: '01',
      name: 'BASES',
      count: 6,
      preview: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
      desc: 'Clays, Irish sea moss, and raw unrefined Ghanaian shea balm.',
    },
    {
      id: 'boosters' as ProductCategory,
      num: '02',
      name: 'BOOSTERS',
      count: 14,
      preview: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
      desc: 'Flash freeze-dried active botanical powders (curcumin, beetroot, EGCG).',
    },
    {
      id: 'gels' as ProductCategory,
      num: '03',
      name: 'GELS',
      count: 2,
      preview: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
      desc: 'Biocompatible hydrophilic hydrogels that activate the powders.',
    },
    {
      id: 'oils' as ProductCategory,
      num: '04',
      name: 'OILS',
      count: 4,
      preview: 'https://images.unsplash.com/photo-1608248597359-bb43644fcfcb?auto=format&fit=crop&w=600&q=80',
      desc: 'Virgin cold-pressed lipid barriers (rosehip, jojoba, argan, tea tree).',
    },
  ];

  return (
    <>
      {/* Luxury Editorial Header Bar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 select-none ${
          isScrolledDown
            ? 'h-14 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#EFE7DA] shadow-sm'
            : 'h-16 bg-[#FFFDF8] border-b border-[#EFE7DA]'
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center justify-between">
          
          {/* Left: Master Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-1 focus:outline-none"
              aria-label="Masked By Me Home"
            >
              <MaskedByMeLogo variant="orange" size={isScrolledDown ? 'sm' : 'md'} />
            </button>
          </div>

          {/* Center: Minimalist High-Fashion Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-10 text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-[#242321]">
            
            {/* SHOP with Editorial Mega Menu Trigger */}
            <div
              className="relative py-4"
              onMouseEnter={() => setShopMegaOpen(true)}
              onMouseLeave={() => setShopMegaOpen(false)}
            >
              <button
                onClick={() => {
                  onSelectCategory('all');
                  setActivePage('shop');
                }}
                className={`flex items-center gap-1.5 transition-colors hover:text-[#F05401] ${
                  activePage === 'shop' || shopMegaOpen ? 'text-[#F05401]' : ''
                }`}
              >
                <span>SHOP</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${shopMegaOpen ? 'rotate-180 text-[#F05401]' : ''}`}
                />
              </button>

              {/* Mega Menu Dropdown (Warm Cream Luxury Catalog) */}
              <AnimatePresence>
                {shopMegaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-full -left-24 w-[740px] pt-2"
                  >
                    <div className="bg-[#FAF6EE] border border-[#E8DFC8] rounded-2xl shadow-2xl p-8 grid grid-cols-12 gap-8 overflow-hidden">
                      
                      {/* Left: 4 Large Typographic Category Blocks */}
                      <div className="col-span-7 space-y-4 divide-y divide-[#242321]/10">
                        <div className="pb-2">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#736E65]">
                            CATEGORIES // 28 INGREDIENTS
                          </span>
                        </div>

                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onMouseEnter={() => setHoveredCategory(cat.id)}
                            onClick={() => {
                              onSelectCategory(cat.id);
                              setActivePage('shop');
                              setShopMegaOpen(false);
                            }}
                            className="w-full pt-4 pb-2 flex items-baseline justify-between text-left group transition-all"
                          >
                            <div className="flex items-baseline gap-3">
                              <span className="font-mono text-xs text-[#F05401] font-bold">
                                {cat.num}
                              </span>
                              <h4 className="font-serif text-3xl uppercase text-[#242321] group-hover:text-[#F05401] transition-colors">
                                {cat.name}
                              </h4>
                            </div>

                            <span className="font-mono text-[10px] text-[#736E65]">
                              [{cat.count}]
                            </span>
                          </button>
                        ))}

                        <div className="pt-4 flex items-center justify-between">
                          <button
                            onClick={() => {
                              onSelectCategory('all');
                              setActivePage('shop');
                              setShopMegaOpen(false);
                            }}
                            className="font-mono text-[10px] font-bold tracking-widest uppercase text-[#F05401] hover:underline flex items-center gap-1.5"
                          >
                            <span>VIEW COMPLETE 28-INGREDIENT ARCHIVE</span>
                            <ArrowRight size={11} />
                          </button>
                        </div>
                      </div>

                      {/* Right: Dynamic Category Packshot Preview */}
                      <div className="col-span-5 relative rounded-xl overflow-hidden border border-[#E8DFC8] bg-white flex flex-col justify-end p-4">
                        <img
                          src={categories.find((c) => c.id === hoveredCategory)?.preview}
                          alt="Category Preview"
                          className="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#242321]/80 via-transparent to-transparent" />
                        <div className="relative z-10 text-white space-y-1">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FEE7B5]">
                            {hoveredCategory.toUpperCase()}
                          </span>
                          <p className="text-xs font-light text-white/90 leading-tight">
                            {categories.find((c) => c.id === hoveredCategory)?.desc}
                          </p>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BUILD YOUR MASK */}
            <button
              onClick={() => {
                setActivePage('build-your-mask');
                const labElement = document.getElementById('mask-lab');
                if (labElement) {
                  labElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`hover:text-[#F05401] transition-colors flex items-center gap-1.5 ${
                activePage === 'build-your-mask' ? 'text-[#F05401]' : ''
              }`}
            >
              <Sparkles size={12} className="text-[#F05401]" />
              <span>BUILD YOUR MASK</span>
            </button>

            {/* PHILOSOPHY */}
            <button
              onClick={() => {
                setActivePage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-[#F05401] transition-colors ${
                activePage === 'about' ? 'text-[#F05401]' : ''
              }`}
            >
              PHILOSOPHY
            </button>

            {/* JOURNAL */}
            <button
              onClick={() => {
                setActivePage('journal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-[#F05401] transition-colors ${
                activePage === 'journal' ? 'text-[#F05401]' : ''
              }`}
            >
              JOURNAL
            </button>
          </nav>

          {/* Right: Search & Luxury Apothecary Bag Trigger */}
          <div className="flex items-center space-x-6">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-1 text-[#242321] hover:text-[#F05401] transition-colors"
              aria-label="Search Bioactives"
              data-cursor="SEARCH"
            >
              <Search size={18} />
            </button>

            {/* Minimal Apothecary Bag Button */}
            <button
              onClick={onOpenCart}
              data-cursor="BAG"
              className="relative p-1 text-[#242321] hover:text-[#F05401] transition-colors flex items-center gap-2"
              aria-label="Open Apothecary Bag"
            >
              <ShoppingBag size={18} />
              <span className="font-mono text-xs font-bold text-[#242321]">
                [{cartCount}]
              </span>
            </button>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 text-[#242321] hover:text-[#F05401] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

        </div>

        {/* Mobile Fullscreen Navigation Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#FAF6EE] border-b border-[#E8DFC8] px-6 py-8 space-y-6"
            >
              <div className="space-y-4">
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    setActivePage('shop');
                    setMobileMenuOpen(false);
                  }}
                  className="block font-serif text-3xl uppercase text-[#242321] hover:text-[#F05401]"
                >
                  SHOP INGREDIENTS
                </button>
                <button
                  onClick={() => {
                    setActivePage('build-your-mask');
                    setMobileMenuOpen(false);
                  }}
                  className="block font-serif text-3xl uppercase text-[#F05401]"
                >
                  BUILD YOUR MASK
                </button>
                <button
                  onClick={() => {
                    setActivePage('about');
                    setMobileMenuOpen(false);
                  }}
                  className="block font-serif text-3xl uppercase text-[#242321]"
                >
                  PHILOSOPHY
                </button>
                <button
                  onClick={() => {
                    setActivePage('journal');
                    setMobileMenuOpen(false);
                  }}
                  className="block font-serif text-3xl uppercase text-[#242321]"
                >
                  JOURNAL
                </button>
              </div>

              <div className="pt-4 border-t border-[#242321]/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#736E65]">28 BIOACTIVES</span>
                <span className="text-[#F05401] font-bold">100% UNADULTERATED</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
