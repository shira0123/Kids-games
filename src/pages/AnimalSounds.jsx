import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AnimalSounds() {
  const animals = [
    { name: 'Dog', emoji: '🐶', sound: 'Woof Woof!', color: 'from-amber-400 to-orange-500' },
    { name: 'Cat', emoji: '🐱', sound: 'Meow Meow!', color: 'from-gray-400 to-gray-600' },
    { name: 'Cow', emoji: '🐮', sound: 'Moo Moo!', color: 'from-pink-400 to-pink-600' },
    { name: 'Sheep', emoji: '🐑', sound: 'Baa Baa!', color: 'from-slate-300 to-slate-500' },
    { name: 'Duck', emoji: '🦆', sound: 'Quack Quack!', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Pig', emoji: '🐷', sound: 'Oink Oink!', color: 'from-pink-300 to-pink-500' },
    { name: 'Lion', emoji: '🦁', sound: 'Roar!', color: 'from-orange-400 to-orange-600' },
    { name: 'Frog', emoji: '🐸', sound: 'Ribbit Ribbit!', color: 'from-green-400 to-green-600' },
    { name: 'Bird', emoji: '🐦', sound: 'Tweet Tweet!', color: 'from-blue-400 to-blue-600' },
    { name: 'Horse', emoji: '🐴', sound: 'Neigh!', color: 'from-brown-400 to-brown-600' },
    { name: 'Owl', emoji: '🦉', sound: 'Hoot Hoot!', color: 'from-amber-600 to-amber-800' },
    { name: 'Elephant', emoji: '🐘', sound: 'Trumpet!', color: 'from-gray-500 to-gray-700' },
  ];

  const [activeAnimal, setActiveAnimal] = useState(null);

  const playSound = (animal) => {
    setActiveAnimal(animal);
    setTimeout(() => setActiveAnimal(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-yellow-200 to-pink-300 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-green-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-4 text-center drop-shadow-lg">🦁 Animal Sounds</h1>
        <p className="text-2xl text-white text-center mb-8 drop-shadow">Click on animals to hear their sounds!</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {animals.map((animal, idx) => (
            <button
              key={idx}
              onClick={() => playSound(animal)}
              className={`relative bg-gradient-to-br ${animal.color} rounded-3xl p-8 shadow-xl hover:scale-105 transition-all duration-300 border-4 border-white overflow-hidden`}
            >
              <div className="text-8xl mb-4 text-center animate-bounce">
                {animal.emoji}
              </div>
              <div className="text-2xl font-black text-white text-center drop-shadow">
                {animal.name}
              </div>
              
              {activeAnimal?.name === animal.name && (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center animate-pulse">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{animal.emoji}</div>
                    <div className="text-3xl font-black text-gray-800">
                      {animal.sound}
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Learn More!</h2>
          <p className="text-xl text-gray-600 text-center">
            Animals make different sounds to communicate. Can you remember all the sounds? 
            Try matching the animal with its sound!
          </p>
        </div>
      </div>
    </div>
  );
}
