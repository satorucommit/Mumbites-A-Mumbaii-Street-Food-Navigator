import React, { useState, useMemo, useCallback } from 'react';
import { Search, Volume2, Copy, Shuffle, Trophy, BookOpen, ArrowLeftRight } from 'lucide-react';
import { bambaiyaSlang } from '@/utils/data';
import { BambaiyaSlang } from '@/types';
import { debounce, speakText, copyToClipboard } from '@/utils/helpers';

const SlangTranslator: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [translationMode, setTranslationMode] = useState<'english-to-bambaiya' | 'bambaiya-to-english'>('english-to-bambaiya');
  const [selectedSlang, setSelectedSlang] = useState<BambaiyaSlang | null>(null);
  const [randomSlang, setRandomSlang] = useState<BambaiyaSlang | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const categories = ['All', 'Greetings', 'Food-related', 'Emotions', 'Situations', 'General'];

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  const filteredSlang = useMemo(() => {
    let filtered = bambaiyaSlang;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(slang => slang.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(slang =>
        slang.term.toLowerCase().includes(query) ||
        slang.translation.toLowerCase().includes(query) ||
        slang.context.toLowerCase().includes(query) ||
        slang.example.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleRandomSlang = () => {
    const randomIndex = Math.floor(Math.random() * bambaiyaSlang.length);
    const random = bambaiyaSlang[randomIndex];
    setRandomSlang(random);
    setSelectedSlang(random);
  };

  const handleSpeak = (text: string) => {
    speakText(text);
  };

  const handleCopy = async (text: string, type: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(null), 2000);
    }
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setQuizScore(0);
    setCurrentQuizIndex(0);
    setQuizAnswered(false);
  };

  const handleQuizAnswer = (selectedAnswer: string) => {
    if (quizAnswered) return;
    
    const currentSlang = bambaiyaSlang[currentQuizIndex];
    const isCorrect = selectedAnswer === currentSlang.translation;
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    
    setQuizAnswered(true);
    
    setTimeout(() => {
      if (currentQuizIndex < bambaiyaSlang.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
        setQuizAnswered(false);
      } else {
        // Quiz completed
        setShowQuiz(false);
        alert(`Quiz completed! Your score: ${quizScore + (isCorrect ? 1 : 0)}/${bambaiyaSlang.length}`);
      }
    }, 1500);
  };

  const getFormalityColor = (level: string) => {
    switch (level) {
      case 'Very Informal': return 'bg-red-100 text-red-800';
      case 'Informal': return 'bg-yellow-100 text-yellow-800';
      case 'Informal/Rude': return 'bg-red-200 text-red-900';
      case 'Informal/Casual': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Greetings': return 'bg-green-100 text-green-800';
      case 'Food-related': return 'bg-orange-100 text-orange-800';
      case 'Emotions': return 'bg-purple-100 text-purple-800';
      case 'Situations': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showQuiz) {
    const currentSlang = bambaiyaSlang[currentQuizIndex];
    const options = [
      currentSlang.translation,
      bambaiyaSlang[(currentQuizIndex + 1) % bambaiyaSlang.length].translation,
      bambaiyaSlang[(currentQuizIndex + 2) % bambaiyaSlang.length].translation,
      bambaiyaSlang[(currentQuizIndex + 3) % bambaiyaSlang.length].translation
    ].sort(() => Math.random() - 0.5);

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mb-6">
              <Trophy className="h-12 w-12 text-mumbai-orange mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Slang Quiz</h2>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Question {currentQuizIndex + 1} of {bambaiyaSlang.length}</span>
                <span>Score: {quizScore}/{currentQuizIndex}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">What does "{currentSlang.term}" mean?</h3>
              <div className="grid grid-cols-1 gap-3">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(option)}
                    disabled={quizAnswered}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      quizAnswered
                        ? option === currentSlang.translation
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-300 bg-gray-50 text-gray-500'
                        : 'border-gray-300 hover:border-mumbai-orange hover:bg-orange-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowQuiz(false)}
              className="btn-secondary"
            >
              Exit Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            💬 Slang Translator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Learn authentic Bambaiya slang with translations, context, and pronunciation. 
            Speak like a true Mumbaikar! <span className="font-hindi">बोलो भिड़ू!</span>
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search slang terms or translations..."
                className="input-field pl-10"
                onChange={(e) => debouncedSearch(e.target.value)}
                aria-label="Search slang terms"
              />
            </div>

            {/* Translation Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setTranslationMode('english-to-bambaiya')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  translationMode === 'english-to-bambaiya'
                    ? 'bg-white shadow-sm text-mumbai-orange'
                    : 'text-gray-600'
                }`}
              >
                English → Bambaiya
              </button>
              <ArrowLeftRight className="h-4 w-4 text-gray-400" />
              <button
                onClick={() => setTranslationMode('bambaiya-to-english')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  translationMode === 'bambaiya-to-english'
                    ? 'bg-white shadow-sm text-mumbai-orange'
                    : 'text-gray-600'
                }`}
              >
                Bambaiya → English
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-mumbai-orange text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRandomSlang}
              className="btn-primary flex items-center space-x-2"
            >
              <Shuffle className="h-4 w-4" />
              <span>Random Slang</span>
            </button>
            <button
              onClick={startQuiz}
              className="btn-secondary flex items-center space-x-2"
            >
              <Trophy className="h-4 w-4" />
              <span>Quiz Mode</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Slang of the Day</span>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Slang List */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Found {filteredSlang.length} slang terms
              </h2>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {filteredSlang.map((slang) => (
                <div
                  key={slang.id}
                  className={`card p-4 cursor-pointer transition-all duration-200 ${
                    selectedSlang?.id === slang.id ? 'ring-2 ring-mumbai-orange' : ''
                  }`}
                  onClick={() => setSelectedSlang(slang)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {translationMode === 'english-to-bambaiya' ? slang.translation : slang.term}
                      </h3>
                      <p className="text-mumbai-orange font-medium">
                        {translationMode === 'english-to-bambaiya' ? slang.term : slang.translation}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`badge ${getCategoryColor(slang.category)}`}>
                        {slang.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{slang.context}</p>
                  <div className="flex items-center justify-between">
                    <span className={`badge ${getFormalityColor(slang.formalityLevel)}`}>
                      {slang.formalityLevel}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(slang.term);
                      }}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      aria-label={`Pronounce ${slang.term}`}
                    >
                      <Volume2 className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:sticky lg:top-8">
            {selectedSlang ? (
              <div className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedSlang.term}
                    </h2>
                    <p className="text-xl text-mumbai-orange font-medium">
                      {selectedSlang.translation}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSpeak(selectedSlang.term)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label={`Pronounce ${selectedSlang.term}`}
                    >
                      <Volume2 className="h-5 w-5 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleCopy(selectedSlang.term, 'term')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label={`Copy ${selectedSlang.term}`}
                    >
                      <Copy className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Context & Usage</h3>
                    <p className="text-gray-600">{selectedSlang.context}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Example</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 italic">"{selectedSlang.example}"</p>
                      <div className="flex items-center justify-between mt-2">
                        <button
                          onClick={() => handleSpeak(selectedSlang.example)}
                          className="text-sm text-mumbai-orange hover:text-orange-600 flex items-center space-x-1"
                        >
                          <Volume2 className="h-4 w-4" />
                          <span>Listen</span>
                        </button>
                        <button
                          onClick={() => handleCopy(selectedSlang.example, 'example')}
                          className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                        >
                          <Copy className="h-4 w-4" />
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Category:</span>
                      <span className={`badge ml-2 ${getCategoryColor(selectedSlang.category)}`}>
                        {selectedSlang.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Formality:</span>
                      <span className={`badge ml-2 ${getFormalityColor(selectedSlang.formalityLevel)}`}>
                        {selectedSlang.formalityLevel}
                      </span>
                    </div>
                  </div>
                </div>

                {copySuccess && (
                  <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm">
                    ✓ {copySuccess === 'term' ? 'Term' : 'Example'} copied to clipboard!
                  </div>
                )}
              </div>
            ) : (
              <div className="card p-6 text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a slang term
                </h3>
                <p className="text-gray-600 mb-4">
                  Click on any slang term from the list to see detailed information, pronunciation, and examples.
                </p>
                <button
                  onClick={handleRandomSlang}
                  className="btn-primary flex items-center space-x-2 mx-auto"
                >
                  <Shuffle className="h-4 w-4" />
                  <span>Show Random Slang</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlangTranslator;