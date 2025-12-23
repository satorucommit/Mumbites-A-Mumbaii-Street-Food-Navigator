export interface StreetFood {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  bestAreas: string[];
  spiceLevel: 'Mild' | 'Medium' | 'Hot';
  type: 'Veg' | 'Non-Veg';
  popularVariations: string[];
  bestTime: string;
  culturalSignificance: string;
  eatingTips: string;
  emoji: string;
}

export interface BambaiyaSlang {
  id: string;
  term: string;
  translation: string;
  context: string;
  example: string;
  formalityLevel: 'Very Informal' | 'Informal' | 'Informal/Rude' | 'Informal/Casual';
  category: 'Greetings' | 'Food-related' | 'Emotions' | 'Situations' | 'General';
}

export interface Neighborhood {
  id: string;
  name: string;
  description: string;
  signatureDishes: string[];
  famousStalls: string[];
  bestVisitingTime: string;
  crowdLevel: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Extremely High';
  atmosphere: string;
  priceRange: string;
  howToReach: string;
  tags: string[];
}

export interface FilterOptions {
  type: ('Veg' | 'Non-Veg')[];
  spiceLevel: ('Mild' | 'Medium' | 'Hot')[];
  priceRange: [number, number];
  locations: string[];
  searchQuery: string;
}

export interface ViewMode {
  mode: 'grid' | 'list';
}

export interface SortOption {
  value: 'name' | 'price' | 'spice' | 'popularity';
  label: string;
}