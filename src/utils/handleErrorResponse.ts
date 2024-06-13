import { BadRequestError } from "routing-controllers";
import { Response } from 'express';

export function handleErrorResponse(res: Response, error: unknown): Response {
    if (error instanceof BadRequestError) {
        console.error(`Bad request error: ${error.message}`);
        return res.status(400).send({ error: error.message });
    } else if (error instanceof Error) {
        console.error(`Internal server error: ${error.message}`);
        return res.status(500).send({ error: 'Internal server error' });
    } else {
        console.error(`Unknown error occurred: ${error}`);
        return res.status(500).send({ error: 'Unknown error occurred' });
    }
}
