import { StreetFood, BambaiyaSlang, Neighborhood } from '@/types';

export const streetFoods: StreetFood[] = [
  {
    id: 'vada-pav',
    name: 'Vada Pav',
    description: 'Deep-fried potato dumpling served in a bread bun with chutneys',
    priceRange: '₹15-₹30',
    bestAreas: ['Dadar', 'CST', 'Andheri', 'Mohammed Ali Road'],
    spiceLevel: 'Medium',
    type: 'Veg',
    popularVariations: ['Cheese Vada Pav', 'Schezwan Vada Pav', 'Fried Vada Pav'],
    bestTime: 'Morning breakfast, evening snack',
    culturalSignificance: 'Mumbai\'s signature dish, called the "poor man\'s burger"',
    eatingTips: 'Eat hot, dip in green chutney, pair with cutting chai',
    emoji: '🥪'
  },
  {
    id: 'pav-bhaji',
    name: 'Pav Bhaji',
    description: 'Thick vegetable curry served with buttered bread rolls',
    priceRange: '₹40-₹120',
    bestAreas: ['Juhu Beach', 'Chowpatty', 'Mohammed Ali Road', 'Bandra'],
    spiceLevel: 'Medium',
    type: 'Veg',
    popularVariations: ['Cheese Pav Bhaji', 'Paneer Pav Bhaji', 'Jain Pav Bhaji'],
    bestTime: 'Evening, dinner',
    culturalSignificance: 'Weekend family favorite, beach food staple',
    eatingTips: 'Mix bhaji well, use pav to scoop, add extra butter',
    emoji: '🍛'
  },
  {
    id: 'bhel-puri',
    name: 'Bhel Puri',
    description: 'Puffed rice mixed with sev, chutneys, onions, and tomatoes',
    priceRange: '₹20-₹50',
    bestAreas: ['Chowpatty Beach', 'Juhu', 'Marine Drive', 'Bandra'],
    spiceLevel: 'Medium',
    type: 'Veg',
    popularVariations: ['Sukha Bhel', 'Masala Bhel', 'Mumbai Bhel'],
    bestTime: 'Evening snack, beach visits',
    culturalSignificance: 'Classic Mumbai chaat, beach culture essential',
    eatingTips: 'Eat immediately after mixing, don\'t let it get soggy',
    emoji: '🥗'
  },
  {
    id: 'pani-puri',
    name: 'Pani Puri',
    description: 'Crispy hollow puris filled with spiced water, chutneys, and fillings',
    priceRange: '₹20-₹60',
    bestAreas: ['Mohammed Ali Road', 'Dadar', 'Matunga', 'Colaba'],
    spiceLevel: 'Hot',
    type: 'Veg',
    popularVariations: ['Sukha Puri', 'Dahi Puri', 'Sev Puri'],
    bestTime: 'Evening snack',
    culturalSignificance: 'Social eating experience, street food ritual',
    eatingTips: 'Eat in one bite, start with less spicy water',
    emoji: '🫧'
  },
  {
    id: 'keema-pav',
    name: 'Keema Pav',
    description: 'Spiced minced meat curry served with bread rolls',
    priceRange: '₹60-₹150',
    bestAreas: ['Mohammed Ali Road', 'Colaba', 'Fort', 'Bandra'],
    spiceLevel: 'Hot',
    type: 'Non-Veg',
    popularVariations: ['Mutton Keema', 'Chicken Keema', 'Egg Keema'],
    bestTime: 'Breakfast, lunch',
    culturalSignificance: 'Mughlai influence, Ramadan special',
    eatingTips: 'Mix well, eat with raw onions',
    emoji: '🍖'
  },
  {
    id: 'frankie',
    name: 'Frankie',
    description: 'Rolled chapati with spiced filling and chutneys',
    priceRange: '₹40-₹120',
    bestAreas: ['Bandra', 'Colaba', 'Fort', 'Andheri'],
    spiceLevel: 'Medium',
    type: 'Veg',
    popularVariations: ['Chicken Frankie', 'Paneer Frankie', 'Egg Frankie'],
    bestTime: 'Lunch, dinner, late night',
    culturalSignificance: 'Mumbai\'s answer to wraps, office food',
    eatingTips: 'Hold with tissue paper, eat from one end',
    emoji: '🌯'
  }
];

