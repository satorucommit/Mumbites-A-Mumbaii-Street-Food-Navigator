import React from 'react';
import { Heart, Share2, MapPin, Flame, Clock } from 'lucide-react';
import { StreetFood } from '@/types';
import { getSpiceLevelColor, getTypeColor } from '@/utils/data';

interface FoodCardProps {
  food: StreetFood;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
  onClick: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({
  food,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onShare,
  onClick
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare();
  };

  if (viewMode === 'list') {
    return (
      <div
        className="card p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        aria-label={`View details for ${food.name}`}
      >
        <div className="flex items-start space-x-4">
          <div className="text-4xl flex-shrink-0">{food.emoji}</div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{food.name}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`badge ${getTypeColor(food.type)}`}>
                    {food.type}
                  </span>
                  <span className={`badge ${getSpiceLevelColor(food.spiceLevel)}`}>
                    <Flame className="h-3 w-3 mr-1" />
                    {food.spiceLevel}
                  </span>
                  <span className="badge bg-green-100 text-green-800">
                    {food.priceRange}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={handleFavoriteClick}
                  className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                    isFavorite ? 'text-red-500' : 'text-gray-400'
                  }`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShareClick}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                  aria-label="Share this food"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-3 line-clamp-2">{food.description}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{food.bestAreas.slice(0, 2).join(', ')}</span>
                  {food.bestAreas.length > 2 && <span>+{food.bestAreas.length - 2} more</span>}
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{food.bestTime.split(',')[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View details for ${food.name}`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{food.emoji}</div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                isFavorite ? 'text-red-500' : 'text-gray-400'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShareClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              aria-label="Share this food"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{food.name}</h3>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className={`badge ${getTypeColor(food.type)}`}>
            {food.type}
          </span>
          <span className={`badge ${getSpiceLevelColor(food.spiceLevel)}`}>
            <Flame className="h-3 w-3 mr-1" />
            {food.spiceLevel}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{food.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">
              {food.bestAreas.slice(0, 2).join(', ')}
              {food.bestAreas.length > 2 && ` +${food.bestAreas.length - 2} more`}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{food.bestTime.split(',')[0]}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-mumbai-orange">{food.priceRange}</span>
          <button className="text-sm text-mumbai-orange hover:text-orange-600 font-medium">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;