import { Router } from "express";
import * as logService from "./log.service.js";

const router = Router();

router.post("/", logService.addLog);

export default router;
