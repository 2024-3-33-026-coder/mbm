import React, { useState, useMemo } from 'react';
import { 
  Product, 
  MaskFormula, 
  CartItem, 
  ActivePage, 
  ProductCategory,
  CategoryFilter
} from './types';
import { ALL_PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EditorialCursor } from './components/EditorialCursor';
import { HeroEditorial } from './components/HeroEditorial';
import { SystemSection } from './components/SystemSection';
import { BasesGallery } from './components/BasesGallery';
import { BoostersArchive } from './components/BoostersArchive';
import { CampaignMoment } from './components/CampaignMoment';
import { LabExperience } from './components/LabExperience';
import { CatalogSection } from './components/CatalogSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AboutView } from './components/AboutView';
import { JournalView } from './components/JournalView';
import { Sparkles, Heart } from 'lucide-react';

export function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedBoosterForLab, setSelectedBoosterForLab] = useState<Product | null>(null);

  // Interactive States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['booster-turmeric', 'base-seamoss']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Grouped products
  const bases = useMemo(() => ALL_PRODUCTS.filter((p) => p.category === 'bases'), []);
  const boosters = useMemo(() => ALL_PRODUCTS.filter((p) => p.category === 'boosters'), []);

  // Cart Operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product?.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product?.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `single-${product.id}-${Date.now()}`,
          type: 'single',
          name: `${product.name} (${product.category.toUpperCase()})`,
          price: product.price,
          quantity,
          product,
        };
        return [...prev, newItem];
      }
    });
    showToast(`Added ${product.name} to your apothecary bag.`);
  };

  const handleAddFormulaToCart = (formula: MaskFormula) => {
    const newItem: CartItem = {
      id: formula.id,
      type: 'bundle',
      name: `Bespoke Ritual: ${formula.name}`,
      price: 42.0, // Special bundle rate
      quantity: 1,
      formula,
    };
    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
    showToast(`Added bespoke ritual "${formula.name}" to your bag.`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed ${product.name} from saved items.`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to your wishlist.`);
        return [...prev, product.id];
      }
    });
  };

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const scrollToLab = () => {
    setActivePage('home');
    const labEl = document.getElementById('mask-lab');
    if (labEl) {
      labEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLabWithBooster = (booster: Product) => {
    setSelectedBoosterForLab(booster);
    scrollToLab();
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#242321] flex flex-col font-sans selection:bg-[#FEE7B5] selection:text-[#242321] overflow-x-hidden">
      
      {/* Luxury Custom Spring Physics Cursor */}
      <EditorialCursor />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#242321] text-white px-5 py-3 rounded-full shadow-2xl text-xs font-mono tracking-wider uppercase border border-[#443E38] flex items-center gap-2.5 animate-in slide-in-from-bottom duration-300">
          <Sparkles size={13} className="text-[#F05401] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Minimal Editorial Header */}
      <Header
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActivePage('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        wishlistCount={wishlist.length}
      />

      {/* Main Experience Flow */}
      <main className="flex-1 w-full">
        
        {/* ========================================================
            PAGE 1: COMPLETE CINEMATIC EDITORIAL HOME EXPERIENCE
           ======================================================== */}
        {activePage === 'home' && (
          <div className="w-full">
            
            {/* 1. Full-Screen Cinematic Hero */}
            <HeroEditorial
              onExploreSystem={() => {
                const sysEl = document.getElementById('system-section');
                if (sysEl) sysEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onStartLab={scrollToLab}
              onSelectProductBySlug={(slug) => {
                const found = ALL_PRODUCTS.find((p) => p.slug === slug);
                if (found) {
                  setSelectedProduct(found);
                } else {
                  scrollToLab();
                }
              }}
            />

            {/* 2. Section 02: "FOUR PARTS. INFINITE RITUALS." */}
            <div id="system-section">
              <SystemSection
                onSelectCategory={(cat) => {
                  setActiveCategory(cat);
                  setActivePage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenLab={scrollToLab}
              />
            </div>

            {/* 3. Section 03: The 6 Bases Horizontal Editorial Gallery */}
            <BasesGallery
              bases={bases}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p, 1)}
            />

            {/* 4. Section 04: The 14 Cryo-Dried Boosters Magazine Archive */}
            <BoostersArchive
              boosters={boosters}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onOpenLabWithBooster={handleOpenLabWithBooster}
            />

            {/* 5. Campaign Moment: "28 INGREDIENTS. ZERO DILUTION." */}
            <CampaignMoment
              onBuildMaskClick={scrollToLab}
              onExploreJournal={() => {
                setActivePage('journal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 6. Section 05: The Interactive Laboratory & Collision Assembly */}
            <LabExperience
              products={ALL_PRODUCTS}
              onAddFormulaToCart={handleAddFormulaToCart}
              onOpenProductDetail={(prod) => setSelectedProduct(prod)}
              initialBooster={selectedBoosterForLab}
            />

            {/* 7. Section 06: Complete 28 Raw Bioactives Editorial Index */}
            <CatalogSection
              products={ALL_PRODUCTS}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p, 1)}
            />

          </div>
        )}

        {/* ========================================================
            PAGE 2: DEDICATED CATALOG / SHOP VIEW
           ======================================================== */}
        {activePage === 'shop' && (
          <div className="w-full">
            <CatalogSection
              products={ALL_PRODUCTS}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p, 1)}
            />
          </div>
        )}

        {/* ========================================================
            PAGE 3: DEDICATED BUILD YOUR MASK LAB VIEW
           ======================================================== */}
        {activePage === 'build-your-mask' && (
          <div className="w-full">
            <LabExperience
              products={ALL_PRODUCTS}
              onAddFormulaToCart={handleAddFormulaToCart}
              onOpenProductDetail={(prod) => setSelectedProduct(prod)}
              initialBooster={selectedBoosterForLab}
            />
          </div>
        )}

        {/* ========================================================
            PAGE 4: PHILOSOPHY / ABOUT VIEW
           ======================================================== */}
        {activePage === 'about' && (
          <AboutView 
            onBuildMask={() => {
              setActivePage('build-your-mask');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ========================================================
            PAGE 5: EDITORIAL JOURNAL
           ======================================================== */}
        {activePage === 'journal' && (
          <JournalView
            onBuildMask={() => {
              setActivePage('build-your-mask');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ========================================================
            PAGE 6: SAVED RITUAL WISHLIST
           ======================================================== */}
        {activePage === 'wishlist' && (
          <div className="max-w-[1520px] mx-auto px-6 sm:px-8 lg:px-12 py-20">
            <div className="pb-12 border-b border-[#242321]/15 mb-12">
              <span className="font-mono text-xs text-[#F05401] uppercase tracking-[0.25em] font-bold block mb-2">
                SAVED BIOACTIVES
              </span>
              <h1 className="headline-sub font-serif text-[#242321] uppercase">
                YOUR APOTHECARY ARCHIVE.
              </h1>
            </div>

            {wishlist.length === 0 ? (
              <div className="text-center py-20 bg-[#FAF6EE] border border-[#E8DFC8] rounded-2xl max-w-lg mx-auto p-8 space-y-4">
                <Heart size={32} className="mx-auto text-[#736E65]" />
                <h3 className="font-serif text-2xl uppercase text-[#242321]">
                  NO SAVED INGREDIENTS YET
                </h3>
                <p className="text-xs font-mono text-[#736E65]">
                  Save any botanical while exploring to curate your custom formulations.
                </p>
                <button
                  onClick={() => setActivePage('shop')}
                  className="px-6 py-3 rounded-full bg-[#242321] text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#F05401] transition-colors"
                >
                  EXPLORE ARCHIVE
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {ALL_PRODUCTS.filter((p) => wishlist.includes(p.id)).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="p-6 bg-[#FAF6EE] border border-[#E8DFC8] rounded-2xl cursor-pointer hover:border-[#242321] transition-all group"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-white">
                      <img
                        src={product.rawIngredientImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="font-mono text-[9px] uppercase text-[#F05401] font-bold">
                      {product.category}
                    </span>
                    <h4 className="font-serif text-2xl uppercase text-[#242321] mt-1">
                      {product.name}
                    </h4>
                    <div className="mt-4 flex items-center justify-between font-mono text-xs">
                      <span className="font-bold">${product.price} USD</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="text-[#F05401] hover:underline font-bold"
                      >
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Global Editorial Footer */}
      <Footer 
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActivePage('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* High-Fashion Editorial Product Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onSelectRelated={(p) => setSelectedProduct(p)}
        onStartCustomMaskWith={(p) => handleOpenLabWithBooster(p)}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Apothecary Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsSearchOpen(false);
        }}
      />

    </div>
  );
}
export default App;
