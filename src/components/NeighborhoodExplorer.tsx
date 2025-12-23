import React, { useState, useMemo } from 'react';
import { MapPin, Clock, Users, Train, Star, Filter, Route, ChevronRight, X } from 'lucide-react';
import { neighborhoods } from '@/utils/data';
import { Neighborhood } from '@/types';
import { getCrowdLevelColor } from '@/utils/data';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const NeighborhoodExplorer: React.FC = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedForRoute, setSelectedForRoute] = useState<string[]>([]);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [ratings, setRatings] = useLocalStorage<Record<string, number>>('neighborhood-ratings', {});

  const filterOptions = [
    { id: 'veg-friendly', label: 'Veg Friendly', icon: '🥬' },
    { id: 'budget-friendly', label: 'Budget Friendly', icon: '💰' },
    { id: 'late-night', label: 'Late Night', icon: '🌙' },
    { id: 'family-friendly', label: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
    { id: 'tourist-friendly', label: 'Tourist Friendly', icon: '📸' },
    { id: 'authentic', label: 'Authentic Local', icon: '🏠' }
  ];

  const filteredNeighborhoods = useMemo(() => {
    if (activeFilters.length === 0) return neighborhoods;
    
    return neighborhoods.filter(neighborhood => {
      return activeFilters.every(filter => {
        switch (filter) {
          case 'veg-friendly':
            return neighborhood.tags.includes('Veg') || neighborhood.signatureDishes.some(dish => 
              ['Bhel Puri', 'Pav Bhaji', 'Vada Pav', 'Dabeli'].includes(dish)
            );
          case 'budget-friendly':
            return neighborhood.priceRange.includes('₹30') || neighborhood.priceRange.includes('₹20');
          case 'late-night':
            return neighborhood.tags.includes('Late Night') || neighborhood.bestVisitingTime.includes('late');
          case 'family-friendly':
            return neighborhood.tags.includes('Family Friendly') || neighborhood.atmosphere.includes('family');
          case 'tourist-friendly':
            return neighborhood.crowdLevel === 'High' || neighborhood.crowdLevel === 'Very High';
          case 'authentic':
            return neighborhood.tags.includes('Traditional') || neighborhood.atmosphere.includes('authentic');
          default:
            return true;
        }
      });
    });
  }, [activeFilters]);

  const handleFilterToggle = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const handleRouteSelection = (neighborhoodId: string) => {
    setSelectedForRoute(prev => 
      prev.includes(neighborhoodId)
        ? prev.filter(id => id !== neighborhoodId)
        : [...prev, neighborhoodId]
    );
  };

  const handleRating = (neighborhoodId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [neighborhoodId]: rating }));
  };

  const getAverageRating = (neighborhoodId: string) => {
    return ratings[neighborhoodId] || 0;
  };

  const generateRoute = () => {
    if (selectedForRoute.length < 2) {
      alert('Please select at least 2 neighborhoods for route planning');
      return;
    }
    setShowRouteModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🗺️ Neighborhood Explorer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover Mumbai's best food neighborhoods with signature dishes, famous stalls, and local insights. 
            Plan your perfect food crawl route!
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-secondary flex items-center space-x-2 ${showFilters ? 'bg-mumbai-orange text-white' : ''}`}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {activeFilters.length > 0 && (
                  <span className="bg-white text-mumbai-orange rounded-full px-2 py-0.5 text-xs font-medium">
                    {activeFilters.length}
                  </span>
                )}
              </button>

              <button
                onClick={generateRoute}
                className="btn-primary flex items-center space-x-2"
                disabled={selectedForRoute.length < 2}
              >
                <Route className="h-4 w-4" />
                <span>Plan Route ({selectedForRoute.length})</span>
              </button>
            </div>

            <div className="text-sm text-gray-600">
              {filteredNeighborhoods.length} of {neighborhoods.length} neighborhoods
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Filter by preferences:</h3>
              <div className="flex flex-wrap gap-3">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterToggle(filter.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeFilters.includes(filter.id)
                        ? 'bg-mumbai-orange text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{filter.icon}</span>
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Neighborhood Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredNeighborhoods.map((neighborhood) => (
            <div key={neighborhood.id} className="card overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {neighborhood.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-sm font-medium ${getCrowdLevelColor(neighborhood.crowdLevel)}`}>
                        <Users className="h-4 w-4 inline mr-1" />
                        {neighborhood.crowdLevel}
                      </span>
                      <span className="text-sm text-gray-500">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {neighborhood.bestVisitingTime.split(',')[0]}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <label className="flex items-center space-x-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedForRoute.includes(neighborhood.id)}
                        onChange={() => handleRouteSelection(neighborhood.id)}
                        className="rounded border-gray-300 text-mumbai-orange focus:ring-mumbai-orange"
                      />
                      <span className="text-xs text-gray-500">Route</span>
                    </label>
                    
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(neighborhood.id, star)}
                          className={`h-4 w-4 ${
                            star <= getAverageRating(neighborhood.id)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        >
                          <Star className="h-4 w-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {neighborhood.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Top Dishes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {neighborhood.signatureDishes.slice(0, 3).map((dish) => (
                      <span key={dish} className="badge bg-orange-100 text-orange-800 text-xs">
                        {dish}
                      </span>
                    ))}
                    {neighborhood.signatureDishes.length > 3 && (
                      <span className="badge bg-gray-100 text-gray-600 text-xs">
                        +{neighborhood.signatureDishes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">
                    {neighborhood.priceRange}
                  </span>
                  <button
                    onClick={() => setSelectedNeighborhood(neighborhood)}
                    className="text-mumbai-orange hover:text-orange-600 font-medium text-sm flex items-center space-x-1"
                  >
                    <span>Explore</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredNeighborhoods.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No neighborhoods found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to find more options.
            </p>
            <button
              onClick={() => setActiveFilters([])}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Neighborhood Detail Modal */}
        {selectedNeighborhood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedNeighborhood.name}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className={`font-medium ${getCrowdLevelColor(selectedNeighborhood.crowdLevel)}`}>
                        <Users className="h-4 w-4 inline mr-1" />
                        {selectedNeighborhood.crowdLevel} crowd
                      </span>
                      <span>
                        <Clock className="h-4 w-4 inline mr-1" />
                        {selectedNeighborhood.bestVisitingTime}
                      </span>
                      <span className="text-green-600 font-medium">
                        {selectedNeighborhood.priceRange}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedNeighborhood(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedNeighborhood.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Signature Dishes</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedNeighborhood.signatureDishes.map((dish) => (
                          <span key={dish} className="badge bg-orange-100 text-orange-800">
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Famous Stalls & Restaurants</h3>
                      <ul className="space-y-2">
                        {selectedNeighborhood.famousStalls.map((stall) => (
                          <li key={stall} className="flex items-center space-x-2 text-gray-600">
                            <MapPin className="h-4 w-4 text-mumbai-orange flex-shrink-0" />
                            <span>{stall}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Train className="h-5 w-5 mr-2 text-blue-600" />
                        How to Reach
                      </h3>
                      <p className="text-gray-600 bg-blue-50 p-4 rounded-lg">
                        {selectedNeighborhood.howToReach}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Atmosphere</h3>
                      <p className="text-gray-600">
                        {selectedNeighborhood.atmosphere}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedNeighborhood.tags.map((tag) => (
                          <span key={tag} className="badge bg-purple-100 text-purple-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Rate this neighborhood</h3>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRating(selectedNeighborhood.id, star)}
                            className={`h-6 w-6 ${
                              star <= getAverageRating(selectedNeighborhood.id)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 hover:text-yellow-400'
                            } transition-colors`}
                          >
                            <Star className="h-6 w-6" />
                          </button>
                        ))}
                        <span className="text-sm text-gray-500 ml-2">
                          {getAverageRating(selectedNeighborhood.id) > 0 
                            ? `${getAverageRating(selectedNeighborhood.id)}/5` 
                            : 'Not rated'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-8 pt-6 border-t">
                  <button
                    onClick={() => handleRouteSelection(selectedNeighborhood.id)}
                    className={`btn-secondary flex items-center space-x-2 ${
                      selectedForRoute.includes(selectedNeighborhood.id) ? 'bg-mumbai-orange text-white' : ''
                    }`}
                  >
                    <Route className="h-4 w-4" />
                    <span>
                      {selectedForRoute.includes(selectedNeighborhood.id) 
                        ? 'Remove from Route' 
                        : 'Add to Route'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Route Planning Modal */}
        {showRouteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Your Food Crawl Route</h3>
                <button
                  onClick={() => setShowRouteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {selectedForRoute.map((neighborhoodId, index) => {
                  const neighborhood = neighborhoods.find(n => n.id === neighborhoodId);
                  if (!neighborhood) return null;

                  return (
                    <div key={neighborhoodId} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-mumbai-orange text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{neighborhood.name}</h4>
                        <p className="text-sm text-gray-600">
                          Best dishes: {neighborhood.signatureDishes.slice(0, 2).join(', ')}
                        </p>
                        <p className="text-xs text-gray-500">{neighborhood.howToReach.split(',')[0]}</p>
                      </div>
                      <button
                        onClick={() => handleRouteSelection(neighborhoodId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Route Tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Start early to avoid crowds and get fresh food</li>
                  <li>• Carry cash - most street vendors prefer cash payments</li>
                  <li>• Pace yourself - try small portions at each stop</li>
                  <li>• Stay hydrated and carry hand sanitizer</li>
                </ul>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowRouteModal(false)}
                  className="btn-primary flex-1"
                >
                  Start Food Crawl! 🍽️
                </button>
                <button
                  onClick={() => {
                    setSelectedForRoute([]);
                    setShowRouteModal(false);
                  }}
                  className="btn-secondary"
                >
                  Clear Route
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NeighborhoodExplorer;