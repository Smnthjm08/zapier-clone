import { auth } from "@repo/auth/server";
import { fromNodeHeaders } from "better-auth/node";
import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = session?.user;
        // req.session = session?.session; if needed later
        next();
    } catch (error) {
        console.log(chalk.redBright("Error authenticating user", error));
        return res.status(500).json({ error: "Internal Server Error" });
    }
}