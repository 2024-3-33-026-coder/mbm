import React from 'react';
import { Product } from '../types';
import { SachetVisual } from './SachetVisual';
import { Heart, Plus, Sparkles, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  return (
    <div className="group relative bg-[#FFFDF8] border border-[#E8E0D2] rounded-xl p-4 flex flex-col justify-between hover:border-[#D9CDB8] hover:shadow-xl transition-all duration-300">
      
      {/* Top action row: Badges + Wishlist toggle */}
      <div className="flex items-center justify-between w-full mb-2 z-20">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[9px] uppercase tracking-[0.2em] font-mono px-2 py-0.5 rounded bg-[#F7F3EB] border border-[#E8E0D2] text-[#736E65]">
            {product.category}
          </span>
          {product.bestSeller && (
            <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#441825] text-[#FEE7B5]">
              BESTSELLER
            </span>
          )}
        </div>

        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-1.5 rounded-full transition-colors ${
              isWishlisted
                ? 'text-[#F05401] bg-[#FFF2EB]'
                : 'text-[#9C9484] hover:text-[#F05401] hover:bg-[#F7F3EB]'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      {/* Center Sachet Visual Presentation */}
      <div
        onClick={() => onSelect(product)}
        className="w-full py-4 flex items-center justify-center cursor-pointer group-hover:scale-[1.03] transition-transform duration-300"
      >
        <SachetVisual product={product} size="md" interactive={false} />
      </div>

      {/* Product Information */}
      <div className="pt-3 border-t border-[#F2ECE0] flex flex-col justify-between flex-1 mt-2">
        <div 
          onClick={() => onSelect(product)}
          className="cursor-pointer"
        >
          {/* Benefit Badge */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[9px] uppercase tracking-[0.16em] font-semibold text-[#F05401]">
              {product.benefitTag}
            </span>
            <span className="text-[#C4BCAB]">•</span>
            <span className="text-[10px] text-[#736E65] font-mono">
              {product.netVol}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-sans font-bold text-base text-[#242321] group-hover:text-[#F05401] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-[#736E65] font-medium tracking-wide mt-0.5">
            {product.subtitle}
          </p>

          {/* Short Excerpt */}
          <p className="text-xs text-[#736E65] line-clamp-2 mt-2 leading-relaxed">
            {product.description}
          </p>

          {/* Key Actives Pill List */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.keyActives.slice(0, 2).map((act, i) => (
              <span
                key={i}
                className="text-[9px] px-2 py-0.5 bg-[#FAF6EE] border border-[#E8E0D2] rounded text-[#5A554D] truncate max-w-[130px]"
              >
                {act}
              </span>
            ))}
            {product.keyActives.length > 2 && (
              <span className="text-[9px] px-1.5 py-0.5 text-[#9C9484]">
                +{product.keyActives.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#F2ECE0] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-base font-bold text-[#242321]">
                ${product.price}
              </span>
              <span className="text-[10px] text-[#9C9484] font-mono">
                USD
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#736E65]">
              <Star size={11} className="fill-[#F05401] text-[#F05401]" />
              <span className="font-bold">{product.rating}</span>
              <span>({product.reviewsCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(product)}
              className="px-2.5 py-1.5 rounded-lg border border-[#E8E0D2] hover:border-[#242321] text-xs font-semibold text-[#242321] transition-colors"
            >
              DETAILS
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="p-2 rounded-lg bg-[#242321] text-white hover:bg-[#F05401] transition-colors flex items-center justify-center shadow-sm"
              title="Add to Bag"
              aria-label="Add to Bag"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
