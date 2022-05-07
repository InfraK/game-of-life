export const tick = (grid: Grid): Grid => {
  const updatedGrid = grid.map((row, rowIndex) =>
    row.map((val, index) => {
      const neighboringRows = getNeighbors(grid, rowIndex);
      const sameRowNeighbors = getNeighbors(row, index);

      const getTopBottomNeighbors = neighboringRows
        .map((row) => row?.slice(index - 1, index + 2) ?? [])
        .flat();

      const allNeighbors = [...getTopBottomNeighbors, ...sameRowNeighbors];

      const aliveNeighbors = allNeighbors.reduce(
        (aliveCount, neighbor) => (neighbor ? aliveCount + 1 : aliveCount),
        0
      );
      if (!val && aliveNeighbors === 3) {
        return true;
      }
      if (val && aliveNeighbors > 1 && aliveNeighbors < 4) {
        return true;
      }
      return false;
    })
  );
  return updatedGrid;
};

const getNeighbors = <T extends unknown>(arr: T[], index: number) => [
  arr[index - 1],
  arr[index + 1],
];

export type Grid = Boolean[][];

const width = window.innerWidth;
const height = window.innerHeight;

export const gridRows = Math.floor(width / 10);
export const gridHeight = Math.floor(height / 10);

export const getEmptyGrid = (): Grid =>
  Array.from({ length: gridHeight }).map(() =>
    Array.from({ length: gridRows }).map(() => {
      return false;
    })
  );
