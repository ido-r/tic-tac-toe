import { JsonController, Get, Post, Body, HttpCode, OnUndefined, BadRequestError, Res, Put } from 'routing-controllers';
import { Response } from 'express';
import GameService from '../services/gameService';
import { isValidIndex } from '../utils/validator';
import { handleErrorResponse } from '../utils/handleErrorResponse';

@JsonController('/tic-tac-toe')
export class GameController {
    private gameService: GameService;

    constructor() {
        this.gameService = new GameService();
    }

    @HttpCode(200)
    @OnUndefined(404)
    @Post('')
    initGame(@Res() res: Response) {
        try {
            const gameState = this.gameService.initGame();
            console.log(`Game initialized:`, gameState);
            return res.status(200).send(gameState);
        } catch (error) {
            return handleErrorResponse(res, error);
        }
    }

    @HttpCode(200)
    @OnUndefined(404)
    @Get('')
    getGameState(@Res() res: Response) {
        try {
            const gameState = this.gameService.getGameState();
            console.log(`Game state fetched:`, gameState);
            return res.status(200).send(gameState);
        } catch (error) {
            return handleErrorResponse(res, error);
        }
    }

    @HttpCode(200)
    @OnUndefined(404)
    @Put('')
    async makeMove(@Res() res: Response, @Body() body: { index: number }) {
        const { index } = body;

        try {
            if (!isValidIndex(index)) {
                throw new BadRequestError('Invalid index provided');
            }

            const updatedGameState = this.gameService.makeMove(index);
            console.log(`Updated game state after move:`, updatedGameState);
            return res.status(200).send(updatedGameState);
        } catch (error) {
            return handleErrorResponse(res, error);
        }
    }
}
