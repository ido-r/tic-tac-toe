export type GameState = {
    board: (string | null)[];
    currentPlayer: string;
    gameOver: boolean;
    winner: string | null;
};
  