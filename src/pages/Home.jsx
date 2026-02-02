import { Link } from 'react-router-dom';

function HomePage() {
  const games = [
    { path: '/color-match', name: 'Color Match', icon: '🎨', desc: 'Learn colors by matching!' },
    { path: '/shape-builder', name: 'Shape Builder', icon: '🔷', desc: 'Build with shapes' },
    { path: '/number-bubbles', name: 'Number Bubbles', icon: '🫧', desc: 'Pop bubbles and count' },
    { path: '/letter-hunt', name: 'Letter Hunt', icon: '🔤', desc: 'Find the letters' },
    { path: '/memory-cards', name: 'Memory Cards', icon: '🃏', desc: 'Match the cards' },
    { path: '/animal-sounds', name: 'Animal Sounds', icon: '🦁', desc: 'Learn animal sounds' },
    { path: '/math-rocket', name: 'Math Rocket', icon: '🚀', desc: 'Solve and fly!' },
    { path: '/word-scramble', name: 'Word Scramble', icon: '📝', desc: 'Unscramble words' },
    { path: '/pattern-maker', name: 'Pattern Maker', icon: '🎭', desc: 'Complete patterns' },
    { path: '/counting-garden', name: 'Counting Garden', icon: '🌻', desc: 'Count the flowers' },
    { path: '/rhyme-time', name: 'Rhyme Time', icon: '🎵', desc: 'Find rhyming words' },
    { path: '/size-sort', name: 'Size Sort', icon: '📏', desc: 'Sort by size' },
    { path: '/clock-learning', name: 'Clock Learning', icon: '🕐', desc: 'Tell the time' },
    { path: '/spelling-bee', name: 'Spelling Bee', icon: '🐝', desc: 'Spell it right!' },
    { path: '/fraction-pizza', name: 'Fraction Pizza', icon: '🍕', desc: 'Learn fractions' },
    { path: '/maze-runner', name: 'Maze Runner', icon: '🏃', desc: 'Navigate the maze' },
    { path: '/sequence-quest', name: 'Sequence Quest', icon: '🔢', desc: 'Find the sequence' },
    { path: '/weather-explorer', name: 'Weather Explorer', icon: '⛅', desc: 'Learn about weather' },
    { path: '/money-math', name: 'Money Math', icon: '💰', desc: 'Count coins' },
    { path: '/planet-adventure', name: 'Planet Adventure', icon: '🪐', desc: 'Explore planets' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 bg-white/90 px-8 py-6 rounded-3xl shadow-2xl border border-gray-200 mb-8 backdrop-blur-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-4xl">🎮</span>
            </div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Kids Learning
              </h1>
              <p className="text-2xl lg:text-3xl font-light text-gray-700 mt-2">
                Fun Games Hub
              </p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover amazing learning adventures! Play, learn, and grow with our collection of interactive educational games.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {games.map((game, idx) => (
            <Link 
              key={idx}
              to={game.path}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-2 border-gray-100 hover:border-blue-200 hover:-translate-y-2 transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-indigo-500/25 group-hover:scale-110 transition-all duration-300">
                  <span className="text-5xl drop-shadow-lg">{game.icon}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  {game.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors">
                  {game.desc}
                </p>
              </div>
              
              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 -translate-y-px"></div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-24 pt-16 border-t border-gray-200">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h2>
            <p className="text-lg text-gray-600">
              Every game is designed by educators to make learning fun and effective!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
