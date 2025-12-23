import { StreetFood, FilterOptions } from '@/types';

export const filterFoods = (foods: StreetFood[], filters: FilterOptions): StreetFood[] => {
  return foods.filter(food => {
    // Type filter
    if (filters.type.length > 0 && !filters.type.includes(food.type)) {
      return false;
    }

    // Spice level filter
    if (filters.spiceLevel.length > 0 && !filters.spiceLevel.includes(food.spiceLevel)) {
      return false;
    }

    // Location filter
    if (filters.locations.length > 0) {
      const hasMatchingLocation = food.bestAreas.some(area => 
        filters.locations.some(location => 
          area.toLowerCase().includes(location.toLowerCase())
        )
      );
      if (!hasMatchingLocation) return false;
    }

    // Search query filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = `${food.name} ${food.description} ${food.bestAreas.join(' ')} ${food.popularVariations.join(' ')}`.toLowerCase();
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    return true;
  });
};

export const sortFoods = (foods: StreetFood[], sortBy: string): StreetFood[] => {
  const sortedFoods = [...foods];
  
  switch (sortBy) {
    case 'name':
      return sortedFoods.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return sortedFoods.sort((a, b) => {
        const aPrice = parseInt(a.priceRange.split('-')[0].replace('₹', ''));
        const bPrice = parseInt(b.priceRange.split('-')[0].replace('₹', ''));
        return aPrice - bPrice;
      });
    case 'spice':
      const spiceOrder = { 'Mild': 1, 'Medium': 2, 'Hot': 3 };
      return sortedFoods.sort((a, b) => spiceOrder[a.spiceLevel] - spiceOrder[b.spiceLevel]);
    default:
      return sortedFoods;
  }
};

export const getRandomFood = (foods: StreetFood[]): StreetFood => {
  return foods[Math.floor(Math.random() * foods.length)];
};

export const buildMealSuggestion = (foods: StreetFood[]) => {
  const appetizers = foods.filter(food => 
    ['Bhel Puri', 'Pani Puri', 'Sev Puri'].includes(food.name)
  );
  const mains = foods.filter(food => 
    ['Pav Bhaji', 'Vada Pav', 'Keema Pav', 'Frankie'].includes(food.name)
  );
  const drinks = foods.filter(food => 
    food.name === 'Cutting Chai'
  );

  const meal = {
    appetizer: appetizers[Math.floor(Math.random() * appetizers.length)],
    main: mains[Math.floor(Math.random() * mains.length)],
    drink: drinks[0] || null
  };

  return meal;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};