import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './src/routes/routes.js';
import { errorMiddleware } from './src/middlewares/error-handler.middleware.js';

const app = express();

process.env.TZ = "Europe/Greenwich";

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

routes(app);
app.use(errorMiddleware);

app.use('*', (_req, res) => {
  res.status(404).json({ error: 'Route not Found' });
});

export default app;
