import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LetterHunt() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [targetLetter, setTargetLetter] = useState('A');
  const [letters, setLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true);

  useEffect(() => {
    generateLetters();
  }, [targetLetter]);

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [timeLeft, gameActive]);

  const generateLetters = () => {
    const newLetters = [];
    for (let i = 0; i < 15; i++) {
      const isTarget = Math.random() < 0.2;
      newLetters.push({
        id: i,
        letter: isTarget ? targetLetter : alphabet[Math.floor(Math.random() * alphabet.length)],
        x: Math.random() * 85,
        y: Math.random() * 75,
        color: `hsl(${Math.random() * 360}, 70%, 65%)`,
      });
    }
    setLetters(newLetters);
  };

  const handleClick = (letter) => {
    if (!gameActive) return;
    
    if (letter.letter === targetLetter) {
      setScore(score + 10);
      setLetters(letters.filter(l => l.id !== letter.id));
      
      if (letters.filter(l => l.letter === targetLetter).length <= 1) {
        const nextLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        setTargetLetter(nextLetter);
      }
    } else {
      setScore(Math.max(0, score - 5));
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setTargetLetter('A');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-green-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">🔤 Letter Hunt</h1>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Find Letter</div>
            <div className="text-6xl font-black text-green-600">{targetLetter}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Score</div>
            <div className="text-5xl font-black text-blue-600">{score}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Time</div>
            <div className={`text-5xl font-black ${timeLeft < 10 ? 'text-red-600' : 'text-purple-600'}`}>
              {timeLeft}s
            </div>
          </div>
        </div>
        
        <div className="relative bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl h-[500px] shadow-2xl overflow-hidden">
          {gameActive ? (
            letters.map((letter) => (
              <button
                key={letter.id}
                onClick={() => handleClick(letter)}
                className="absolute font-black text-white text-4xl hover:scale-125 transition-transform cursor-pointer"
                style={{
                  left: `${letter.x}%`,
                  top: `${letter.y}%`,
                  width: '60px',
                  height: '60px',
                  backgroundColor: letter.color,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}
              >
                {letter.letter}
              </button>
            ))
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95">
              <div className="text-center">
                <div className="text-8xl mb-4">⏱️</div>
                <div className="text-5xl font-black text-gray-800 mb-4">Time's Up!</div>
                <div className="text-3xl text-gray-600 mb-8">Final Score: {score}</div>
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold py-4 px-12 rounded-full hover:scale-110 transition-transform shadow-lg"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
