import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SizeSort() {
  const objects = [
    { emoji: '🐘', sizes: [60, 90, 120] },
    { emoji: '⚽', sizes: [40, 60, 80] },
    { emoji: '🌳', sizes: [50, 80, 110] },
    { emoji: '🏠', sizes: [55, 85, 115] },
    { emoji: '🚗', sizes: [45, 70, 95] },
  ];

  const [currentObject, setCurrentObject] = useState(objects[0]);
  const [items, setItems] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);

  useEffect(() => {
    generateQuestion();
  }, [level]);

  const generateQuestion = () => {
    const obj = objects[Math.floor(Math.random() * objects.length)];
    const shuffled = [...obj.sizes]
      .sort(() => Math.random() - 0.5)
      .map((size, idx) => ({ id: idx, size }));
    
    setCurrentObject(obj);
    setItems(shuffled);
    setSorted([]);
    setFeedback('');
  };

  const handleDrop = (item) => {
    if (sorted.find(s => s.id === item.id)) return;
    
    const newSorted = [...sorted, item];
    setSorted(newSorted);
    
    if (newSorted.length === items.length) {
      checkAnswer(newSorted);
    }
  };

  const checkAnswer = (sortedItems) => {
    const correct = sortedItems.every((item, idx) => {
      if (idx === 0) return true;
      return item.size >= sortedItems[idx - 1].size;
    });

    if (correct) {
      setScore(score + 10);
      setFeedback('🎉 Perfect Sorting!');
      setTimeout(() => {
        setLevel(level + 1);
      }, 2000);
    } else {
      setFeedback('❌ Not quite right. Try again!');
      setTimeout(() => {
        setSorted([]);
        setFeedback('');
      }, 2000);
    }
  };

  const resetSort = () => {
    setSorted([]);
    setFeedback('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-yellow-300 to-amber-400 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-orange-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">📏 Size Sort</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Score</div>
            <div className="text-5xl font-black text-orange-600">{score}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Level</div>
            <div className="text-5xl font-black text-purple-600">{level}</div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
            Sort from Smallest to Biggest!
          </h2>
          
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 mb-8 min-h-[200px] flex items-center justify-center gap-8">
            {sorted.length === 0 ? (
              <div className="text-2xl text-gray-400 font-bold">Click items below to sort them!</div>
            ) : (
              sorted.map((item, idx) => (
                <div
                  key={item.id}
                  className="transition-all duration-300 transform hover:scale-110"
                  style={{ fontSize: `${item.size}px` }}
                >
                  {currentObject.emoji}
                </div>
              ))
            )}
          </div>
          
          <div className="flex justify-center gap-8 mb-6">
            {items.map((item) => {
              const isUsed = sorted.find(s => s.id === item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleDrop(item)}
                  disabled={isUsed}
                  className={`transition-all duration-300 ${
                    isUsed
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:scale-110 cursor-pointer'
                  }`}
                  style={{
                    fontSize: `${item.size}px`,
                    filter: isUsed ? 'grayscale(100%)' : 'none',
                  }}
                >
                  {currentObject.emoji}
                </button>
              );
            })}
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={resetSort}
              className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform"
            >
              Reset ↺
            </button>
            
            <button
              onClick={generateQuestion}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform"
            >
              New Challenge →
            </button>
          </div>
          
          {feedback && (
            <div className="mt-6 text-4xl font-bold text-center animate-bounce">
              {feedback}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-700 mb-3 text-center">Learning About Size:</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">🤏</div>
              <div className="text-gray-600 font-semibold">Small</div>
            </div>
            <div className="p-4">
              <div className="text-5xl mb-2">🖐️</div>
              <div className="text-gray-600 font-semibold">Medium</div>
            </div>
            <div className="p-4">
              <div className="text-6xl mb-2">🙌</div>
              <div className="text-gray-600 font-semibold">Large</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
