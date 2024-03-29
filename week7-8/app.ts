import * as dotenv from 'dotenv'
dotenv.config({path:'./.env'})
import express = require('express');
import {NextFunction, Request, Response} from "express";
import AppError from "./utilities/appError";
import globalErrorHandler from './middlewares/globalErrorHandler';
import morgan from "morgan";
import carRouter from "./routes/carRoute";

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log('Development mode...')
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req:Request, res:Response, next:NextFunction) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use('/api/v1/cars',carRouter);

app.all('*', (req:Request, res:Response, next:NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler);

export default app;