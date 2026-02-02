import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MathRocket() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('+');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [rocketHeight, setRocketHeight] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const operations = ['+', '-'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * (op === '-' ? n1 : 10)) + 1;
    
    setNum1(n1);
    setNum2(n2);
    setOperation(op);
    setAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    const correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;
    
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 10);
      setRocketHeight(Math.min(rocketHeight + 10, 80));
      setFeedback('🚀 Correct! Rocket goes up!');
      setTimeout(generateQuestion, 1500);
    } else {
      setFeedback('❌ Try again!');
      setRocketHeight(Math.max(rocketHeight - 5, 0));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-pink-700 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-purple-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">🚀 Math Rocket</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white bg-opacity-95 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-2xl text-gray-600 mb-4">Score: {score}</div>
              <div className="text-6xl font-black text-purple-600 mb-8">
                {num1} {operation} {num2} = ?
              </div>
              
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-5xl font-bold text-center w-full border-4 border-purple-400 rounded-2xl p-4 mb-6 focus:border-purple-600 focus:outline-none"
                placeholder="?"
                autoFocus
              />
              
              <button
                onClick={checkAnswer}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
              >
                Check Answer
              </button>
              
              {feedback && (
                <div className="mt-6 text-3xl font-bold animate-pulse">
                  {feedback}
                </div>
              )}
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-700 mb-2">How to Play:</h3>
              <ul className="text-gray-600 space-y-2">
                <li>✓ Solve the math problem</li>
                <li>✓ Correct answers make your rocket fly higher</li>
                <li>✓ Wrong answers lower your rocket</li>
                <li>✓ Try to reach the stars!</li>
              </ul>
            </div>
          </div>
          
          <div className="relative bg-gradient-to-b from-indigo-900 to-purple-900 rounded-3xl h-[600px] shadow-2xl overflow-hidden">
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: Math.random(),
                  }}
                />
              ))}
            </div>
            
            <div
              className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out text-8xl"
              style={{ bottom: `${rocketHeight}%` }}
            >
              🚀
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-600 flex items-center justify-center">
              <span className="text-4xl">🌍</span>
            </div>
            
            {rocketHeight >= 70 && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-6xl animate-bounce">
                ⭐
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
