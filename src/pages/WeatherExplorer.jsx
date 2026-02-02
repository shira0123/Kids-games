import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function WeatherExplorer() {
  const weatherTypes = [
    { 
      name: 'Sunny', 
      emoji: '☀️', 
      color: 'from-yellow-300 to-orange-400',
      description: 'Bright and warm! Great for playing outside.',
      clothes: ['👕 T-shirt', '🩳 Shorts', '🕶️ Sunglasses', '🧢 Hat'],
      activities: ['Swimming', 'Picnic', 'Park', 'Beach'],
    },
    { 
      name: 'Rainy', 
      emoji: '🌧️', 
      color: 'from-blue-400 to-gray-500',
      description: 'Water falling from clouds. Perfect for puddle jumping!',
      clothes: ['☂️ Umbrella', '🥾 Rain boots', '🧥 Raincoat'],
      activities: ['Reading', 'Indoor games', 'Art projects'],
    },
    { 
      name: 'Snowy', 
      emoji: '❄️', 
      color: 'from-blue-100 to-white',
      description: 'Cold and white! Time to build a snowman.',
      clothes: ['🧤 Gloves', '🧣 Scarf', '🧥 Winter coat', '👢 Boots'],
      activities: ['Sledding', 'Snowman', 'Snow angels'],
    },
    { 
      name: 'Cloudy', 
      emoji: '☁️', 
      color: 'from-gray-300 to-gray-400',
      description: 'Sky covered with clouds. Not too hot, not too cold.',
      clothes: ['👕 Long sleeves', '👖 Pants', '🧥 Light jacket'],
      activities: ['Walking', 'Biking', 'Sports'],
    },
    { 
      name: 'Windy', 
      emoji: '💨', 
      color: 'from-cyan-300 to-blue-400',
      description: 'Air moving fast! Great for flying kites.',
      clothes: ['🧥 Jacket', '🧢 Secure hat'],
      activities: ['Kite flying', 'Windmill watching'],
    },
    { 
      name: 'Stormy', 
      emoji: '⛈️', 
      color: 'from-purple-500 to-gray-700',
      description: 'Thunder and lightning! Stay safe indoors.',
      clothes: ['🏠 Stay inside!'],
      activities: ['Board games', 'Movies', 'Crafts'],
    },
  ];

  const [currentWeather, setCurrentWeather] = useState(weatherTypes[0]);
  const [score, setScore] = useState(0);

  const selectWeather = (weather) => {
    setCurrentWeather(weather);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentWeather.color} p-8 transition-all duration-500`}>
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-blue-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">⛅ Weather Explorer</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {weatherTypes.map((weather, idx) => (
            <button
              key={idx}
              onClick={() => selectWeather(weather)}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:scale-105 transition-all ${
                currentWeather.name === weather.name ? 'ring-4 ring-blue-500 scale-105' : ''
              }`}
            >
              <div className="text-6xl mb-2">{weather.emoji}</div>
              <div className="text-lg font-bold text-gray-700">{weather.name}</div>
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-9xl mb-4 animate-bounce">{currentWeather.emoji}</div>
              <h2 className="text-5xl font-black text-gray-800 mb-4">{currentWeather.name}</h2>
              <p className="text-2xl text-gray-600">{currentWeather.description}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold text-gray-700 mb-4 flex items-center">
                👔 What to Wear
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {currentWeather.clothes.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-4 text-center font-semibold text-gray-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold text-gray-700 mb-4 flex items-center">
                🎯 Activities
              </h3>
              <div className="space-y-3">
                {currentWeather.activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 text-lg font-semibold text-gray-700 flex items-center"
                  >
                    <span className="text-3xl mr-3">✓</span>
                    {activity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-700 mb-6 text-center">Weather Safety Tips:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-5xl mb-3">☀️</div>
              <div className="font-bold text-gray-700 mb-2">Sunny Days</div>
              <div className="text-gray-600">Wear sunscreen and drink lots of water!</div>
            </div>
            <div className="text-center p-4">
              <div className="text-5xl mb-3">⛈️</div>
              <div className="font-bold text-gray-700 mb-2">Storms</div>
              <div className="text-gray-600">Stay indoors and away from windows</div>
            </div>
            <div className="text-center p-4">
              <div className="text-5xl mb-3">❄️</div>
              <div className="font-bold text-gray-700 mb-2">Snow</div>
              <div className="text-gray-600">Dress warm and be careful on ice</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
