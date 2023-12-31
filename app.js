import express from 'express';
import 'dotenv/config';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES modules don't support __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app  = express();


// MIDDLE WARES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('Hello from the middleware 👋🏾');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// Mounting the routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;