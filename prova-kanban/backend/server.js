import express from 'express'

import swaggerUi from 'swagger-ui-express'
import cookieParser from 'cookie-parser'
import { createRequire } from "module";
import tarefaRouter from './routes/tarefaRoute.js'
import usuarioRouter from './routes/usuarioRoute.js'
import authRouter from './routes/authRoute.js'
import cors from 'cors';
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson))

app.use("/auth", authRouter);
app.use("/tarefas", tarefaRouter);
app.use("/usuarios", usuarioRouter);

app.listen(5000, function() {
    console.log("servidor web em funcionamento!");
});
