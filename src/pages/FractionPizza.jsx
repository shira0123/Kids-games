import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FractionPizza() {
  const fractions = [
    { value: 1/2, display: '1/2', slices: 2, label: 'One Half' },
    { value: 1/3, display: '1/3', slices: 3, label: 'One Third' },
    { value: 1/4, display: '1/4', slices: 4, label: 'One Quarter' },
    { value: 2/4, display: '2/4', slices: 4, label: 'Two Quarters' },
    { value: 3/4, display: '3/4', slices: 4, label: 'Three Quarters' },
  ];

  const [currentFraction, setCurrentFraction] = useState(fractions[0]);
  const [selectedSlices, setSelectedSlices] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const fraction = fractions[Math.floor(Math.random() * fractions.length)];
    setCurrentFraction(fraction);
    setSelectedSlices([]);
    setFeedback('');
  };

  const toggleSlice = (index) => {
    if (selectedSlices.includes(index)) {
      setSelectedSlices(selectedSlices.filter(i => i !== index));
    } else {
      setSelectedSlices([...selectedSlices, index]);
    }
  };

  const checkAnswer = () => {
    const numerator = currentFraction.display.split('/')[0];
    const correct = selectedSlices.length === parseInt(numerator);
    
    if (correct) {
      setScore(score + 10);
      setFeedback('🍕 Delicious! Correct!');
      setTimeout(generateQuestion, 2000);
    } else {
      setFeedback('❌ Not quite! Try again');
    }
  };

  const renderPizza = () => {
    const slices = [];
    const sliceCount = currentFraction.slices;
    const angleStep = 360 / sliceCount;

    for (let i = 0; i < sliceCount; i++) {
      const isSelected = selectedSlices.includes(i);
      const rotation = i * angleStep;
      
      slices.push(
        <div
          key={i}
          className="absolute top-0 left-0 w-full h-full cursor-pointer"
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={() => toggleSlice(i)}
        >
          <div
            className={`absolute top-0 left-1/2 w-0 h-0 origin-bottom transition-all duration-300 ${
              isSelected ? 'opacity-100' : 'opacity-40'
            }`}
            style={{
              borderLeft: '150px solid transparent',
              borderRight: '150px solid transparent',
              borderBottom: `150px solid ${isSelected ? '#F59E0B' : '#FCD34D'}`,
              transform: `translateX(-50%) rotate(${-angleStep / 2}deg)`,
              clipPath: `polygon(50% 100%, ${50 - 50 * Math.tan((angleStep * Math.PI) / 360)}% 0%, ${50 + 50 * Math.tan((angleStep * Math.PI) / 360)}% 0%)`,
            }}
          >
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-2xl">
              🧀
            </div>
          </div>
        </div>
      );
    }

    return slices;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-red-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">🍕 Fraction Pizza</h1>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 text-center">
          <div className="text-gray-600 text-lg mb-2">Score</div>
          <div className="text-5xl font-black text-orange-600">{score}</div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
              Select the fraction:
            </h2>
            
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-8 mb-6">
              <div className="text-7xl font-black text-orange-600 text-center mb-4">
                {currentFraction.display}
              </div>
              <div className="text-2xl text-gray-700 text-center">
                ({currentFraction.label})
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-xl text-gray-600 mb-2">
                Click on the pizza slices to select {currentFraction.display} of the pizza
              </div>
              <div className="text-lg text-gray-500">
                Selected: {selectedSlices.length} / {currentFraction.slices} slices
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={checkAnswer}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
              >
                Check Answer ✓
              </button>
              
              <button
                onClick={generateQuestion}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
              >
                New Pizza →
              </button>
            </div>
            
            {feedback && (
              <div className="mt-6 text-4xl font-bold text-center animate-bounce">
                {feedback}
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-yellow-600 rounded-full shadow-2xl"></div>
              
              <div className="absolute inset-2 bg-orange-500 rounded-full"></div>
              
              {renderPizza()}
              
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-red-400 rounded-full"
                  style={{
                    width: '20px',
                    height: '20px',
                    top: `${50 + 30 * Math.sin((i * Math.PI) / 4)}%`,
                    left: `${50 + 30 * Math.cos((i * Math.PI) / 4)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">Understanding Fractions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-5xl mb-3">📊</div>
              <div className="font-bold text-gray-700 mb-2">Top Number</div>
              <div className="text-gray-600">How many parts you have</div>
            </div>
            <div className="text-center p-4">
              <div className="text-5xl mb-3">➗</div>
              <div className="font-bold text-gray-700 mb-2">Bottom Number</div>
              <div className="text-gray-600">Total number of equal parts</div>
            </div>
            <div className="text-center p-4">
              <div className="text-5xl mb-3">🍕</div>
              <div className="font-bold text-gray-700 mb-2">Pizza Example</div>
              <div className="text-gray-600">2/4 = 2 slices out of 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
