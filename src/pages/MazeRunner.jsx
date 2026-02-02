import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MazeRunner() {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const mazes = [
    [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ],
    [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ],
    [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ],
  ];

  const currentMaze = mazes[Math.min(level - 1, mazes.length - 1)];
  const endPos = { x: currentMaze[0].length - 2, y: currentMaze.length - 2 };

  useEffect(() => {
    setPlayerPos({ x: 1, y: 1 });
    setMoves(0);
    setGameWon(false);
  }, [level]);

  useEffect(() => {
    if (playerPos.x === endPos.x && playerPos.y === endPos.y) {
      setGameWon(true);
    }
  }, [playerPos]);

  const movePlayer = (dx, dy) => {
    if (gameWon) return;
    
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (
      newX >= 0 &&
      newX < currentMaze[0].length &&
      newY >= 0 &&
      newY < currentMaze.length &&
      currentMaze[newY][newX] === 0
    ) {
      setPlayerPos({ x: newX, y: newY });
      setMoves(moves + 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameWon) return;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
        case 's':
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPos, gameWon]);

  const nextLevel = () => {
    setLevel(level + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-purple-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">🏃 Maze Runner</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Level</div>
            <div className="text-5xl font-black text-purple-600">{level}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-gray-600 text-lg mb-2">Moves</div>
            <div className="text-5xl font-black text-pink-600">{moves}</div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="inline-grid gap-1 mx-auto">
            {currentMaze.map((row, y) => (
              <div key={y} className="flex gap-1">
                {row.map((cell, x) => {
                  const isPlayer = x === playerPos.x && y === playerPos.y;
                  const isEnd = x === endPos.x && y === endPos.y;
                  
                  return (
                    <div
                      key={x}
                      className={`w-14 h-14 rounded-lg flex items-center justify-center text-3xl font-bold transition-all ${
                        cell === 1
                          ? 'bg-gradient-to-br from-gray-700 to-gray-900'
                          : isPlayer
                          ? 'bg-gradient-to-br from-blue-400 to-blue-600 animate-pulse'
                          : isEnd
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                          : 'bg-gradient-to-br from-green-100 to-green-200'
                      }`}
                    >
                      {isPlayer && '🏃'}
                      {isEnd && '🏆'}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          <div></div>
          <button
            onClick={() => movePlayer(0, -1)}
            className="bg-white text-4xl font-bold py-4 rounded-2xl hover:scale-110 transition-transform shadow-lg"
          >
            ⬆️
          </button>
          <div></div>
          
          <button
            onClick={() => movePlayer(-1, 0)}
            className="bg-white text-4xl font-bold py-4 rounded-2xl hover:scale-110 transition-transform shadow-lg"
          >
            ⬅️
          </button>
          <button
            onClick={() => movePlayer(0, 1)}
            className="bg-white text-4xl font-bold py-4 rounded-2xl hover:scale-110 transition-transform shadow-lg"
          >
            ⬇️
          </button>
          <button
            onClick={() => movePlayer(1, 0)}
            className="bg-white text-4xl font-bold py-4 rounded-2xl hover:scale-110 transition-transform shadow-lg"
          >
            ➡️
          </button>
        </div>
        
        {gameWon && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-3xl p-12 text-center shadow-2xl animate-bounce">
              <div className="text-8xl mb-4">🏆</div>
              <div className="text-5xl font-black text-purple-600 mb-4">You Won!</div>
              <div className="text-2xl text-gray-600 mb-8">Completed in {moves} moves</div>
              <button
                onClick={nextLevel}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold py-4 px-12 rounded-full hover:scale-110 transition-transform"
              >
                Next Level →
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="text-xl text-gray-700">
            Use arrow keys or WASD to move • Reach the 🏆 to win!
          </div>
        </div>
      </div>
    </div>
  );
}
