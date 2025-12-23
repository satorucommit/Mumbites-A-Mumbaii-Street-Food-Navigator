# Mumbai Street Food Navigator 🍛

Your ultimate guide to Mumbai's authentic street food culture! Discover amazing foods, learn Bambaiya slang, and explore the best neighborhoods for food lovers.

## Features

### 🍛 Food Finder
- **20+ Authentic Street Foods** with detailed descriptions and cultural context
- **Advanced Filtering** by type (Veg/Non-Veg), spice level, location, and price range
- **Smart Search** across food names, descriptions, and locations
- **Favorites System** to save your preferred foods
- **Surprise Me** feature for random food discovery
- **Build a Meal** suggestions for complete dining experiences
- **Grid/List View** toggle for different browsing experiences

### 💬 Slang Translator
- **50+ Bambaiya Slang Terms** with authentic translations and context
- **Audio Pronunciation** using text-to-speech technology
- **Usage Examples** with real-world context
- **Category Filtering** (Greetings, Food-related, Emotions, etc.)
- **Quiz Mode** to test your slang knowledge
- **Bidirectional Translation** (English ↔ Bambaiya)
- **Copy to Clipboard** functionality

### 🗺️ Neighborhood Explorer
- **15+ Mumbai Neighborhoods** with detailed food profiles
- **Signature Dishes** and famous stalls for each area
- **Interactive Filtering** by preferences (Veg-friendly, Budget-friendly, etc.)
- **Route Planning** for food crawl adventures
- **User Ratings** system with local storage
- **Transportation Info** with train stations and bus routes
- **Cultural Insights** and local tips

## Technology Stack

- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for responsive, utility-first styling
- **Lucide React** for consistent iconography
- **Custom Hooks** for state management and local storage
- **Responsive Design** optimized for mobile and desktop

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mumbai-street-food-navigator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── components/          # React components
│   ├── FoodFinder.tsx
│   ├── FoodCard.tsx
│   ├── FilterPanel.tsx
│   ├── SlangTranslator.tsx
│   └── NeighborhoodExplorer.tsx
├── pages/              # Page components
│   └── HomePage.tsx
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts
│   └── useFavorites.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions and data
│   ├── data.ts
│   └── helpers.ts
└── assets/             # Static assets
```

## Data Sources

All cultural data is sourced from the comprehensive `product.md` file, which contains:
- Detailed information about 20+ Mumbai street foods
- 50+ Bambaiya slang terms with translations and examples
- 15+ neighborhood profiles with specialties and cultural insights
- Cultural tips for authentic Mumbai street food experiences

## Features in Detail

### Accessibility
- Semantic HTML elements throughout
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast color schemes

### Performance
- Optimized bundle size with Vite
- Lazy loading for better performance
- Debounced search functionality
- Efficient state management
- Local storage for user preferences

### Mobile Experience
- Fully responsive design
- Touch-friendly interface
- Mobile-optimized navigation
- Swipe gestures support
- Progressive Web App ready

## Cultural Authenticity

This application maintains authentic Mumbai cultural context through:
- Accurate food descriptions and cultural significance
- Proper Bambaiya slang usage and context
- Real neighborhood insights and local tips
- Authentic pricing and location information
- Cultural eating tips and customs

## Contributing

We welcome contributions to improve the Mumbai Street Food Navigator! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Mumbai street food vendors and their incredible culinary traditions
- The vibrant Bambaiya culture and language
- Local food enthusiasts who preserve these traditions
- The diverse neighborhoods that make Mumbai's food scene unique

---

**Bindaas khao, mast jiyo!** 🎉 (Eat freely, live happily!)

Made with ❤️ for Mumbai food lovers everywhere.