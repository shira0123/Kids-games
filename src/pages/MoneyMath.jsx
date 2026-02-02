import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MoneyMath() {
  const coins = [
    { name: 'Penny', value: 1, emoji: '🟤', color: 'bg-amber-600' },
    { name: 'Nickel', value: 5, emoji: '⚪', color: 'bg-gray-400' },
    { name: 'Dime', value: 10, emoji: '⚪', color: 'bg-gray-500' },
    { name: 'Quarter', value: 25, emoji: '⚪', color: 'bg-gray-300' },
  ];

  const [targetAmount, setTargetAmount] = useState(0);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    const total = selectedCoins.reduce((sum, coin) => sum + coin.value, 0);
    setCurrentTotal(total);
  }, [selectedCoins]);

  const generateQuestion = () => {
    const amount = (Math.floor(Math.random() * 10) + 1) * 5;
    setTargetAmount(amount);
    setSelectedCoins([]);
    setCurrentTotal(0);
    setFeedback('');
  };

  const addCoin = (coin) => {
    if (currentTotal + coin.value <= targetAmount) {
      setSelectedCoins([...selectedCoins, { ...coin, id: Date.now() }]);
    }
  };

  const removeCoin = (coinId) => {
    setSelectedCoins(selectedCoins.filter(c => c.id !== coinId));
  };

  const checkAnswer = () => {
    if (currentTotal === targetAmount) {
      setScore(score + 10);
      setFeedback('💰 Perfect! Correct amount!');
      setTimeout(generateQuestion, 2000);
    } else if (currentTotal < targetAmount) {
      setFeedback('📉 Too little! Add more coins');
    } else {
      setFeedback('📈 Too much! Remove some coins');
    }
  };

  const reset = () => {
    setSelectedCoins([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-green-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">💰 Money Math</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Score</div>
            <div className="text-5xl font-black text-green-600">{score}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Target Amount</div>
            <div className="text-5xl font-black text-purple-600">{targetAmount}¢</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
              Choose Coins
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {coins.map((coin, idx) => (
                <button
                  key={idx}
                  onClick={() => addCoin(coin)}
                  className={`${coin.color} rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform border-4 border-white`}
                >
                  <div className="text-6xl mb-3 text-center">{coin.emoji}</div>
                  <div className="text-2xl font-black text-white text-center mb-2">
                    {coin.name}
                  </div>
                  <div className="text-3xl font-black text-white text-center">
                    {coin.value}¢
                  </div>
                </button>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-3 text-center">Coin Values:</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between items-center">
                  <span>🟤 Penny</span>
                  <span className="font-bold">1¢</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>⚪ Nickel</span>
                  <span className="font-bold">5¢</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>⚪ Dime</span>
                  <span className="font-bold">10¢</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>⚪ Quarter</span>
                  <span className="font-bold">25¢</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
              Your Coins
            </h2>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 min-h-[250px] mb-6 border-4 border-dashed border-orange-300">
              {selectedCoins.length === 0 ? (
                <div className="flex items-center justify-center h-full text-2xl text-gray-400 font-bold">
                  Click coins to add them
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {selectedCoins.map((coin) => (
                    <button
                      key={coin.id}
                      onClick={() => removeCoin(coin.id)}
                      className={`${coin.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-lg hover:scale-110 transition-transform`}
                    >
                      {coin.value}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 text-center">
              <div className="text-white text-lg mb-2">Current Total</div>
              <div className="text-6xl font-black text-white">
                {currentTotal}¢
              </div>
              <div className={`text-2xl font-bold mt-2 ${
                currentTotal === targetAmount ? 'text-yellow-300' : 
                currentTotal < targetAmount ? 'text-blue-200' : 'text-red-200'
              }`}>
                {currentTotal === targetAmount ? '✓ Perfect!' : 
                 currentTotal < targetAmount ? `Need ${targetAmount - currentTotal}¢ more` : 
                 `${currentTotal - targetAmount}¢ too much`}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={reset}
                className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform"
              >
                Clear All
              </button>
              
              <button
                onClick={checkAnswer}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-bold py-4 rounded-2xl hover:scale-105 transition-transform"
              >
                Check ✓
              </button>
            </div>
            
            {feedback && (
              <div className="mt-6 text-3xl font-bold text-center animate-pulse">
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
