import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

dotenv.config();

const app = express();

app.get('/', (req: Request, res: Response) => { res.send({ message: "Server status is Ok 👍" }); });

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! Continuing...');
    console.error(err);
});

process.on('unhandledRejection', (err: any) => {
    console.error('UNHANDLED REJECTION! Continuing...');
    console.error(err);
    app.use((req, res, next) => {
        next(err);
    });
});