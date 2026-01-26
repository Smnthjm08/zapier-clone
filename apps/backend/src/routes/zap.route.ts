import { Router } from "express";
import {
  createZap,
  deleteZap,
  getAllZaps,
  getZapById,
  updateZap,
} from "../controllers/zap.controller.js";

const zapRoutes = Router();

zapRoutes.get("/", getAllZaps);
zapRoutes.get("/:zapId", getZapById);
zapRoutes.post("/", createZap);
zapRoutes.put("/:zapId", updateZap);
zapRoutes.delete("/:zapId", deleteZap);

export { zapRoutes };
