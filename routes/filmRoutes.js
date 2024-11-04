const express = require("express");
const router = express.Router();
const authController = require("../controller/filmController");

router.post("/insert", authController.createFilm)
router.get("/all", authController.getAllFilms);
router.get('/film/:id', authController.getFilmById);
router.put('/update/:id', authController.updateFilm);
router.delete('/delete/:id', authController.deleteFilm);

module.exports = router