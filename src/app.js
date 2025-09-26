import express, { json, urlencoded } from 'express';

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import apiRouter from './routes/api.route.js';



const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api", apiRouter);

export default app;