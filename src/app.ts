import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { GameController } from './controllers/gameController';

const app = createExpressServer({
  controllers: [GameController],
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
