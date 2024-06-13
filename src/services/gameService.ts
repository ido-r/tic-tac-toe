import { BadRequestError } from 'routing-controllers';
import { GameState } from '../types';

class GameService {
    private gameState?: GameState;
    private readonly drawWinnerName: string = 'Draw';
    private initialized: boolean = false;

    getGameState(): GameState {
        if (!this.gameState) {
            throw new BadRequestError('Game board does not exist. Initialize a new game first.');
        }
        return this.gameState;
    }

    makeMove(index: number): GameState {
        if (!this.initialized) {
            throw new BadRequestError('Game board is not initialized. Call POST /tic-tac-toe endpoint first.');
        }

        if (!this.gameState) {
            throw new BadRequestError('Game board does not exist. Initialize a new game first.');
        }

        if (this.gameState.gameOver) {
            console.log('Game is already over');
            throw new BadRequestError('Game is already over!');
        }

        if (this.gameState.board[index - 1] != null) {
            console.log(`The index ${index} is already taken!`);
            throw new BadRequestError('Spot is already taken');
        }

        this.gameState.board[index - 1] = this.gameState.currentPlayer;
        this.gameState.currentPlayer = this.gameState.currentPlayer === 'X' ? 'O' : 'X';
        this.checkWinCondition();

        return this.gameState;
    }

    initGame(): GameState {
        if (this.initialized) {
            console.log('Resetting game state');
            this.gameState = {
                board: Array(9).fill(null),
                currentPlayer: 'X',
                gameOver: false,
                winner: null,
            };
        } else {
            console.log('Initializing game state');
            this.gameState = {
                board: Array(9).fill(null),
                currentPlayer: 'X',
                gameOver: false,
                winner: null,
            };
            this.initialized = true;
        }
        
        return this.gameState;
    }

    private checkWinCondition(): void {
        if (!this.gameState) {
            throw new Error('Game board does not exist.');
        }

        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.gameState.board[a] && this.gameState.board[a] === this.gameState.board[b] && this.gameState.board[a] === this.gameState.board[c]) {
                this.setGameWinner(this.gameState.board[a]!);
                return;
            }
        }

        if (!this.gameState.board.includes(null)) {
            this.setGameWinner(this.drawWinnerName);
        }
    }

    private setGameWinner(winner: string): void {
        console.log(`And the winner is......... ${winner}!!!`);

        if (!this.gameState) {
            throw new Error('Game board does not exist.');
        }

        this.gameState.gameOver = true;
        this.gameState.winner = winner;
    }
}

export default GameService;
