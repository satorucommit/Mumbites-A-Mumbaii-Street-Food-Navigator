import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import HomePage from './pages/HomePage';
import FoodFinder from './components/FoodFinder';
import SlangTranslator from './components/SlangTranslator';
import NeighborhoodExplorer from './components/NeighborhoodExplorer';

type Page = 'home' | 'food-finder' | 'slang-translator' | 'neighborhood-explorer';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'home', label: 'Home', emoji: '🏠' },
    { id: 'food-finder', label: 'Food Finder', emoji: '🍛' },
    { id: 'slang-translator', label: 'Slang Translator', emoji: '💬' },
    { id: 'neighborhood-explorer', label: 'Neighborhoods', emoji: '🗺️' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'food-finder':
        return <FoodFinder />;
      case 'slang-translator':
        return <SlangTranslator />;
      case 'neighborhood-explorer':
        return <NeighborhoodExplorer />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-xl font-bold text-gradient hover:opacity-80 transition-opacity"
              aria-label="Mumbai Street Food Navigator Home"
            >
              <span className="text-2xl">🍛</span>
              <span className="hidden sm:inline">Mumbai Street Food Navigator</span>
              <span className="sm:hidden">MSFN</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8" role="navigation">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as Page)}
                  className={`nav-link flex items-center space-x-1 ${
                    currentPage === item.id ? 'text-mumbai-orange' : ''
                  }`}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2" role="navigation">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id as Page);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`nav-link flex items-center space-x-2 p-2 rounded-lg text-left ${
                      currentPage === item.id ? 'text-mumbai-orange bg-orange-50' : 'hover:bg-gray-50'
                    }`}
                    aria-current={currentPage === item.id ? 'page' : undefined}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-2xl">🍛</span>
              <span className="text-xl font-bold">Mumbai Street Food Navigator</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate guide to Mumbai's authentic street food culture
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>Made with ❤️ for Mumbai food lovers</span>
              <span>•</span>
              <span>Bindaas khao, mast jiyo! 🎉</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;