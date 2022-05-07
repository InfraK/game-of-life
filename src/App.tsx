import { useEffect, useRef, useState } from 'react';
import { gridHeight, gridRows } from './game';
import { useGame } from './useGame';
import { Cell } from './Cell';
import './styles.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const tick = useGame((state) => state.tick);
  const clean = useGame((state) => state.clean);
  const timer = useRef<number>();

  useEffect(() => {
    if (isPlaying) {
      timer.current = setInterval(tick, 500);
    } else {
      clearInterval(timer.current);
    }

    return () => clearInterval(timer.current);
  }, [tick, isPlaying]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  return (
    <div className="flex-col">
      {Array.from({ length: gridHeight }).map((_, rowIndex) => {
        return (
          <div key={`Row-${rowIndex}`} className="flex">
            {Array.from({ length: gridRows }).map((_, index) => (
              <Cell key={`Cell-${rowIndex}-${index}`} column={index} row={rowIndex} />
            ))}
          </div>
        );
      })}
      <div className="ui-container">
        <div className="ui-menu">
          <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Play'}</button>
          <button onClick={clean}>Clean board</button>
          <span>{gridHeight * gridRows} cells</span>
        </div>
        <div>
          <p>Give or take away the life of the cells by clicking them.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
