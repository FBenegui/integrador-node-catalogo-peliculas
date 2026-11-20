import { Router } from "express";
import * as controller from "./controller";

const router = Router();

router.post("/register", controller.registrar);
router.post("/login", controller.login);

export default router;