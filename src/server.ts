import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";

const port = 3000;

import { router } from "./routes"

import "./database";


const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error!"
    })
})

app.listen(port, () => console.log(`server is ranning on port ${port}`))