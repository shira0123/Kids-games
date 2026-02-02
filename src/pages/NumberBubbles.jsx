import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NumberBubbles() {
  const [targetNumber, setTargetNumber] = useState(5);
  const [bubbles, setBubbles] = useState([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    generateBubbles();
  }, [targetNumber]);

  useEffect(() => {
    if (poppedCount === targetNumber && poppedCount > 0) {
      setGameWon(true);
      setTimeout(() => {
        nextLevel();
      }, 2000);
    }
  }, [poppedCount, targetNumber]);

  const generateBubbles = () => {
    const newBubbles = Array.from({ length: targetNumber }, (_, i) => ({
      id: i,
      x: Math.random() * 80,
      y: Math.random() * 70,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      popped: false,
    }));
    setBubbles(newBubbles);
    setPoppedCount(0);
    setGameWon(false);
  };

  const popBubble = (id) => {
    setBubbles(bubbles.map(b => 
      b.id === id ? { ...b, popped: true } : b
    ));
    setPoppedCount(poppedCount + 1);
  };

  const nextLevel = () => {
    setTargetNumber(Math.min(targetNumber + 1, 10));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-400 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-teal-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">🫧 Number Bubbles</h1>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="text-3xl font-bold text-blue-600 mb-4">
            Pop {targetNumber} bubbles!
          </div>
          <div className="text-2xl font-bold text-gray-700">
            Popped: {poppedCount} / {targetNumber}
          </div>
        </div>
        
        <div className="relative bg-gradient-to-br from-sky-200 to-blue-300 rounded-3xl h-[500px] shadow-2xl overflow-hidden">
          {bubbles.map((bubble) => (
            <button
              key={bubble.id}
              onClick={() => !bubble.popped && popBubble(bubble.id)}
              className={`absolute transition-all duration-300 ${
                bubble.popped ? 'scale-0 opacity-0' : 'scale-100 opacity-100 hover:scale-110'
              }`}
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: '100px',
                height: '100px',
                backgroundColor: bubble.color,
                borderRadius: '50%',
                border: '4px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 -20px 40px rgba(255, 255, 255, 0.4)',
                animation: 'float 3s ease-in-out infinite',
                animationDelay: `${bubble.id * 0.2}s`,
              }}
            >
              <span className="text-4xl font-black text-white drop-shadow">
                {bubble.id + 1}
              </span>
            </button>
          ))}
          
          {gameWon && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
              <div className="text-center animate-bounce">
                <div className="text-8xl mb-4">🎉</div>
                <div className="text-5xl font-black text-blue-600">Great Job!</div>
                <div className="text-3xl text-gray-600 mt-2">Next level coming...</div>
              </div>
            </div>
          )}
        </div>
        
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    </div>
  );
}
