import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ClockLearning() {
  const [hour, setHour] = useState(3);
  const [minute, setMinute] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const newHour = Math.floor(Math.random() * 12) + 1;
    const newMinute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    
    setHour(newHour);
    setMinute(newMinute);
    
    const correctTime = formatTime(newHour, newMinute);
    const wrongTimes = [];
    
    while (wrongTimes.length < 2) {
      const wrongHour = Math.floor(Math.random() * 12) + 1;
      const wrongMinute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      const wrongTime = formatTime(wrongHour, wrongMinute);
      
      if (wrongTime !== correctTime && !wrongTimes.includes(wrongTime)) {
        wrongTimes.push(wrongTime);
      }
    }
    
    setOptions([correctTime, ...wrongTimes].sort(() => Math.random() - 0.5));
    setFeedback('');
  };

  const formatTime = (h, m) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const displayMinute = m === 0 ? '00' : m;
    return `${displayHour}:${displayMinute}`;
  };

  const handleAnswer = (selected) => {
    const correct = formatTime(hour, minute);
    
    if (selected === correct) {
      setScore(score + 10);
      setFeedback('🎉 Correct Time!');
      setTimeout(generateQuestion, 2000);
    } else {
      setFeedback('❌ Try again!');
    }
  };

  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const minuteAngle = minute * 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-blue-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">🕐 Clock Learning</h1>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 text-center">
          <div className="text-gray-600 text-lg mb-2">Score</div>
          <div className="text-5xl font-black text-blue-600">{score}</div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-700 mb-8 text-center">
              What time is it?
            </h2>
            
            <div className="relative w-80 h-80 mx-auto bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full border-8 border-amber-600 shadow-2xl">
              {[...Array(12)].map((_, i) => {
                const angle = (i + 1) * 30;
                const x = 50 + 35 * Math.sin((angle * Math.PI) / 180);
                const y = 50 - 35 * Math.cos((angle * Math.PI) / 180);
                
                return (
                  <div
                    key={i}
                    className="absolute text-2xl font-black text-gray-700"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {i + 1}
                  </div>
                );
              })}
              
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-30" />
              
              <div
                className="absolute top-1/2 left-1/2 w-2 bg-gray-800 origin-bottom rounded-full"
                style={{
                  height: '30%',
                  transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
                  transformOrigin: 'bottom center',
                }}
              />
              
              <div
                className="absolute top-1/2 left-1/2 w-1.5 bg-blue-600 origin-bottom rounded-full"
                style={{
                  height: '40%',
                  transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
                  transformOrigin: 'bottom center',
                }}
              />
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center">
              Choose the correct time:
            </h3>
            
            <div className="space-y-4">
              {options.map((time, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(time)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-4xl font-black py-6 rounded-2xl hover:scale-105 transition-transform shadow-lg"
                >
                  {time}
                </button>
              ))}
            </div>
            
            {feedback && (
              <div className="mt-8 text-4xl font-bold text-center animate-bounce">
                {feedback}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">How to Read a Clock:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-5xl mb-3">⏰</div>
              <div className="font-bold text-gray-700 mb-2">Short Hand</div>
              <div className="text-gray-600">Points to the HOUR</div>
            </div>
            <div className="p-4">
              <div className="text-5xl mb-3">⏱️</div>
              <div className="font-bold text-gray-700 mb-2">Long Hand</div>
              <div className="text-gray-600">Points to the MINUTES</div>
            </div>
            <div className="p-4">
              <div className="text-5xl mb-3">🕐</div>
              <div className="font-bold text-gray-700 mb-2">Practice!</div>
              <div className="text-gray-600">Keep practicing to learn</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
