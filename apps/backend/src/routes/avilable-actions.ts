import { Router } from "express";
import {
  createZap,
  deleteZap,
  getAllZaps,
  getZapById,
  updateZap,
} from "../controllers/zap.controller.js";
import {
  createAvilableActionsController,
  deleteAvilableActionsController,
  getAvailableActionsController,
  updateAvilableActionsController,
} from "../controllers/avilable-actions.conroller.js";

const avilableActionsRoutes = Router();

avilableActionsRoutes.get("/", getAvailableActionsController);
avilableActionsRoutes.get("/:zapId", getZapById);
avilableActionsRoutes.post("/", createAvilableActionsController);
avilableActionsRoutes.put("/:zapId", updateAvilableActionsController);
avilableActionsRoutes.delete("/:zapId", deleteAvilableActionsController);

export { avilableActionsRoutes };
