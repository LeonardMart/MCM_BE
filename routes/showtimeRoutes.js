const express = require("express");
const router = express.Router();
const authController = require("../controller/showtimeController");

router.post("/insert", authController.createShowtime);
router.get("/all", authController.getAllShowtimes);
router.get("/showtime/:id", authController.getShowtimeById);
router.put("/update/:id", authController.updateShowtime);
router.delete("/delete/:id", authController.deleteShowtime);

module.exports = router;
