import { SessionStorage } from "./Storage.model.ts";

export class Game extends SessionStorage {
  constructor() {
    super('unblockMeSolutionQueue');
  }

  generateBoard() {
    // 7: vertical block with 3 cells
    // 5: vertical block with 2  cells
    // 6: horizon block with 3 cells
    // 4 : horizon block with 2 cells

    const hardBoard = [
      1,  1,  1,  1,  1,  1,  1,  1, 
      1,  6, -6, -6,  5,  5,  5,  1,
      1,  4, -4, -1, -5, -5, -5,  1, 
      1,  2, -2, -1,  5, -1, -1,  0, 
      1,  5,  4, -4, -5,  4, -4,  1,
      1, -5, -1,  5,  4, -4,  5,  1,
      1,  4, -4, -5, -1, -1, -5,  1,
      1,  1,  1,  1,  1,  1,  1,  1
    ];
    const board = [
      1,  1,  1,  1,  1,   1,   1,  1, 
      1,  7, -1,  5,  6,  -6,  -6,  1,
      1, -7, -1, -5,  5,  -1,  -1,  1, 
      1, -7,  2, -2, -5,  -1,   7,  0, 
      1,  4, -4,  4, -4,  -1,  -7,  1,
      1, -1, -1,  4, -4,  -1,  -7,  1,
      1, -1, -1, -1, -1,  -1,  -1,  1,
      1,  1,  1,  1,  1,   1,   1,  1
    ];

    return hardBoard;
  }
}
