const express = require("express");
const router = express.Router();
const authController = require("../controller/studioController");

router.post("/insert", authController.insertNewStudio)
router.get("/all", authController.getAllStudios)
router.get("/studio/:id", authController.getStudioById)
router.put("/update/:id", authController.updateStudio)
router.delete("/delete/:id", authController.deleteStudio)

module.exports = router