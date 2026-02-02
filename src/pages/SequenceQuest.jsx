import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SequenceQuest() {
  const [sequence, setSequence] = useState([]);
  const [answer, setAnswer] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);

  useEffect(() => {
    generateSequence();
  }, [level]);

  const generateSequence = () => {
    const type = Math.random();
    let seq = [];
    let ans = 0;
    
    if (type < 0.3) {
      const start = Math.floor(Math.random() * 10) + 1;
      const step = Math.floor(Math.random() * 3) + 2;
      seq = [start, start + step, start + step * 2, start + step * 3];
      ans = start + step * 4;
    } else if (type < 0.6) {
      const start = Math.floor(Math.random() * 5) + 1;
      seq = [start, start * 2, start * 3, start * 4];
      ans = start * 5;
    } else {
      const start = Math.floor(Math.random() * 20) + 10;
      const step = Math.floor(Math.random() * 3) + 2;
      seq = [start, start - step, start - step * 2, start - step * 3];
      ans = start - step * 4;
    }
    
    setSequence(seq);
    setAnswer(ans);
    setUserInput('');
    setFeedback('');
  };

  const checkAnswer = () => {
    if (parseInt(userInput) === answer) {
      setScore(score + 10);
      setFeedback('🎉 Correct!');
      setTimeout(() => {
        setLevel(level + 1);
      }, 2000);
    } else {
      setFeedback('❌ Try again!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-indigo-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">🔢 Sequence Quest</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Score</div>
            <div className="text-5xl font-black text-indigo-600">{score}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Level</div>
            <div className="text-5xl font-black text-purple-600">{level}</div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-700 mb-8 text-center">
            What number comes next?
          </h2>
          
          <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            {sequence.map((num, idx) => (
              <div
                key={idx}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-lg transform hover:scale-110 transition-transform"
              >
                {num}
              </div>
            ))}
            
            <div className="text-5xl font-black text-gray-400 mx-2">→</div>
            
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-4xl font-black text-white shadow-lg border-4 border-dashed border-white">
              ?
            </div>
          </div>
          
          <div className="mb-6">
            <input
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              className="w-full text-5xl font-bold text-center border-4 border-purple-400 rounded-2xl p-4 focus:border-purple-600 focus:outline-none"
              placeholder="?"
              autoFocus
            />
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={checkAnswer}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
            >
              Check Answer ✓
            </button>
            
            <button
              onClick={generateSequence}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
            >
              New Sequence →
            </button>
          </div>
          
          {feedback && (
            <div className="mt-6 text-4xl font-bold text-center animate-pulse">
              {feedback}
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">Pattern Tips:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">➕</div>
              <div className="text-gray-600 font-semibold">Adding Pattern</div>
              <div className="text-sm text-gray-500">2, 4, 6, 8...</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">✖️</div>
              <div className="text-gray-600 font-semibold">Multiplying Pattern</div>
              <div className="text-sm text-gray-500">2, 4, 8, 16...</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">➖</div>
              <div className="text-gray-600 font-semibold">Subtracting Pattern</div>
              <div className="text-sm text-gray-500">10, 8, 6, 4...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
