import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { FilterOptions } from '@/types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, onClose }) => {
  const locations = [
    'Mohammed Ali Road', 'Chowpatty Beach', 'Bandra', 'Colaba', 'Dadar',
    'Matunga', 'Fort', 'CST', 'Juhu', 'Andheri', 'Kurla', 'Ghatkopar',
    'Malad', 'Borivali', 'Marine Drive'
  ];

  const handleTypeChange = (type: 'Veg' | 'Non-Veg') => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    onFiltersChange({ ...filters, type: newTypes });
  };

  const handleSpiceLevelChange = (level: 'Mild' | 'Medium' | 'Hot') => {
    const newLevels = filters.spiceLevel.includes(level)
      ? filters.spiceLevel.filter(l => l !== level)
      : [...filters.spiceLevel, level];
    onFiltersChange({ ...filters, spiceLevel: newLevels });
  };

  const handleLocationChange = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location];
    onFiltersChange({ ...filters, locations: newLocations });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFiltersChange({ ...filters, priceRange: [min, max] });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      type: [],
      spiceLevel: [],
      priceRange: [10, 500],
      locations: [],
      searchQuery: filters.searchQuery // Keep search query
    });
  };

  const hasActiveFilters = filters.type.length > 0 || 
                          filters.spiceLevel.length > 0 || 
                          filters.locations.length > 0 ||
                          filters.priceRange[0] !== 10 || 
                          filters.priceRange[1] !== 500;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filter Options</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="btn-secondary text-sm flex items-center space-x-1"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Food Type Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Food Type</h4>
          <div className="space-y-2">
            {['Veg', 'Non-Veg'].map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type as 'Veg' | 'Non-Veg')}
                  onChange={() => handleTypeChange(type as 'Veg' | 'Non-Veg')}
                  className="rounded border-gray-300 text-mumbai-orange focus:ring-mumbai-orange"
                />
                <span className="text-sm text-gray-700">{type}</span>
                <span className={`w-2 h-2 rounded-full ${
                  type === 'Veg' ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
              </label>
            ))}
          </div>
        </div>

        {/* Spice Level Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Spice Level</h4>
          <div className="space-y-2">
            {[
              { level: 'Mild', emoji: '🟢' },
              { level: 'Medium', emoji: '🟡' },
              { level: 'Hot', emoji: '🔴' }
            ].map(({ level, emoji }) => (
              <label key={level} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.spiceLevel.includes(level as 'Mild' | 'Medium' | 'Hot')}
                  onChange={() => handleSpiceLevelChange(level as 'Mild' | 'Medium' | 'Hot')}
                  className="rounded border-gray-300 text-mumbai-orange focus:ring-mumbai-orange"
                />
                <span className="text-sm text-gray-700">{level}</span>
                <span>{emoji}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>₹{filters.priceRange[0]}</span>
              <span>-</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
            <div className="space-y-2">
              <label className="block">
                <span className="text-xs text-gray-500">Min Price</span>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(parseInt(e.target.value), filters.priceRange[1])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </label>
              <label className="block">
                <span className="text-xs text-gray-500">Max Price</span>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Locations</h4>
          <div className="max-h-48 overflow-y-auto space-y-2 scrollbar-hide">
            {locations.map((location) => (
              <label key={location} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.locations.includes(location)}
                  onChange={() => handleLocationChange(location)}
                  className="rounded border-gray-300 text-mumbai-orange focus:ring-mumbai-orange"
                />
                <span className="text-sm text-gray-700">{location}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.type.map((type) => (
              <span key={type} className="badge bg-blue-100 text-blue-800 flex items-center space-x-1">
                <span>{type}</span>
                <button
                  onClick={() => handleTypeChange(type)}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  aria-label={`Remove ${type} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {filters.spiceLevel.map((level) => (
              <span key={level} className="badge bg-orange-100 text-orange-800 flex items-center space-x-1">
                <span>{level}</span>
                <button
                  onClick={() => handleSpiceLevelChange(level)}
                  className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                  aria-label={`Remove ${level} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {filters.locations.map((location) => (
              <span key={location} className="badge bg-green-100 text-green-800 flex items-center space-x-1">
                <span>{location}</span>
                <button
                  onClick={() => handleLocationChange(location)}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                  aria-label={`Remove ${location} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {(filters.priceRange[0] !== 10 || filters.priceRange[1] !== 500) && (
              <span className="badge bg-purple-100 text-purple-800 flex items-center space-x-1">
                <span>₹{filters.priceRange[0]}-₹{filters.priceRange[1]}</span>
                <button
                  onClick={() => handlePriceRangeChange(10, 500)}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                  aria-label="Remove price range filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;