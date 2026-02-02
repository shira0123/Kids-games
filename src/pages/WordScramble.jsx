import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function WordScramble() {
  const words = [
    { word: 'CAT', hint: '🐱 A furry pet that meows' },
    { word: 'DOG', hint: '🐶 A furry pet that barks' },
    { word: 'SUN', hint: '☀️ Bright and warm in the sky' },
    { word: 'TREE', hint: '🌳 Tall plant with leaves' },
    { word: 'BOOK', hint: '📚 You read this' },
    { word: 'STAR', hint: '⭐ Twinkles in the night sky' },
    { word: 'BIRD', hint: '🐦 Flies in the sky' },
    { word: 'FISH', hint: '🐟 Swims in water' },
    { word: 'MOON', hint: '🌙 Shines at night' },
    { word: 'BALL', hint: '⚽ Round toy to play with' },
  ];

  const [currentWord, setCurrentWord] = useState(null);
  const [scrambled, setScrambled] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [solvedWords, setSolvedWords] = useState([]);

  useEffect(() => {
    newWord();
  }, []);

  const scrambleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const newWord = () => {
    const availableWords = words.filter(w => !solvedWords.includes(w.word));
    if (availableWords.length === 0) {
      setSolvedWords([]);
      return;
    }
    
    const word = availableWords[Math.floor(Math.random() * availableWords.length)];
    let scrambledWord = scrambleWord(word.word);
    
    while (scrambledWord === word.word && word.word.length > 2) {
      scrambledWord = scrambleWord(word.word);
    }
    
    setCurrentWord(word);
    setScrambled(scrambledWord);
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    if (userAnswer.toUpperCase() === currentWord.word) {
      setScore(score + 10);
      setFeedback('🎉 Perfect!');
      setSolvedWords([...solvedWords, currentWord.word]);
      setTimeout(newWord, 2000);
    } else {
      setFeedback('❌ Not quite! Try again');
    }
  };

  const giveHint = () => {
    setUserAnswer(currentWord.word[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-red-400 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-orange-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">📝 Word Scramble</h1>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-gray-600 mb-4">Score: {score}</div>
            <div className="text-lg text-gray-500 mb-2">Unscramble the letters!</div>
          </div>
          
          {currentWord && (
            <>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
                <div className="text-xl text-gray-700 mb-2 text-center">Hint:</div>
                <div className="text-2xl font-bold text-center">{currentWord.hint}</div>
              </div>
              
              <div className="flex justify-center gap-3 mb-8">
                {scrambled.split('').map((letter, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-3xl font-black text-white shadow-lg transform hover:rotate-12 transition-transform"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              
              <div className="mb-6">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                  className="w-full text-4xl font-bold text-center border-4 border-orange-400 rounded-2xl p-4 focus:border-orange-600 focus:outline-none uppercase"
                  placeholder="TYPE YOUR ANSWER"
                  maxLength={currentWord.word.length}
                  autoFocus
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={checkAnswer}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
                >
                  Check ✓
                </button>
                
                <button
                  onClick={giveHint}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-2xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
                >
                  Hint 💡
                </button>
                
                <button
                  onClick={newWord}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
                >
                  Skip →
                </button>
              </div>
              
              {feedback && (
                <div className="mt-6 text-4xl font-bold text-center animate-bounce">
                  {feedback}
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="bg-white bg-opacity-90 rounded-2xl p-6 shadow-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-700 mb-2">Words Solved</div>
            <div className="text-3xl font-black text-purple-600">{solvedWords.length} / {words.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
