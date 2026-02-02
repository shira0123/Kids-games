import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MemoryCards() {
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards]);

  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji, flipped: false }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleClick = (card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.emoji)) {
      return;
    }

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard.emoji === secondCard.emoji) {
        setMatched([...matched, firstCard.emoji]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-purple-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-black text-white mb-8 drop-shadow-lg">🃏 Memory Cards</h1>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 flex justify-around items-center">
          <div>
            <div className="text-gray-600 text-lg">Moves</div>
            <div className="text-4xl font-black text-purple-600">{moves}</div>
          </div>
          <div>
            <div className="text-gray-600 text-lg">Matched</div>
            <div className="text-4xl font-black text-pink-600">{matched.length} / {emojis.length}</div>
          </div>
          <button
            onClick={initGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform"
          >
            New Game
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => {
            const isFlipped = flipped.includes(card.id) || matched.includes(card.emoji);
            return (
              <button
                key={card.id}
                onClick={() => handleClick(card)}
                className="relative aspect-square rounded-2xl transition-all duration-300 transform hover:scale-105"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                  }}
                >
                  <div className="text-6xl">❓</div>
                </div>
                
                <div
                  className="absolute inset-0 rounded-2xl bg-white flex items-center justify-center shadow-lg"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="text-6xl">{card.emoji}</div>
                </div>
              </button>
            );
          })}
        </div>
        
        {gameWon && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-3xl p-12 text-center shadow-2xl animate-bounce">
              <div className="text-8xl mb-4">🎉</div>
              <div className="text-5xl font-black text-purple-600 mb-4">You Won!</div>
              <div className="text-2xl text-gray-600 mb-8">Completed in {moves} moves</div>
              <button
                onClick={initGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold py-4 px-12 rounded-full hover:scale-110 transition-transform"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
