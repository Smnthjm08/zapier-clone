import { Router } from "express";
import {
    createZap,
    deleteZap,
    getAllZaps,
    getZapById,
    updateZap,
} from "../controllers/zap.controller.js";

const avilableActionsRoutes = Router();

avilableActionsRoutes.get("/", getAllZaps);
avilableActionsRoutes.get("/:zapId", getZapById);
avilableActionsRoutes.post("/", createZap);
avilableActionsRoutes.put("/:zapId", updateZap);
avilableActionsRoutes.delete("/:zapId", deleteZap);

export { avilableActionsRoutes };
