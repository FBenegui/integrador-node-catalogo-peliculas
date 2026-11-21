import { Router } from "express";
import * as controller from "./controller";
import { verificarToken } from "../../middlewares/auth";

const router = Router();

router.get("/", verificarToken, controller.getTodas);
router.get("/:id", verificarToken, controller.getPorId);
router.post("/", verificarToken, controller.crear);
router.put("/:id", verificarToken, controller.actualizar);
router.delete("/:id", verificarToken, controller.eliminar);

export default router;