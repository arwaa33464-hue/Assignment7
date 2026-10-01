import { Router } from "express";
import * as bookService from "./book.service.js";

const router = Router();

router.post("/", bookService.addBook);
router.post("/batch", bookService.addManyBooks);
router.patch("/:title", bookService.updateBookYear);
router.get("/title", bookService.findBookByTitle);
router.get("/year", bookService.findBooksBetweenYears);
router.get("/genre", bookService.findBooksByGenre);
router.get("/skip-limit", bookService.skipAndLimitBooks);
router.get("/year-integer", bookService.findBooksWithIntegerYear);
router.get("/exclude-genres", bookService.excludeGenres);
router.delete("/before-year", bookService.deleteBooksBeforeYear);
router.get("/aggregate1", bookService.aggregate1);
router.get("/aggregate2", bookService.aggregate2);
router.get("/aggregate3", bookService.aggregate3);
router.get("/aggregate4", bookService.aggregate4);

export default router;
