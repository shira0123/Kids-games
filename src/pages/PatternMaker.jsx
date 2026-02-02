import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PatternMaker() {
  const shapes = ['🔴', '🟦', '🟢', '🟡', '🟣', '🟠'];
  const [pattern, setPattern] = useState([]);
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);

  useEffect(() => {
    generatePattern();
  }, [level]);

  const generatePattern = () => {
    const patternLength = Math.min(3 + level, 6);
    const selectedShapes = shapes.slice(0, Math.min(3 + Math.floor(level / 2), shapes.length));
    
    const newPattern = [];
    for (let i = 0; i < patternLength; i++) {
      newPattern.push(selectedShapes[i % selectedShapes.length]);
    }
    
    const answer = selectedShapes[patternLength % selectedShapes.length];
    
    const wrongOptions = selectedShapes.filter(s => s !== answer).slice(0, 2);
    const allOptions = [answer, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setPattern(newPattern);
    setCorrectAnswer(answer);
    setOptions(allOptions);
    setFeedback('');
  };

  const handleAnswer = (selected) => {
    if (selected === correctAnswer) {
      setScore(score + 10);
      setFeedback('🎉 Correct Pattern!');
      setTimeout(() => {
        setLevel(level + 1);
      }, 1500);
    } else {
      setFeedback('❌ Not quite! Try again');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-teal-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">🎭 Pattern Maker</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Score</div>
            <div className="text-5xl font-black text-teal-600">{score}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Level</div>
            <div className="text-5xl font-black text-purple-600">{level}</div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
            What comes next in the pattern?
          </h2>
          
          <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            {pattern.map((shape, idx) => (
              <div
                key={idx}
                className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-md text-5xl transform hover:scale-110 transition-transform"
              >
                {shape}
              </div>
            ))}
            
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-xl flex items-center justify-center shadow-md border-4 border-dashed border-orange-400">
              <span className="text-4xl">❓</span>
            </div>
          </div>
          
          <div className="flex justify-center gap-6 mb-8">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transform transition-all border-4 border-transparent hover:border-blue-500"
              >
                <span className="text-6xl">{option}</span>
              </button>
            ))}
          </div>
          
          {feedback && (
            <div className="text-center text-4xl font-bold animate-pulse">
              {feedback}
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-white bg-opacity-90 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-700 mb-3">Pattern Rules:</h3>
          <ul className="text-gray-600 space-y-2">
            <li>🔄 Patterns repeat in order</li>
            <li>🎯 Find what shape comes next</li>
            <li>⭐ Higher levels = longer patterns</li>
            <li>🏆 Each correct answer = 10 points</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
