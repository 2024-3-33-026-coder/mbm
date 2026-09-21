import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ALL_PRODUCTS } from '../data/products';
import { SachetVisual } from './SachetVisual';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const popularTags = ['all', 'glow', 'nourish', 'hydrate', 'detox', 'brighten', 'firm', 'soothe'];

  const results = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesSearch =
        searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.keyActives.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTag =
        selectedTag === 'all' ||
        product.skinGoals.some((g) => g.toLowerCase() === selectedTag.toLowerCase()) ||
        product.category.toLowerCase().includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#FFFDF8] border border-[#E8E0D2] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E8E0D2] flex items-center gap-3 bg-[#FAF6EE]">
          <Search size={20} className="text-[#9C9484]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search 28 single-origin ingredients, skin goals, or active compounds..."
            className="flex-1 bg-transparent text-sm font-sans placeholder-[#9C9484] text-[#242321] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs font-mono text-[#9C9484] hover:text-[#242321]"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#EFE8DC] text-[#736E65]"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="px-4 py-2.5 border-b border-[#E8E0D2] bg-[#F7F3EB] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#9C9484] shrink-0">
            FILTER:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1 rounded-full uppercase tracking-wider font-mono text-[10px] transition-colors shrink-0 ${
                selectedTag === tag
                  ? 'bg-[#242321] text-white'
                  : 'bg-white border border-[#E8E0D2] text-[#736E65] hover:border-[#242321]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-3 flex-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#736E65]">
              No botanical ingredients matched "{searchTerm}".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 rounded-xl border border-[#E8E0D2] hover:border-[#F05401] hover:bg-[#FAF6EE] cursor-pointer flex items-center gap-4 transition-all group"
              >
                <div className="w-12 h-16 bg-[#FFFDF8] rounded border border-[#E8E0D2] shrink-0 flex items-center justify-center p-1">
                  <SachetVisual product={product} size="sm" showShadow={false} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-mono tracking-wider font-semibold text-[#F05401]">
                      {product.category}
                    </span>
                    <span className="text-[#D9D2C5]">•</span>
                    <span className="text-[10px] text-[#736E65] font-mono">
                      {product.benefitTag}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#242321] group-hover:text-[#F05401] transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#736E65] truncate">
                    {product.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-xs font-bold text-[#242321] block">
                    ${product.price}
                  </span>
                  <span className="text-[10px] text-[#736E65] font-mono">
                    {product.netVol}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
