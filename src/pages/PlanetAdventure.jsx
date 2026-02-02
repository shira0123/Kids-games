import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PlanetAdventure() {
  const planets = [
    {
      name: 'Mercury',
      emoji: '☿️',
      color: 'from-gray-400 to-gray-600',
      size: '60px',
      facts: [
        '☀️ Closest planet to the Sun',
        '🔥 Very hot during day, very cold at night',
        '⚡ Smallest planet',
        '🏃 Fastest orbit around the Sun',
      ],
      funFact: 'A year on Mercury is only 88 Earth days!',
    },
    {
      name: 'Venus',
      emoji: '♀️',
      color: 'from-yellow-300 to-orange-400',
      size: '90px',
      facts: [
        '🌟 Brightest planet in our sky',
        '☁️ Covered in thick clouds',
        '🔥 Hottest planet',
        '🔄 Spins backwards!',
      ],
      funFact: 'Venus is sometimes called Earth\'s sister planet!',
    },
    {
      name: 'Earth',
      emoji: '🌍',
      color: 'from-blue-400 to-green-400',
      size: '95px',
      facts: [
        '💧 Only planet with liquid water',
        '🌱 Has life!',
        '🌙 Has one moon',
        '🏠 Our home planet',
      ],
      funFact: 'Earth is the only planet not named after a god!',
    },
    {
      name: 'Mars',
      emoji: '♂️',
      color: 'from-red-500 to-orange-600',
      size: '70px',
      facts: [
        '🔴 Called the Red Planet',
        '🏔️ Has the tallest mountain',
        '🌙 Has two small moons',
        '🤖 Explored by rovers',
      ],
      funFact: 'Mars has dust storms that cover the whole planet!',
    },
    {
      name: 'Jupiter',
      emoji: '♃',
      color: 'from-orange-300 to-amber-500',
      size: '150px',
      facts: [
        '⭐ Biggest planet',
        '🌪️ Giant storm (Great Red Spot)',
        '🌙 Has over 75 moons!',
        '💨 Made mostly of gas',
      ],
      funFact: 'Jupiter is so big, all other planets could fit inside it!',
    },
    {
      name: 'Saturn',
      emoji: '♄',
      color: 'from-yellow-200 to-amber-400',
      size: '140px',
      facts: [
        '💍 Beautiful rings made of ice',
        '🌙 Has over 80 moons',
        '💨 Made of gas',
        '🎨 Light and fluffy',
      ],
      funFact: 'Saturn could float in water if there was a bathtub big enough!',
    },
    {
      name: 'Uranus',
      emoji: '♅',
      color: 'from-cyan-300 to-blue-400',
      size: '110px',
      facts: [
        '❄️ Very cold (-320°F)',
        '💎 Rains diamonds!',
        '🔄 Spins on its side',
        '💍 Has thin rings',
      ],
      funFact: 'Uranus rolls around the Sun like a ball!',
    },
    {
      name: 'Neptune',
      emoji: '♆',
      color: 'from-blue-500 to-indigo-600',
      size: '105px',
      facts: [
        '💨 Strongest winds in solar system',
        '🔵 Beautiful blue color',
        '❄️ Very cold',
        '🌙 Has 14 moons',
      ],
      funFact: 'Neptune takes 165 Earth years to orbit the Sun!',
    },
  ];

  const [selectedPlanet, setSelectedPlanet] = useState(planets[2]); // Start with Earth
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${selectedPlanet.color} p-8 transition-all duration-500`}>
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-purple-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-4 text-center drop-shadow-lg">🪐 Planet Adventure</h1>
        <p className="text-2xl text-white text-center mb-8 drop-shadow">Explore our Solar System!</p>
        
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 mb-8">
          <div className="flex justify-between items-center overflow-x-auto gap-4 pb-2">
            {planets.map((planet, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPlanet(planet)}
                className={`flex-shrink-0 bg-white rounded-2xl p-4 shadow-lg hover:scale-110 transition-all ${
                  selectedPlanet.name === planet.name ? 'ring-4 ring-yellow-400 scale-110' : ''
                }`}
                style={{ minWidth: '100px' }}
              >
                <div className="text-center">
                  <div 
                    className="text-5xl mb-2 mx-auto"
                    style={{ 
                      width: planet.size, 
                      height: planet.size,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {planet.emoji}
                  </div>
                  <div className="text-sm font-bold text-gray-700">{planet.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div 
                className="mx-auto mb-6 flex items-center justify-center animate-pulse"
                style={{ 
                  width: selectedPlanet.size,
                  height: selectedPlanet.size,
                  fontSize: selectedPlanet.size,
                }}
              >
                {selectedPlanet.emoji}
              </div>
              <h2 className="text-5xl font-black text-gray-800 mb-4">{selectedPlanet.name}</h2>
            </div>
            
            <div className="space-y-3">
              {selectedPlanet.facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 text-lg font-semibold text-gray-700"
                >
                  {fact}
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="flex items-start">
                <div className="text-6xl mr-4">💡</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">Fun Fact!</h3>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {selectedPlanet.funFact}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold text-gray-700 mb-4 text-center">
                🌟 Solar System Facts
              </h3>
              <div className="space-y-3">
                <div className="flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4">
                  <span className="text-3xl mr-3">☀️</span>
                  <span className="text-gray-700 font-semibold">The Sun is a star at the center</span>
                </div>
                <div className="flex items-center bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-4">
                  <span className="text-3xl mr-3">🪐</span>
                  <span className="text-gray-700 font-semibold">8 planets orbit the Sun</span>
                </div>
                <div className="flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4">
                  <span className="text-3xl mr-3">🌙</span>
                  <span className="text-gray-700 font-semibold">Many planets have moons</span>
                </div>
                <div className="flex items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4">
                  <span className="text-3xl mr-3">⭐</span>
                  <span className="text-gray-700 font-semibold">It's 4.6 billion years old!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-700 mb-6 text-center">Planet Order from the Sun:</h3>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div className="text-6xl">☀️</div>
            {planets.map((planet, idx) => (
              <div key={idx} className="flex items-center">
                <div className="text-center">
                  <div className="text-4xl mb-1">{planet.emoji}</div>
                  <div className="text-sm font-bold text-gray-600">{planet.name}</div>
                </div>
                {idx < planets.length - 1 && <div className="text-2xl mx-2">→</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
