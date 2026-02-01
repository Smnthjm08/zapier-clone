import { Router } from "express";
import {
  createAvilableActionsController,
  deleteAvilableActionsController,
  getAvailableActionsController,
  updateAvilableActionsController,
} from "../controllers/avilable-actions.conroller.js";

const avilableActionsRoutes = Router();

avilableActionsRoutes.get("/", getAvailableActionsController);
avilableActionsRoutes.post("/", createAvilableActionsController);
avilableActionsRoutes.put("/:zapId", updateAvilableActionsController);
avilableActionsRoutes.delete("/:zapId", deleteAvilableActionsController);

export { avilableActionsRoutes };
