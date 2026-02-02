import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShapeBuilder() {
  const shapes = [
    { id: 1, type: 'circle', color: '#EF4444', size: 80 },
    { id: 2, type: 'square', color: '#3B82F6', size: 80 },
    { id: 3, type: 'triangle', color: '#10B981', size: 80 },
    { id: 4, type: 'circle', color: '#FBBF24', size: 60 },
    { id: 5, type: 'square', color: '#A855F7', size: 60 },
    { id: 6, type: 'triangle', color: '#F97316', size: 60 },
  ];

  const [canvas, setCanvas] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);

  const addToCanvas = (shape) => {
    if (selectedShape) {
      setCanvas([...canvas, {
        ...selectedShape,
        id: Date.now(),
        x: Math.random() * 400,
        y: Math.random() * 300,
      }]);
    }
  };

  const clearCanvas = () => {
    setCanvas([]);
  };

  const renderShape = (shape, index) => {
    const style = {
      position: 'absolute',
      left: `${shape.x}px`,
      top: `${shape.y}px`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      backgroundColor: shape.type === 'circle' || shape.type === 'square' ? shape.color : 'transparent',
      borderRadius: shape.type === 'circle' ? '50%' : '0',
    };

    if (shape.type === 'triangle') {
      return (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${shape.x}px`,
            top: `${shape.y}px`,
            width: 0,
            height: 0,
            borderLeft: `${shape.size / 2}px solid transparent`,
            borderRight: `${shape.size / 2}px solid transparent`,
            borderBottom: `${shape.size}px solid ${shape.color}`,
          }}
        />
      );
    }

    return <div key={index} style={style} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 to-blue-500 p-8">
      <Link to="/" className="inline-block mb-6 px-6 py-3 bg-white rounded-full font-bold text-blue-600 hover:scale-105 transition-transform">
        ← Back Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-white mb-8 text-center drop-shadow-lg">🔷 Shape Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white rounded-3xl p-6 shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Choose Shapes</h2>
            <div className="grid grid-cols-2 gap-4">
              {shapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => setSelectedShape(shape)}
                  className={`p-6 rounded-2xl border-4 transition-all hover:scale-105 ${
                    selectedShape?.id === shape.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-center h-20">
                    {shape.type === 'circle' && (
                      <div
                        className="rounded-full"
                        style={{ width: shape.size, height: shape.size, backgroundColor: shape.color }}
                      />
                    )}
                    {shape.type === 'square' && (
                      <div
                        style={{ width: shape.size, height: shape.size, backgroundColor: shape.color }}
                      />
                    )}
                    {shape.type === 'triangle' && (
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: `${shape.size / 2}px solid transparent`,
                          borderRight: `${shape.size / 2}px solid transparent`,
                          borderBottom: `${shape.size}px solid ${shape.color}`,
                        }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <button
              onClick={clearCanvas}
              className="w-full mt-6 bg-red-500 text-white text-xl font-bold py-4 rounded-2xl hover:bg-red-600 transition-colors"
            >
              Clear All
            </button>
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Your Canvas</h2>
            <div
              onClick={addToCanvas}
              className="relative bg-gradient-to-br from-yellow-50 to-pink-50 rounded-2xl h-96 border-4 border-dashed border-blue-300 cursor-pointer hover:border-blue-500 transition-colors overflow-hidden"
            >
              {canvas.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-2xl font-bold">
                  Click to add shapes!
                </div>
              )}
              {canvas.map((shape, idx) => renderShape(shape, idx))}
            </div>
            <p className="text-center text-gray-600 mt-4 text-lg">
              Shapes placed: {canvas.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
