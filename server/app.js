// app.js
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import authRouter from "./routes/auth";
import filesRouter from "./routes/files";
import cors from "cors";

import connectToDatabase from "./db";

import authenticateToken from "./helpers/jwt";

const app = express();

connectToDatabase();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/", indexRouter);
app.use("/auth", authRouter); //不需要验证token
app.use("/files", filesRouter);

app.use(authenticateToken);

//below是需要验证token，被保护的router，没有token无法访问

app.use("/users", usersRouter);
app.use("/posts", postsRouter);


export default app;
