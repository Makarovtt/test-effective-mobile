import express from "express";
import cors from "cors";
import path from "path";
import authRouter from "./modules/auth/auth.router";
import usersRouter from "./modules/users/users.router";
import {errorHandler} from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "..", "frontend")));
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use(errorHandler);

export default app;
