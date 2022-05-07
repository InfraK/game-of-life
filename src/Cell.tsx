import { useEffect } from "react";
import { a, useSpring } from "react-spring";
import { useGame } from "./useGame";

interface CellProps {
  row: number;
  column: number;
}

export const Cell = ({ row, column }: CellProps) => {
  const [styles, api] = useSpring(() => ({
    to: {
      backgroundColor: useGame.getState().grid[row][column] ? "black" : "white",
    },
    config: {
      duration: 100,
    },
  }));

  const toggle = useGame((state) => state.toggle);

  useEffect(() => {
    useGame.subscribe(
      (state) => state.grid[row][column],
      (val) => {
        api.start({ backgroundColor: val ? "black" : "white" });
      }
    );
  }, [row, column]);

  return (
    <a.div
      className="cell"
      style={styles}
      onClick={() => toggle(row, column)}
    />
  );
};
