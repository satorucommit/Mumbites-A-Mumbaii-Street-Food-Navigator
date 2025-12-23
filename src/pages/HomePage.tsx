import React, { useEffect, useState } from 'react';
import { Search, MessageCircle, MapPin, TrendingUp, Users, Star, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'food-finder' | 'slang-translator' | 'neighborhood-explorer') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState({ foods: 0, slang: 0, neighborhoods: 0 });

  useEffect(() => {
    // Animate counters
    const animateCounter = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 30);
    };

    setTimeout(() => {
      animateCounter(20, (value) => setStats(prev => ({ ...prev, foods: value })));
      animateCounter(50, (value) => setStats(prev => ({ ...prev, slang: value })));
      animateCounter(15, (value) => setStats(prev => ({ ...prev, neighborhoods: value })));
    }, 500);
  }, []);

  const features = [
    {
      id: 'food-finder',
      title: 'Food Finder',
      description: 'Discover authentic Mumbai street foods with advanced filtering by type, spice level, location, and price range.',
      icon: Search,
      emoji: '🍛',
      color: 'from-orange-500 to-red-500',
      highlights: ['20+ Street Foods', 'Smart Filters', 'Price Comparison', 'Cultural Context']
    },
    {
      id: 'slang-translator',
      title: 'Slang Translator',
      description: 'Learn Bambaiya slang with translations, context, and pronunciation to speak like a true Mumbaikar.',
      icon: MessageCircle,
      emoji: '💬',
      color: 'from-blue-500 to-purple-500',
      highlights: ['50+ Slang Terms', 'Audio Pronunciation', 'Usage Examples', 'Quiz Mode']
    },
    {
      id: 'neighborhood-explorer',
      title: 'Neighborhood Explorer',
      description: 'Explore Mumbai\'s food neighborhoods with signature dishes, famous stalls, and local insights.',
      icon: MapPin,
      emoji: '🗺️',
      color: 'from-green-500 to-teal-500',
      highlights: ['15+ Neighborhoods', 'Interactive Map', 'Route Planning', 'Local Tips']
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Bandra',
      text: 'This app helped me discover amazing street food spots I never knew existed! The slang translator is bindaas!',
      rating: 5
    },
    {
      name: 'Rahul Mehta',
      location: 'Andheri',
      text: 'Perfect for tourists and locals alike. The neighborhood guide saved me so much time finding authentic food.',
      rating: 5
    },
    {
      name: 'Sneha Patel',
      location: 'Dadar',
      text: 'Love how it explains the cultural significance of each dish. Makes eating street food more meaningful!',
      rating: 5
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Ultimate Guide to
              <br />
              <span className="text-yellow-300">Mumbai's Street Food Culture</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
              Discover authentic flavors, learn Bambaiya slang, and explore the best neighborhoods for food lovers. 
              <span className="font-hindi"> खाओ, पियो, मस्त रहो!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onNavigate('food-finder')}
                className="btn-primary bg-white text-mumbai-orange hover:bg-gray-100 text-lg px-8 py-3 flex items-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Start Exploring Foods</span>
              </button>
              <button
                onClick={() => onNavigate('slang-translator')}
                className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-mumbai-orange text-lg px-8 py-3 flex items-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Learn Bambaiya Slang</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-mumbai-orange mb-2">{stats.foods}+</div>
              <div className="text-gray-600 font-medium">Street Foods</div>
              <div className="text-sm text-gray-500">Authentic Mumbai dishes</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-mumbai-orange mb-2">{stats.slang}+</div>
              <div className="text-gray-600 font-medium">Slang Terms</div>
              <div className="text-sm text-gray-500">Bambaiya expressions</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-mumbai-orange mb-2">{stats.neighborhoods}+</div>
              <div className="text-gray-600 font-medium">Neighborhoods</div>
              <div className="text-sm text-gray-500">Food destinations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Explore Mumbai's Food Culture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From authentic street foods to local slang, discover everything you need to experience Mumbai like a true local.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="card p-8 hover:scale-105 transition-transform duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <span className="text-2xl">{feature.emoji}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {feature.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center space-x-2 text-sm text-gray-500">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onNavigate(feature.id as any)}
                  className="w-full btn-primary flex items-center justify-center space-x-2 group"
                >
                  <span>Explore {feature.title}</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">What Food Lovers Say</h2>
            <p className="text-xl text-gray-600">
              Join thousands of Mumbai food enthusiasts who trust our guide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="card p-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-mumbai-orange to-mumbai-yellow rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Explore Mumbai's Street Food Scene?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Start your culinary journey today and discover the authentic flavors that make Mumbai special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('food-finder')}
              className="btn-primary bg-white text-mumbai-orange hover:bg-gray-100 text-lg px-8 py-3 flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Find Street Foods</span>
            </button>
            <button
              onClick={() => onNavigate('neighborhood-explorer')}
              className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-mumbai-orange text-lg px-8 py-3 flex items-center justify-center space-x-2"
            >
              <MapPin className="h-5 w-5" />
              <span>Explore Neighborhoods</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;