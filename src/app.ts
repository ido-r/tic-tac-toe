import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { GameController } from './controllers/gameController';
import { initializeWebSocket } from './websocket';

const app = createExpressServer({
  controllers: [GameController],
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

initializeWebSocket(server);
