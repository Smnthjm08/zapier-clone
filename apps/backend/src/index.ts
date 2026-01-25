import { auth } from "@repo/auth/server";
import { toNodeHandler } from "better-auth/node";
import express, { Router } from "express";
import cors from "cors";
import authMiddleware from "./middlewares/auth.middleware.js";
import chalk from "chalk";

const app = express();
const PORT = process.env.BE_PORT || 3004;

app.use(express.json());

app.use(
  cors({
    origin: process.env.BETTER_AUTH_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/", (_, res) => {
  res.json({ message: "Hello World!" });
});

const v1Router = Router();

v1Router.use("/auth", toNodeHandler(auth));

v1Router.get("/", (_, res) => {
  res.json({ message: "this is the root of the v1 api", status: "healthy!" });
});

v1Router.get("/me", authMiddleware, (req, res) => {
  res.json({ message: "this is the me endpoint", user: req.user });
});

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(chalk.yellowBright(`Server is running on PORT ${PORT}`));
});
