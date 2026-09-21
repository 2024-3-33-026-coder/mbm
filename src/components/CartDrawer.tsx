import React, { useState } from 'react';
import { CartItem, Product, MaskFormula } from '../types';
import { SachetVisual } from './SachetVisual';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Gift, 
  CreditCard 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  // Totals calculation
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const shippingThreshold = 50;
  const isFreeShipping = subtotal >= shippingThreshold || items.length === 0;
  const shippingCost = isFreeShipping ? 0 : 5.0;
  const total = Math.max(0, subtotal - discountAmount + (subtotal > 0 ? shippingCost : 0));
  const progressToFreeShipping = Math.min(100, (subtotal / shippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GLOW15') {
      setAppliedDiscount(0.15);
      setPromoMessage('15% off applied successfully!');
    } else if (promoCode.trim().toUpperCase() === 'FREESHIP') {
      setPromoMessage('Free express shipping code applied!');
    } else {
      setPromoMessage('Invalid code. Try "GLOW15" for 15% off.');
    }
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      setIsCheckingOut(false);
      onClose();
      alert('Order Confirmed! Your botanical ritual has been prepared for dispatch.');
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF8] border-l border-[#E8E0D2] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8E0D2] flex items-center justify-between bg-[#FAF6EE]">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#F05401]" />
              <h2 className="font-serif text-lg font-bold text-[#242321]">
                Your Apothecary Bag
              </h2>
              <span className="text-xs font-mono font-bold text-[#736E65] px-2 py-0.5 rounded-full bg-[#EFE8DC]">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#EFE8DC] text-[#736E65] transition-colors"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-[#F7F3EB] border-b border-[#E8E0D2]">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-[#5A554D]">
                {isFreeShipping
                  ? '🎉 You unlocked Complimentary Express Shipping!'
                  : `Add $${(shippingThreshold - subtotal).toFixed(2)} more for Free Shipping`}
              </span>
              <span className="font-bold text-[#242321]">
                {Math.round(progressToFreeShipping)}%
              </span>
            </div>
            <div className="w-full bg-[#E5DDD0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#F05401] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border border-[#E8E0D2] flex items-center justify-center mx-auto text-[#9C9484]">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#242321]">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#736E65] max-w-xs mx-auto">
                  Select single-origin freeze-dried sachets or build a complete 4-part bespoke facial ritual.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-[#242321] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#F05401] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-[#E8E0D2] bg-white flex gap-3.5 relative hover:border-[#D0C7B6] transition-colors"
                >
                  {/* Thumbnail / Sachet */}
                  <div className="w-16 h-22 shrink-0 bg-[#FAF6EE] rounded-lg border border-[#E8E0D2] flex items-center justify-center overflow-hidden">
                    {item.product ? (
                      <SachetVisual product={item.product} size="sm" showShadow={false} />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center bg-[#FAF6EE]">
                        <Sparkles size={16} className="text-[#F05401] mb-1" />
                        <span className="text-[8px] font-mono uppercase font-bold text-[#242321]">
                          4-PART RITUAL
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-xs text-[#242321] truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#9C9484] hover:text-[#F05401] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {/* Formula sub-items pill breakdown if custom ritual */}
                      {item.formula ? (
                        <div className="mt-1 text-[10px] text-[#736E65] space-y-0.5 font-mono">
                          {item.formula.base && <p>• Base: {item.formula.base.name}</p>}
                          {item.formula.booster && <p>• Booster: {item.formula.booster.name}</p>}
                          {item.formula.gel && <p>• Gel: {item.formula.gel.name}</p>}
                          {item.formula.oil && <p>• Oil: {item.formula.oil.name}</p>}
                        </div>
                      ) : (
                        <p className="text-[11px] text-[#736E65] font-mono mt-0.5">
                          {item.product?.netVol} • Single Sachet
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2ECE0]">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#E8E0D2] rounded bg-[#FAF6EE]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-[#242321] hover:bg-[#EFE8DC]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-[#242321]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-[#242321] hover:bg-[#EFE8DC]"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-mono text-xs font-bold text-[#242321]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E8E0D2] bg-[#FAF6EE] space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Code (e.g. GLOW15)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-white border border-[#E8E0D2] rounded-lg px-3 py-1.5 text-xs font-mono uppercase focus:outline-none focus:border-[#F05401]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg border border-[#242321] text-xs font-semibold text-[#242321] hover:bg-[#242321] hover:text-white transition-colors"
                >
                  APPLY
                </button>
              </form>
              {promoMessage && (
                <p className="text-[11px] font-mono text-[#F05401] -mt-2">
                  {promoMessage}
                </p>
              )}

              {/* Price summary */}
              <div className="space-y-1.5 text-xs text-[#5A554D] font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#242321] font-bold">${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#F05401]">
                    <span>Discount (15%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#242321] pt-2 border-t border-[#E8E0D2]">
                  <span>Total Due</span>
                  <span>${total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Checkout Trigger Button */}
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 rounded-xl bg-[#242321] text-white hover:bg-[#F05401] transition-colors font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <CreditCard size={15} />
                <span>PROCEED TO CHECKOUT • ${total.toFixed(2)}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#736E65] font-mono">
                <ShieldCheck size={13} className="text-emerald-700" />
                <span>Encrypted 256-Bit SSL • Carbon-Neutral Dispatch</span>
              </div>
            </div>
          )}

          {/* Checkout Modal Simulation */}
          {isCheckingOut && (
            <div className="absolute inset-0 bg-[#FFFDF8] z-30 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D2]">
                  <h3 className="font-serif text-xl font-bold text-[#242321]">
                    Secure Checkout
                  </h3>
                  <button
                    onClick={() => setIsCheckingOut(false)}
                    className="p-1 rounded hover:bg-[#F7F3EB] text-[#736E65]"
                  >
                    <X size={18} />
                  </button>
                </div>

                {checkoutComplete ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <Check size={32} />
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-[#242321]">
                      Order Confirmed!
                    </h4>
                    <p className="text-xs text-[#736E65] max-w-sm mx-auto">
                      Thank you for choosing botanical purity. Your custom sachets are being sealed in our sterile laboratory.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSimulatePayment} className="space-y-4 mt-6 text-xs">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#736E65] mb-1">
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        required
                        defaultValue="104 Rue Saint-Honoré, Paris"
                        className="w-full bg-white border border-[#E8E0D2] rounded-lg p-2.5 font-sans focus:outline-none focus:border-[#F05401]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#736E65] mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          defaultValue="Paris"
                          className="w-full bg-white border border-[#E8E0D2] rounded-lg p-2.5 font-sans focus:outline-none focus:border-[#F05401]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#736E65] mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          required
                          defaultValue="75001"
                          className="w-full bg-white border border-[#E8E0D2] rounded-lg p-2.5 font-mono focus:outline-none focus:border-[#F05401]"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#736E65] mb-1">
                        Card Number (Test Simulation)
                      </label>
                      <input
                        type="text"
                        required
                        defaultValue="•••• •••• •••• 4242"
                        className="w-full bg-white border border-[#E8E0D2] rounded-lg p-2.5 font-mono focus:outline-none focus:border-[#F05401]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#736E65] mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          defaultValue="08/28"
                          className="w-full bg-white border border-[#E8E0D2] rounded-lg p-2.5 font-mono focus:outline-none focus:border-[#F05401]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#736E65] mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          defaultValue="888"
                          className="w-full bg-white border border-[#E8E0D2] rounded-lg p-2.5 font-mono focus:outline-none focus:border-[#F05401]"
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#FAF6EE] border border-[#E8E0D2] text-[11px] text-[#5A554D] flex items-center gap-2">
                      <Gift size={16} className="text-[#F05401] shrink-0" />
                      <span>Complimentary Ceramic Mixing Bowl included with order.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#F05401] text-white hover:bg-[#D94B00] transition-colors font-semibold uppercase tracking-wider text-xs shadow-md mt-4"
                    >
                      PAY ${total.toFixed(2)} USD
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
