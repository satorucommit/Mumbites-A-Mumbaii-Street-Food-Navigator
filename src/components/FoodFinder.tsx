import React, { useState, useMemo, useCallback } from 'react';
import { Search, Filter, Grid, List, Shuffle, Heart, Share2, MapPin, Clock, Flame } from 'lucide-react';
import { streetFoods } from '@/utils/data';
import { FilterOptions, StreetFood, ViewMode, SortOption } from '@/types';
import { filterFoods, sortFoods, getRandomFood, buildMealSuggestion, debounce } from '@/utils/helpers';
import { getSpiceLevelColor, getTypeColor } from '@/utils/data';
import { useFavorites } from '@/hooks/useFavorites';
import FoodCard from './FoodCard';
import FilterPanel from './FilterPanel';

const FoodFinder: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    type: [],
    spiceLevel: [],
    priceRange: [10, 500],
    locations: [],
    searchQuery: ''
  });
  
  const [viewMode, setViewMode] = useState<ViewMode['mode']>('grid');
  const [sortBy, setSortBy] = useState<string>('name');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFood, setSelectedFood] = useState<StreetFood | null>(null);
  const [randomFood, setRandomFood] = useState<StreetFood | null>(null);
  const [mealSuggestion, setMealSuggestion] = useState<any>(null);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const sortOptions: SortOption[] = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price', label: 'Price (Low to High)' },
    { value: 'spice', label: 'Spice Level' },
    { value: 'popularity', label: 'Popularity' }
  ];

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setFilters(prev => ({ ...prev, searchQuery: query }));
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const filteredAndSortedFoods = useMemo(() => {
    const filtered = filterFoods(streetFoods, filters);
    return sortFoods(filtered, sortBy);
  }, [filters, sortBy]);

  const handleSurpriseMe = () => {
    const randomSelection = getRandomFood(streetFoods);
    setRandomFood(randomSelection);
    setSelectedFood(randomSelection);
  };

  const handleBuildMeal = () => {
    const meal = buildMealSuggestion(streetFoods);
    setMealSuggestion(meal);
  };

  const handleShare = async (food: StreetFood) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${food.name} - Mumbai Street Food`,
          text: `Check out this amazing Mumbai street food: ${food.name}. ${food.description}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      const shareText = `${food.name}: ${food.description} - Find it at: ${food.bestAreas.join(', ')}`;
      navigator.clipboard.writeText(shareText);
      alert('Food details copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🍛 Food Finder
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover authentic Mumbai street foods with advanced filtering. Find your perfect meal by type, spice level, location, and price range.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search foods, areas, or descriptions..."
                className="input-field pl-10"
                onChange={handleSearchChange}
                aria-label="Search street foods"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-secondary flex items-center space-x-2 ${showFilters ? 'bg-mumbai-orange text-white' : ''}`}
                aria-label="Toggle filters"
                aria-expanded={showFilters}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-auto"
                aria-label="Sort foods"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleSurpriseMe}
              className="btn-primary flex items-center space-x-2"
            >
              <Shuffle className="h-4 w-4" />
              <span>Surprise Me!</span>
            </button>
            <button
              onClick={handleBuildMeal}
              className="btn-secondary flex items-center space-x-2"
            >
              <span>🍽️</span>
              <span>Build a Meal</span>
            </button>
            {favorites.length > 0 && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                className="btn-secondary flex items-center space-x-2"
              >
                <Heart className="h-4 w-4 text-red-500" />
                <span>My Favorites ({favorites.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Meal Suggestion Modal */}
        {mealSuggestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">🍽️ Your Perfect Meal</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-600">Appetizer:</span>
                  <div className="text-lg">{mealSuggestion.appetizer?.emoji} {mealSuggestion.appetizer?.name}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Main Course:</span>
                  <div className="text-lg">{mealSuggestion.main?.emoji} {mealSuggestion.main?.name}</div>
                </div>
                {mealSuggestion.drink && (
                  <div>
                    <span className="font-medium text-gray-600">Drink:</span>
                    <div className="text-lg">☕ {mealSuggestion.drink.name}</div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setMealSuggestion(null)}
                className="btn-primary w-full mt-4"
              >
                Got it!
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-mumbai-orange">{filteredAndSortedFoods.length}</span> street foods
            {filters.searchQuery && (
              <span> matching "<span className="font-medium">{filters.searchQuery}</span>"</span>
            )}
          </p>
        </div>

        {/* Food Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredAndSortedFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              viewMode={viewMode}
              isFavorite={isFavorite(food.id)}
              onToggleFavorite={() => toggleFavorite(food.id)}
              onShare={() => handleShare(food)}
              onClick={() => setSelectedFood(food)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedFoods.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No foods found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms to find more options.
            </p>
            <button
              onClick={() => setFilters({
                type: [],
                spiceLevel: [],
                priceRange: [10, 500],
                locations: [],
                searchQuery: ''
              })}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Food Detail Modal */}
        {selectedFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{selectedFood.emoji}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedFood.name}</h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`badge ${getTypeColor(selectedFood.type)}`}>
                          {selectedFood.type}
                        </span>
                        <span className={`badge ${getSpiceLevelColor(selectedFood.spiceLevel)}`}>
                          <Flame className="h-3 w-3 mr-1" />
                          {selectedFood.spiceLevel}
                        </span>
                        <span className="badge bg-green-100 text-green-800">
                          {selectedFood.priceRange}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFood(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedFood.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Best Areas to Find
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFood.bestAreas.map((area) => (
                        <span key={area} className="badge bg-blue-100 text-blue-800">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Best Time to Eat
                    </h3>
                    <p className="text-gray-600">{selectedFood.bestTime}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Popular Variations</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFood.popularVariations.map((variation) => (
                        <span key={variation} className="badge bg-purple-100 text-purple-800">
                          {variation}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cultural Significance</h3>
                    <p className="text-gray-600">{selectedFood.culturalSignificance}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Eating Tips</h3>
                    <p className="text-gray-600">{selectedFood.eatingTips}</p>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6 pt-6 border-t">
                  <button
                    onClick={() => toggleFavorite(selectedFood.id)}
                    className={`btn-secondary flex items-center space-x-2 ${
                      isFavorite(selectedFood.id) ? 'text-red-600' : ''
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(selectedFood.id) ? 'fill-current' : ''}`} />
                    <span>{isFavorite(selectedFood.id) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                  </button>
                  <button
                    onClick={() => handleShare(selectedFood)}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodFinder;