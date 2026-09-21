import React, { useState } from 'react';
import { Product } from '../types';
import { ALL_PRODUCTS } from '../data/products';
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ShoppingBag, 
  Heart,
  Share2
} from 'lucide-react';
import { MaskedByMeLogo } from './MaskedByMeLogo';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectRelated: (product: Product) => void;
  onStartCustomMaskWith?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onSelectRelated,
  onStartCustomMaskWith,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [activeChapter, setActiveChapter] = useState<'ingredient' | 'why' | 'usage' | 'pairs'>('ingredient');
  const [copied, setCopied] = useState(false);

  // Find paired complementary products
  const pairedProducts = ALL_PRODUCTS.filter((p) =>
    product.pairsWith.includes(p.id)
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#FFFDF8] border border-[#E8DFC8] rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden overflow-y-auto select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/90 border border-[#E8DFC8] flex items-center justify-center text-[#242321] hover:text-[#F05401] hover:border-[#F05401] transition-all shadow-md"
          aria-label="Close editorial view"
        >
          <X size={18} />
        </button>

        {/* Left Column: Massive Editorial Product Image Escaping Frame */}
        <div className="lg:w-1/2 bg-[#FAF6EE] border-b lg:border-b-0 lg:border-r border-[#E8DFC8] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          
          {/* Top Stamp */}
          <div className="flex items-center justify-between w-full font-mono text-xs text-[#736E65] z-10">
            <span className="uppercase tracking-[0.25em] text-[#F05401] font-bold">
              LOT // {product.category.toUpperCase()}
            </span>
            <span className="tracking-wider uppercase">
              100% UNADULTERATED
            </span>
          </div>

          {/* Center: Hero Packshot Visual */}
          <div className="my-8 relative flex items-center justify-center z-10">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-[#E8DFC8] shadow-2xl bg-white">
              <img
                src={product.rawIngredientImage}
                alt={product.name}
                className="w-full h-full object-cover grayscale-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#242321]/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white font-mono text-[10px] tracking-widest uppercase flex justify-between">
                <span>{product.netVol} POUCH</span>
                <span className="text-[#FEE7B5]">{product.benefitTag}</span>
              </div>
            </div>
          </div>

          {/* Provenance Card */}
          <div className="w-full p-4 rounded-xl bg-white/80 border border-[#E8DFC8] backdrop-blur-sm z-10 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-[9px] text-[#736E65] block uppercase tracking-wider">
                EXTRACTION STANDARD
              </span>
              <span className="text-[#242321] font-bold uppercase">
                Flash Cryo-Dried at –40°C
              </span>
            </div>
            <span className="text-emerald-700 font-bold">• IN STOCK ({product.stock})</span>
          </div>

        </div>

        {/* Right Column: Visual Chapters & High-Fashion Typography */}
        <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between overflow-y-auto">
          <div>
            
            {/* Top Micro Eyebrows */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F05401] font-bold">
                {product.category} • {product.benefitTag} • {product.netVol}
              </span>

              <div className="flex items-center gap-2">
                {onToggleWishlist && (
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className="p-2 rounded-full border border-[#E8DFC8] hover:text-[#F05401] transition-colors"
                    title="Save to Ritual Bag"
                  >
                    <Heart size={15} fill={isWishlisted ? '#F05401' : 'none'} className={isWishlisted ? 'text-[#F05401]' : 'text-[#736E65]'} />
                  </button>
                )}
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full border border-[#E8DFC8] hover:text-[#F05401] transition-colors text-[#736E65]"
                  title="Share link"
                >
                  <Share2 size={15} />
                </button>
              </div>
            </div>

            {/* Massive Product Headline */}
            <h2 className="headline-sub font-serif uppercase text-[#242321] leading-[0.88]">
              {product.name}
            </h2>
            <span className="font-serif italic text-2xl text-[#736E65] block mt-1">
              {product.subtitle}
            </span>

            {/* Price Row */}
            <div className="mt-4 pt-4 border-t border-[#242321]/10 flex items-baseline gap-2 font-mono">
              <span className="text-3xl font-bold text-[#242321]">
                ${product.price}.00
              </span>
              <span className="text-xs text-[#736E65] uppercase">USD</span>
            </div>

            {/* Visual Chapters Navigation */}
            <div className="mt-8 border-b border-[#242321]/15 flex items-center gap-6 font-mono text-[10px] tracking-widest uppercase font-semibold">
              {[
                { id: 'ingredient', label: 'THE INGREDIENT' },
                { id: 'why', label: 'WHY IT EXISTS' },
                { id: 'usage', label: 'HOW TO USE' },
                { id: 'pairs', label: 'PAIR IT WITH' },
              ].map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapter(ch.id as any)}
                  className={`pb-3 transition-colors border-b-2 ${
                    activeChapter === ch.id
                      ? 'border-[#F05401] text-[#F05401]'
                      : 'border-transparent text-[#736E65] hover:text-[#242321]'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>

            {/* Chapter Content Area */}
            <div className="py-6 min-h-[160px]">
              
              {/* Chapter 01: THE INGREDIENT */}
              {activeChapter === 'ingredient' && (
                <div className="space-y-4">
                  <p className="text-sm text-[#5A554D] leading-relaxed font-light">
                    {product.description}
                  </p>
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-[#736E65] uppercase tracking-wider block mb-1">
                      KEY BIOACTIVE COMPOUNDS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.keyActives.map((act, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-[#FAF6EE] border border-[#E8DFC8] text-[10px] font-mono text-[#242321]"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Chapter 02: WHY IT EXISTS */}
              {activeChapter === 'why' && (
                <div className="space-y-3">
                  {product.whyYouLoveIt.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#FFF2EB] border border-[#FCD9C6] text-[#F05401] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span className="text-xs text-[#5A554D] leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                  <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DFC8] text-xs text-[#5A554D] font-mono mt-3">
                    <span className="text-[#242321] font-bold">FULL INCI: </span>
                    {product.fullIngredients}
                  </div>
                </div>
              )}

              {/* Chapter 03: HOW TO USE */}
              {activeChapter === 'usage' && (
                <div className="space-y-4 text-xs text-[#5A554D]">
                  <p className="leading-relaxed font-light text-sm">
                    {product.howToUse}
                  </p>
                  <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DFC8] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#F05401] font-bold block">
                      TEXTURE PROFILE
                    </span>
                    <p className="font-sans text-xs text-[#242321]">
                      {product.texture}
                    </p>
                  </div>
                </div>
              )}

              {/* Chapter 04: PAIR IT WITH */}
              {activeChapter === 'pairs' && (
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#736E65] block">
                    RECOMMENDED COMPLEMENTARY ACTIVES:
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {pairedProducts.map((paired) => (
                      <button
                        key={paired.id}
                        onClick={() => onSelectRelated(paired)}
                        className="p-3 rounded-xl border border-[#E8DFC8] bg-[#FAF6EE] hover:border-[#F05401] text-left transition-all group"
                      >
                        <span className="text-[8px] font-mono text-[#F05401] uppercase block">
                          {paired.category}
                        </span>
                        <h5 className="font-serif text-base uppercase text-[#242321] group-hover:text-[#F05401] font-bold truncate">
                          {paired.name}
                        </h5>
                        <span className="text-[10px] font-mono text-[#736E65]">
                          ${paired.price} USD
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-[#242321]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Quantity Selector */}
            <div className="flex items-center border border-[#242321]/20 rounded-full px-3 py-1.5 font-mono text-xs">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-0.5 hover:text-[#F05401] font-bold"
              >
                -
              </button>
              <span className="px-3 font-bold text-[#242321]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-0.5 hover:text-[#F05401] font-bold"
              >
                +
              </button>
            </div>

            {/* Add to Bag Button */}
            <button
              onClick={() => {
                onAddToCart(product, quantity);
                onClose();
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#242321] hover:bg-[#F05401] text-white transition-colors duration-300 font-mono text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 rounded-full shadow-lg"
            >
              <ShoppingBag size={14} />
              <span>ADD TO BAG • ${(product.price * quantity).toFixed(2)} USD</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
