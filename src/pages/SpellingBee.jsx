import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SpellingBee() {
  const wordList = [
    { word: 'APPLE', hint: '🍎 Red fruit', difficulty: 'easy' },
    { word: 'BANANA', hint: '🍌 Yellow fruit', difficulty: 'easy' },
    { word: 'BUTTERFLY', hint: '🦋 Beautiful flying insect', difficulty: 'medium' },
    { word: 'ELEPHANT', hint: '🐘 Largest land animal', difficulty: 'medium' },
    { word: 'RAINBOW', hint: '🌈 Colorful arc in sky', difficulty: 'medium' },
    { word: 'CHOCOLATE', hint: '🍫 Sweet brown treat', difficulty: 'hard' },
    { word: 'DINOSAUR', hint: '🦕 Ancient giant creature', difficulty: 'hard' },
    { word: 'UMBRELLA', hint: '☂️ Keeps you dry', difficulty: 'hard' },
  ];

  const [currentWord, setCurrentWord] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [hints, setHints] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [completedWords, setCompletedWords] = useState([]);

  useEffect(() => {
    nextWord();
  }, []);

  const nextWord = () => {
    const available = wordList.filter(w => !completedWords.includes(w.word));
    if (available.length === 0) {
      setCompletedWords([]);
      return;
    }
    
    const word = available[Math.floor(Math.random() * available.length)];
    setCurrentWord(word);
    setUserInput('');
    setFeedback('');
    setRevealedLetters([]);
  };

  const checkSpelling = () => {
    if (userInput.toUpperCase() === currentWord.word) {
      const points = currentWord.difficulty === 'easy' ? 5 : currentWord.difficulty === 'medium' ? 10 : 15;
      setScore(score + points);
      setFeedback('🎉 Perfect Spelling!');
      setCompletedWords([...completedWords, currentWord.word]);
      setTimeout(nextWord, 2000);
    } else {
      setFeedback('❌ Not quite! Try again');
    }
  };

  const useHint = () => {
    if (hints > 0 && revealedLetters.length < currentWord.word.length) {
      const unrevealed = currentWord.word
        .split('')
        .map((_, idx) => idx)
        .filter(idx => !revealedLetters.includes(idx));
      
      if (unrevealed.length > 0) {
        const randomIdx = unrevealed[Math.floor(Math.random() * unrevealed.length)];
        setRevealedLetters([...revealedLetters, randomIdx]);
        setHints(hints - 1);
      }
    }
  };

  if (!currentWord) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-amber-300 to-orange-400 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-yellow-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">🐝 Spelling Bee</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Score</div>
            <div className="text-5xl font-black text-yellow-600">{score}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Hints Left 💡</div>
            <div className="text-5xl font-black text-blue-600">{hints}</div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="mb-8">
            <div className={`inline-block px-6 py-2 rounded-full font-bold text-white ${
              currentWord.difficulty === 'easy' ? 'bg-green-500' :
              currentWord.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              {currentWord.difficulty.toUpperCase()}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 mb-8">
            <div className="text-2xl text-gray-700 mb-4 text-center">Spell this word:</div>
            <div className="text-5xl font-bold text-center">{currentWord.hint}</div>
          </div>
          
          <div className="flex justify-center gap-3 mb-8">
            {currentWord.word.split('').map((letter, idx) => (
              <div
                key={idx}
                className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-3xl font-black text-white shadow-lg"
              >
                {revealedLetters.includes(idx) ? letter : '?'}
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && checkSpelling()}
              className="w-full text-4xl font-bold text-center border-4 border-yellow-400 rounded-2xl p-4 uppercase focus:border-yellow-600 focus:outline-none"
              placeholder="TYPE YOUR ANSWER"
              maxLength={currentWord.word.length}
              autoFocus
            />
          </div>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={checkSpelling}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
            >
              Check ✓
            </button>
            
            <button
              onClick={useHint}
              disabled={hints === 0}
              className={`flex-1 text-2xl font-bold py-4 rounded-2xl transition-transform shadow-lg ${
                hints > 0
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Hint 💡
            </button>
            
            <button
              onClick={nextWord}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-2xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
            >
              Skip →
            </button>
          </div>
          
          {feedback && (
            <div className="text-4xl font-bold text-center animate-pulse">
              {feedback}
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-700 mb-3 text-center">Spelling Tips:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">👂</div>
              <div className="text-gray-600">Sound it out</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">✍️</div>
              <div className="text-gray-600">Write it down</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🔤</div>
              <div className="text-gray-600">Check each letter</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
