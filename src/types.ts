export type ProductCategory = 'bases' | 'boosters' | 'gels' | 'oils';

export type CategoryFilter = 'all' | ProductCategory;

export type SkinGoal = 'glow' | 'nourish' | 'hydrate' | 'detox' | 'refresh' | 'brighten' | 'firm' | 'soothe';

export interface PackagingSpec {
  netWt: string;
  form: string;
  sealType: string;
  shelfLife: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subtitle: string;
  benefitTag: string;
  skinGoals: SkinGoal[];
  price: number;
  netVol: string;
  description: string;
  whyYouLoveIt: string[];
  keyActives: string[];
  fullIngredients: string;
  howToUse: string;
  texture: string;
  colorAccent: string; // Hex for subtle background/powder swatch
  pairsWith: string[]; // IDs of complementary products
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  stock: number;
  rawIngredientImage: string;
  packshotImage?: string;
  sachetColor: string;
  isLiquidSachet?: boolean;
}

export interface MaskFormula {
  id: string;
  name: string;
  targetGoal: string;
  base: Product | null;
  booster: Product | null;
  gel: Product | null;
  oil: Product | null;
  notes?: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  type: 'single' | 'bundle';
  name: string;
  product?: Product;
  formula?: MaskFormula;
  quantity: number;
  price: number;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  image: string;
  content: string[];
}

export type ActivePage = 
  | 'home' 
  | 'shop' 
  | 'bases' 
  | 'boosters' 
  | 'gels' 
  | 'oils' 
  | 'build-your-mask' 
  | 'product-detail' 
  | 'about' 
  | 'journal' 
  | 'journal-detail'
  | 'cart' 
  | 'account' 
  | 'wishlist' 
  | 'faq' 
  | 'contact';
