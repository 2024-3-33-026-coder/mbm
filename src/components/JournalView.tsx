import React, { useState } from 'react';
import { BookOpen, Clock, Tag, ArrowRight, ArrowLeft } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  readTime: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
}

const ARTICLES: Article[] = [
  {
    id: 'cryo-stabilization',
    title: 'Cryogenic Precision: Why We Freeze-Dry at -40°C',
    readTime: '4 min read',
    category: 'Biochemistry',
    date: 'SEPTEMBER 2026',
    excerpt:
      'Standard thermal dehydration destroys heat-sensitive phytonutrients and polyphenol rings. Here is how vacuum sublimation preserves 98.4% of living cellular actives.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80',
    content: [
      'In conventional cosmetic manufacturing, plant extracts are subjected to high-temperature spray drying (often exceeding 140°C). While inexpensive and fast, this brutal thermal exposure unravels delicate antioxidant structures, denatures plant enzymes, and turns vibrant carotenoids into inert powders.',
      'At Masked By Me, we utilize pharmaceutical-grade lyophilization. Organic fruits, roots, and botanicals are harvested at peak circadian potency and brought directly down to -40°C within hours.',
      'Inside a vacuum chamber, the pressure is lowered below the triple point of water (0.006 atm). Water ice transitions directly from solid to gas through sublimation, bypassing liquid water entirely. The cellular walls of the botanical remain structurally intact, leaving an anhydrous sponge that awakens instantly upon contact with our hydration gel.',
      'The result is a powder with up to 10x higher standardized active concentrations compared to shelf-stabilized cosmetic creams.'
    ]
  },
  {
    id: 'architecture-ritual',
    title: 'The Architecture of a Ritual: Bases, Boosters, Gels & Lipids',
    readTime: '6 min read',
    category: 'Formulation Guide',
    date: 'AUGUST 2026',
    excerpt:
      'Why you cannot simply apply raw clay or dry powder to your face. How our 4-stage synergy prevents epidermal water evaporation while maximizing transdermal absorption.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
    content: [
      'Clay masks have earned an unfortunate reputation for leaving skin red, tight, and dehydrated. This occurs because commercial clay masks are left to bake until bone dry, drawing essential interstitial moisture right out of the upper stratum corneum.',
      'Our 4-part modular system corrects this fundamental flaw through biochemical balance:',
      'Stage 1 (Base): Provides negative cation binding sites to attract excess sebum and environmental heavy metals without stripping your natural acid mantle.',
      'Stage 2 (Booster): Infuses concentrated freeze-dried vitamins, flavonoids, and fruit acids directly at the target concentration.',
      'Stage 3 (Hydration Gel): High-viscosity aloe polysaccharides and multi-weight hyaluronic polymers maintain a moist micro-environment for the entire 15-minute treatment, ensuring clay never dries to a cracking crust.',
      'Stage 4 (Lipid Seal): Cold-pressed botanical oils float to the outer boundary of the emulsion, forming a temporary occlusive shield that drives water-soluble actives deeper into the skin.'
    ]
  },
  {
    id: 'curcumin-staining',
    title: 'Curcumin Without Staining: The Lipophilic Secret of Jojoba',
    readTime: '3 min read',
    category: 'Ingredient Science',
    date: 'JULY 2026',
    excerpt:
      'Curcumin is nature’s most potent anti-inflammatory compound, but pure turmeric typically leaves a stubborn yellow tint. Here is the exact chemistry that neutralizes the dye.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    content: [
      'Turmeric root (Curcuma longa) contains brilliant yellow curcuminoids that have been celebrated for centuries in Ayurvedic medicine for calming reactive skin and brightening dull complexions.',
      'However, curcumin is inherently lipophilic (fat-soluble) with strong affinity for keratin protein. When mixed solely with water, it binds tenaciously to dead skin cells, causing the infamous turmeric stain.',
      'The breakthrough in our Golden Radiance ritual is the co-application of cold-pressed Golden Jojoba Oil. Jojoba is technically not an oil, but a liquid wax ester identical in molecular chain length to human sebum.',
      'When jojoba is whisked into the turmeric paste, curcumin molecules preferentially dissolve into the surrounding liquid wax matrix rather than bonding to keratin. After 15 minutes, warm water rinses the emulsified mask away completely clean—leaving radiant, calmed skin with zero yellow discoloration.'
    ]
  },
  {
    id: 'clays-comparison',
    title: 'Dead Sea Mud vs. French Green Clay: Choosing Your Detox Matrix',
    readTime: '5 min read',
    category: 'Comparative Guide',
    date: 'JUNE 2026',
    excerpt:
      'Both draw impurities, but one re-mineralizes with magnesium chloride while the other tightens pores with montmorillonite minerals. Which is right for your skin profile?',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
    content: [
      'Not all earthy bases behave identically upon contact with human epidermis. Choosing between Dead Sea Mud and French Green Clay comes down to your current lipid balance and mineral needs.',
      'French Green Clay (Illite & Montmorillonite) owes its jade hue to decomposed plant matter and iron oxide. It has exceptional cation absorption capability, making it the supreme choice for congested, acne-prone, or excessively oily skin.',
      'Dead Sea Mud, by contrast, is harvested from the lowest elevation on Earth. It contains 21 concentrated minerals—specifically magnesium, calcium, and potassium. Magnesium chloride accelerates barrier repair and calms eczema flare-ups.',
      'If your goal is deep pore clearing and sebum balance, choose French Green Clay. If your goal is replenishing moisture, easing redness, and restoring depleted skin, choose Dead Sea Mud.'
    ]
  }
];

