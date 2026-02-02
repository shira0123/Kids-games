import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ColorMatch() {
  const colors = [
    { name: 'Red', hex: '#EF4444', emoji: '🍎' },
    { name: 'Blue', hex: '#3B82F6', emoji: '🦋' },
    { name: 'Yellow', hex: '#FBBF24', emoji: '🌟' },
    { name: 'Green', hex: '#10B981', emoji: '🍀' },
    { name: 'Purple', hex: '#A855F7', emoji: '🍇' },
    { name: 'Orange', hex: '#F97316', emoji: '🍊' },
  ];

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const correct = colors[Math.floor(Math.random() * colors.length)];
    const wrongOnes = colors.filter(c => c.name !== correct.name);
    const shuffled = [correct, ...wrongOnes.sort(() => 0.5 - Math.random()).slice(0, 2)]
      .sort(() => 0.5 - Math.random());
    
    setCurrentColor(correct);
    setOptions(shuffled);
    setFeedback('');
  };

  const handleAnswer = (selected) => {
    if (selected.name === currentColor.name) {
      setFeedback('🎉 Correct!');
      setScore(score + 1);
      setTimeout(generateQuestion, 1500);
    } else {
      setFeedback('❌ Try again!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-orange-300 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-purple-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">🎨 Color Match</h1>
        <div className="text-3xl font-bold text-white mb-8">Score: {score}</div>
        
        <div className="bg-white rounded-3xl p-12 shadow-2xl mb-8">
          <p className="text-3xl font-bold text-gray-700 mb-8">What color is this?</p>
          
          <div 
            className="w-64 h-64 mx-auto rounded-full mb-8 shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform"
            style={{ backgroundColor: currentColor.hex }}
          >
            <span className="text-9xl">{currentColor.emoji}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {options.map((color, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(color)}
                className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold py-6 px-8 rounded-2xl hover:scale-110 transform transition-all shadow-lg hover:shadow-2xl"
              >
                {color.name}
              </button>
            ))}
          </div>
          
          {feedback && (
            <div className="mt-8 text-4xl font-bold animate-bounce">
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
