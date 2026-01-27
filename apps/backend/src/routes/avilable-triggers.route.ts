import { Router } from "express";
import {
    createZap,
    deleteZap,
    getAllZaps,
    getZapById,
    updateZap,
} from "../controllers/zap.controller.js";

const avilableTriggersRoutes = Router();

avilableTriggersRoutes.get("/", getAllZaps);
avilableTriggersRoutes.get("/:zapId", getZapById);
avilableTriggersRoutes.post("/", createZap);
avilableTriggersRoutes.put("/:zapId", updateZap);
avilableTriggersRoutes.delete("/:zapId", deleteZap);

export { avilableTriggersRoutes };