interface JournalViewProps {
  onBuildMask: () => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ onBuildMask }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (selectedArticle) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-in fade-in duration-200">
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#736E65] hover:text-[#F05401] mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Journal Index
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono text-[#736E65]">
            <span className="text-[#F05401] font-bold uppercase">{selectedArticle.category}</span>
            <span>•</span>
            <span>{selectedArticle.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {selectedArticle.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif text-[#242321] leading-tight">
            {selectedArticle.title}
          </h1>

          <p className="text-base text-[#5A554D] italic border-l-2 border-[#F05401] pl-4 py-1">
            {selectedArticle.excerpt}
          </p>

          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className="w-full h-72 sm:h-96 object-cover rounded-2xl my-6 border border-[#E8E0D2]"
            referrerPolicy="no-referrer"
          />

          <div className="space-y-4 text-sm sm:text-base text-[#4D4841] leading-relaxed font-serif pt-4">
            {selectedArticle.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-[#FAF6EE] border border-[#E8E0D2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-sans font-bold text-base text-[#242321]">
                Experience This Formulation Fresh
              </h4>
              <p className="text-xs text-[#736E65]">
                Custom-mix your 4-step ritual in our formulation bowl.
              </p>
            </div>
            <button
              onClick={onBuildMask}
              className="px-5 py-2.5 rounded-lg bg-[#F05401] text-white hover:bg-[#D94B00] transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shrink-0"
            >
              <span>Build Your Mask</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#F05401] font-semibold block">
          THE APOTHECARY CHRONICLES
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-[#242321] tracking-tight">
          Botanical Science & Ritual Theory
        </h1>
        <p className="text-sm text-[#736E65] leading-relaxed">
          Peer-reviewed dermatology, formulation mechanics, and the biochemistry of freshly activated phytonutrients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ARTICLES.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group bg-[#FFFDF8] border border-[#E8E0D2] rounded-2xl overflow-hidden hover:border-[#D0C7B6] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="h-52 overflow-hidden relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#242321]/80 backdrop-blur-xs text-[10px] uppercase font-mono tracking-wider font-semibold text-[#FEE7B5]">
                {article.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#9C9484] mb-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#242321] group-hover:text-[#F05401] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-[#736E65] line-clamp-3 mt-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2ECE0] flex items-center justify-between text-xs font-semibold text-[#242321] group-hover:text-[#F05401]">
                <span>READ ARTICLE</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
