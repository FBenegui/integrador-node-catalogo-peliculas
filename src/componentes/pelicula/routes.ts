import { Router } from "express";
import * as controller from "./controller";

const router = Router();

router.get("/", controller.getTodas);
router.get("/:id", controller.getPorId);
router.post("/", controller.crear);
router.put("/:id", controller.actualizar);
router.delete("/:id", controller.eliminar);

export default router;