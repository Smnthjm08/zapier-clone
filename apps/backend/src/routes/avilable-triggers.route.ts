import { Router } from "express";
import {
  createZap,
  deleteZap,
  getAllZaps,
  getZapById,
  updateZap,
} from "../controllers/zap.controller.js";
import {
  createAvilableTriggersController,
  deleteAvilableTriggersController,
  getAvailableTriggersController,
  updateAvilableTriggersController,
} from "../controllers/avilable-triggers.controller.js";

const avilableTriggersRoutes = Router();

avilableTriggersRoutes.get("/", getAvailableTriggersController);
avilableTriggersRoutes.post("/", createAvilableTriggersController);
avilableTriggersRoutes.put("/:zapId", updateAvilableTriggersController);
avilableTriggersRoutes.delete("/:zapId", deleteAvilableTriggersController);

export { avilableTriggersRoutes };