export const bambaiyaSlang: BambaiyaSlang[] = [
  {
    id: 'bindaas',
    term: 'Bindaas',
    translation: 'Carefree, awesome, without worry',
    context: 'Attitude, approval',
    example: 'Ye bhel puri bindaas hai! (This bhel puri is awesome!)',
    formalityLevel: 'Informal',
    category: 'Emotions'
  },
  {
    id: 'bhidu',
    term: 'Bhidu',
    translation: 'Friend, buddy',
    context: 'Addressing friends',
    example: 'Kya scene hai bhidu? (What\'s up, buddy?)',
    formalityLevel: 'Very Informal',
    category: 'Greetings'
  },
  {
    id: 'jhakaas',
    term: 'Jhakaas',
    translation: 'Fantastic, excellent',
    context: 'Appreciation, approval',
    example: 'Ye pav bhaji jhakaas hai! (This pav bhaji is fantastic!)',
    formalityLevel: 'Informal',
    category: 'Emotions'
  },
  {
    id: 'cutting',
    term: 'Cutting',
    translation: 'Half portion (especially tea)',
    context: 'Ordering food/drinks',
    example: 'Ek cutting chai dena (Give one half portion of tea)',
    formalityLevel: 'Informal',
    category: 'Food-related'
  },
  {
    id: 'tapri',
    term: 'Tapri',
    translation: 'Small roadside tea stall',
    context: 'Casual dining, street food',
    example: 'Chalo tapri pe chai peete hai (Let\'s have tea at the roadside stall)',
    formalityLevel: 'Informal',
    category: 'Food-related'
  }
];

export const neighborhoods: Neighborhood[] = [
  {
    id: 'mohammed-ali-road',
    name: 'Mohammed Ali Road',
    description: 'Historic Muslim quarter famous for authentic Mughlai street food',
    signatureDishes: ['Keema Pav', 'Baida Roti', 'Malpua', 'Haleem', 'Seekh Kebabs'],
    famousStalls: ['Sarvi Restaurant', 'Noor Mohammadi Hotel', 'Minara Masjid area vendors'],
    bestVisitingTime: 'Evening after 6 PM, especially during Ramadan',
    crowdLevel: 'Very High',
    atmosphere: 'Bustling, traditional, aromatic with spices',
    priceRange: '₹50-₹300 per person',
    howToReach: 'CST Station (5 min walk), Masjid Bunder Station (10 min walk)',
    tags: ['Non-Veg', 'Traditional', 'Ramadan Special', 'Late Night']
  },
  {
    id: 'chowpatty-beach',
    name: 'Chowpatty Beach',
    description: 'Iconic beach promenade with classic Mumbai chaat culture',
    signatureDishes: ['Bhel Puri', 'Pav Bhaji', 'Kulfi', 'Pani Puri', 'Sev Puri'],
    famousStalls: ['Badshah Cold Drinks', 'various beach vendors'],
    bestVisitingTime: 'Evening 5-10 PM, weekends',
    crowdLevel: 'Very High',
    atmosphere: 'Breezy, family-friendly, festive',
    priceRange: '₹30-₹150 per person',
    howToReach: 'Charni Road Station (10 min walk), Grant Road Station (15 min walk)',
    tags: ['Beach Food', 'Family Friendly', 'Chaat', 'Weekend Special']
  },
  {
    id: 'bandra',
    name: 'Bandra',
    description: 'Trendy suburb mixing traditional street food with modern variations',
    signatureDishes: ['Frankie', 'Cheese Toast', 'Dabeli', 'Bombay Sandwich'],
    famousStalls: ['Elco Market', 'Hill Road vendors', 'Linking Road stalls'],
    bestVisitingTime: 'Evening 6-11 PM',
    crowdLevel: 'High',
    atmosphere: 'Hip, youthful, cosmopolitan',
    priceRange: '₹40-₹200 per person',
    howToReach: 'Bandra Station (West), Bus routes 211, 214, 215',
    tags: ['Modern', 'Trendy', 'Youth Favorite', 'Late Night']
  }
];

export const getSpiceLevelColor = (level: string): string => {
  switch (level) {
    case 'Mild': return 'text-green-600 bg-green-100';
    case 'Medium': return 'text-yellow-600 bg-yellow-100';
    case 'Hot': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getTypeColor = (type: string): string => {
  return type === 'Veg' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
};

export const getCrowdLevelColor = (level: string): string => {
  switch (level) {
    case 'Low': return 'text-green-600';
    case 'Moderate': return 'text-yellow-600';
    case 'High': return 'text-orange-600';
    case 'Very High': return 'text-red-600';
    case 'Extremely High': return 'text-red-800';
    default: return 'text-gray-600';
  }
};