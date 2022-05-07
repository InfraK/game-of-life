import create from 'zustand';
import produce from 'immer';
import { subscribeWithSelector } from 'zustand/middleware';

import { Grid, getEmptyGrid, tick } from './game';

interface BearState {
  grid: Grid;
  tick: () => void;
  toggle: (x: number, y: number) => void;
  clean: () => void;
}

export const useGrid = create(subscribeWithSelector(() => ({})));

export const useGame = create(
  subscribeWithSelector<BearState>((set) => ({
    grid: getEmptyGrid(),
    toggle: (x, y) =>
      set(
        produce<BearState>((state) => {
          state.grid[x][y] = !state.grid[x][y];
        }),
      ),
    tick: () => set(({ grid }) => ({ grid: tick(grid) })),
    clean: () => set({ grid: getEmptyGrid() }),
  })),
);
