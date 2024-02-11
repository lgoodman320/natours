import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userRouter from './routes/userRoutes.js';
import tourRouter from './routes/tourRoutes.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

dotenv.config({ path: './config.env' });

// ES modules don't support __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// MIDDLE WARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  
  next();
});

// Mounting the routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
export default app;
