import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ColorMatch from './pages/ColorMatch';
import ShapeBuilder from './pages/ShapeBuilder';
import NumberBubbles from './pages/NumberBubbles';
import LetterHunt from './pages/LetterHunt';
import MemoryCards from './pages/MemoryCards';
import AnimalSounds from './pages/AnimalSounds';
import MathRocket from './pages/MathRocket';
import WordScramble from './pages/WordScramble';
import PatternMaker from './pages/PatternMaker';
import CountingGarden from './pages/CountingGarden';
import RhymeTime from './pages/RhymeTime';
import SizeSort from './pages/SizeSort';
import ClockLearning from './pages/ClockLearning';
import SpellingBee from './pages/SpellingBee';
import FractionPizza from './pages/FractionPizza';
import MazeRunner from './pages/MazeRunner';
import SequenceQuest from './pages/SequenceQuest';
import WeatherExplorer from './pages/WeatherExplorer';
import MoneyMath from './pages/MoneyMath';
import PlanetAdventure from './pages/PlanetAdventure';
import HomePage from './pages/Home';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/color-match" element={<ColorMatch />} />
        <Route path="/shape-builder" element={<ShapeBuilder />} />
        <Route path="/number-bubbles" element={<NumberBubbles />} />
        <Route path="/letter-hunt" element={<LetterHunt />} />
        <Route path="/memory-cards" element={<MemoryCards />} />
        <Route path="/animal-sounds" element={<AnimalSounds />} />
        <Route path="/math-rocket" element={<MathRocket />} />
        <Route path="/word-scramble" element={<WordScramble />} />
        <Route path="/pattern-maker" element={<PatternMaker />} />
        <Route path="/counting-garden" element={<CountingGarden />} />
        <Route path="/rhyme-time" element={<RhymeTime />} />
        <Route path="/size-sort" element={<SizeSort />} />
        <Route path="/clock-learning" element={<ClockLearning />} />
        <Route path="/spelling-bee" element={<SpellingBee />} />
        <Route path="/fraction-pizza" element={<FractionPizza />} />
        <Route path="/maze-runner" element={<MazeRunner />} />
        <Route path="/sequence-quest" element={<SequenceQuest />} />
        <Route path="/weather-explorer" element={<WeatherExplorer />} />
        <Route path="/money-math" element={<MoneyMath />} />
        <Route path="/planet-adventure" element={<PlanetAdventure />} />
      </Routes>
    </Router>
  );
}