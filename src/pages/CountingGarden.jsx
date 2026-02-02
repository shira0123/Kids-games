import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CountingGarden() {
  const items = [
    { emoji: '🌻', name: 'Sunflowers' },
    { emoji: '🌺', name: 'Hibiscus' },
    { emoji: '🌷', name: 'Tulips' },
    { emoji: '🌹', name: 'Roses' },
    { emoji: '🦋', name: 'Butterflies' },
    { emoji: '🐝', name: 'Bees' },
  ];

  const [currentItem, setCurrentItem] = useState(items[0]);
  const [count, setCount] = useState(5);
  const [positions, setPositions] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const item = items[Math.floor(Math.random() * items.length)];
    const newCount = Math.floor(Math.random() * 10) + 1;
    
    const newPositions = Array.from({ length: newCount }, () => ({
      x: Math.random() * 85,
      y: Math.random() * 75,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
    }));
    
    setCurrentItem(item);
    setCount(newCount);
    setPositions(newPositions);
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    if (parseInt(userAnswer) === count) {
      setScore(score + 10);
      setFeedback('🎉 Great Counting!');
      setTimeout(generateQuestion, 2000);
    } else {
      setFeedback('❌ Count again!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-emerald-200 to-teal-300 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-green-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">🌻 Counting Garden</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
              How many {currentItem.name}? 🤔
            </h2>
            
            <div className="relative bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl h-96 border-4 border-green-300 overflow-hidden">
              {positions.map((pos, idx) => (
                <div
                  key={idx}
                  className="absolute text-6xl transition-transform hover:scale-125"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
                    animation: `sway 2s ease-in-out infinite`,
                    animationDelay: `${idx * 0.1}s`,
                  }}
                >
                  {currentItem.emoji}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="text-center mb-6">
                <div className="text-gray-600 text-lg mb-2">Your Score</div>
                <div className="text-5xl font-black text-purple-600">{score}</div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-xl font-bold mb-3 text-center">
                  I counted:
                </label>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                  className="w-full text-5xl font-bold text-center border-4 border-green-400 rounded-2xl p-4 focus:border-green-600 focus:outline-none"
                  placeholder="?"
                  min="0"
                  max="20"
                  autoFocus
                />
              </div>
              
              <button
                onClick={checkAnswer}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg mb-4"
              >
                Check Answer
              </button>
              
              <button
                onClick={generateQuestion}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold py-3 rounded-2xl hover:scale-105 transition-transform shadow-lg"
              >
                New Garden
              </button>
            </div>
            
            {feedback && (
              <div className="mt-4 text-3xl font-bold text-center animate-bounce">
                {feedback}
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-700 mb-3 text-center">Counting Tips:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-4xl mb-2">👆</div>
              <div className="text-gray-600">Point at each one</div>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">🔢</div>
              <div className="text-gray-600">Say the numbers</div>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-gray-600">Double check!</div>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes sway {
            0%, 100% { transform: rotate(${Math.random() * 10 - 5}deg); }
            50% { transform: rotate(${Math.random() * 10 - 5}deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
