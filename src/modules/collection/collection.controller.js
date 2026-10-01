import { Router } from "express";
import * as collectionService from "./collection.service.js";

const router = Router();

router.post("/books", collectionService.createBooksCollection);
router.post("/authors", collectionService.createAuthorsCollection);
router.post("/logs/capped", collectionService.createLogsCollection);
router.post("/books/index", collectionService.createBooksIndex);

export default router;
