import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import express from 'express';

import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
import morgan from 'morgan';

const app  = express();

// MIDDLE WARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

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