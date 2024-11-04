const express = require("express");
const router = express.Router();
const authController = require("../controller/ticketController");

router.post("/insert", authController.createTicket);
router.get("/all", authController.getAllTickets);
router.get("/ticket/:id", authController.getTicketById);
router.put("/update/:id", authController.updateTicket);
router.delete("/delete/:id", authController.deleteTicket);

module.exports = router;
