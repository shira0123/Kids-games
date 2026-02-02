import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RhymeTime() {
  const rhymeSets = [
    { word: 'CAT', rhymes: ['HAT', 'BAT', 'MAT'], nonRhymes: ['DOG', 'SUN', 'CAR'] },
    { word: 'BEE', rhymes: ['SEE', 'TEA', 'KEY'], nonRhymes: ['BAT', 'PIG', 'RUN'] },
    { word: 'LOG', rhymes: ['DOG', 'FOG', 'HOG'], nonRhymes: ['CAT', 'SUN', 'FAN'] },
    { word: 'STAR', rhymes: ['CAR', 'JAR', 'FAR'], nonRhymes: ['SUN', 'PEN', 'BOX'] },
    { word: 'MOON', rhymes: ['SOON', 'SPOON', 'JUNE'], nonRhymes: ['STAR', 'RAIN', 'FISH'] },
    { word: 'TRAIN', rhymes: ['RAIN', 'PAIN', 'MAIN'], nonRhymes: ['BOAT', 'DRUM', 'LEAF'] },
  ];

  const [currentSet, setCurrentSet] = useState(rhymeSets[0]);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const set = rhymeSets[Math.floor(Math.random() * rhymeSets.length)];
    const correctRhymes = set.rhymes.slice(0, 2);
    const wrongWords = set.nonRhymes.slice(0, 2);
    const allOptions = [...correctRhymes, ...wrongWords].sort(() => Math.random() - 0.5);
    
    setCurrentSet(set);
    setOptions(allOptions.map(word => ({ word, selected: null })));
    setFeedback('');
  };

  const handleSelect = (index, rhymes) => {
    const newOptions = [...options];
    newOptions[index].selected = rhymes;
    setOptions(newOptions);
  };

  const checkAnswers = () => {
    let correct = 0;
    options.forEach(option => {
      const shouldRhyme = currentSet.rhymes.includes(option.word);
      if (option.selected === shouldRhyme) {
        correct++;
      }
    });

    if (correct === options.length) {
      setScore(score + 10);
      setStreak(streak + 1);
      setFeedback('🎉 Perfect! All correct!');
      setTimeout(generateQuestion, 2000);
    } else {
      setStreak(0);
      setFeedback('❌ Not all correct. Try again!');
    }
  };

  const allAnswered = options.every(opt => opt.selected !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-purple-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">🎵 Rhyme Time</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Score</div>
            <div className="text-5xl font-black text-purple-600">{score}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Streak 🔥</div>
            <div className="text-5xl font-black text-orange-600">{streak}</div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Which words rhyme with:
            </h2>
            <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-6xl font-black px-12 py-6 rounded-3xl shadow-xl">
              {currentSet.word}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {options.map((option, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-md">
                <div className="text-3xl font-bold text-gray-800 mb-4 text-center">
                  {option.word}
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => handleSelect(idx, true)}
                    className={`flex-1 py-4 rounded-xl font-bold text-xl transition-all ${
                      option.selected === true
                        ? 'bg-green-500 text-white scale-105'
                        : 'bg-white text-green-600 border-2 border-green-500 hover:bg-green-50'
                    }`}
                  >
                    ✓ Rhymes
                  </button>
                  
                  <button
                    onClick={() => handleSelect(idx, false)}
                    className={`flex-1 py-4 rounded-xl font-bold text-xl transition-all ${
                      option.selected === false
                        ? 'bg-red-500 text-white scale-105'
                        : 'bg-white text-red-600 border-2 border-red-500 hover:bg-red-50'
                    }`}
                  >
                    ✗ No Rhyme
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={checkAnswers}
            disabled={!allAnswered}
            className={`w-full text-2xl font-bold py-5 rounded-2xl transition-all ${
              allAnswered
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 shadow-lg cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {allAnswered ? 'Check My Answers!' : 'Select all words first'}
          </button>
          
          {feedback && (
            <div className="mt-6 text-4xl font-bold text-center animate-pulse">
              {feedback}
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-700 mb-3">What are Rhymes?</h3>
          <p className="text-gray-600 text-lg">
            Words rhyme when they end with the same sound! Like CAT and HAT, or BEE and SEE. 
            Listen carefully to how the words sound when you say them out loud! 🗣️
          </p>
        </div>
      </div>
    </div>
  );
}
