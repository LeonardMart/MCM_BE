const handleAsync = require("../middleware/handle-async");
const apiResponse = require("../utils/api-responses");
const db = require("../models");
const ticketValidator = require("../validators/ticketValidator");
const moment = require("moment");

const Ticket = db.ticket;
const Showtime = db.showtime;
const Film = db.film;
const Studio = db.studio;

const dateNow = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
};

const createTicket = handleAsync(async (req, res) => {
  try {
    const validation = ticketValidator(req.body);
    if (validation.fails()) {
      return res.status(400).json({ errors: validation.errors.all() });
    }
    const { seatRow, seatNumber, showtimeId } = req.body;

    const existingTicket = await Ticket.findOne({
      where: {
        showtimeId,
        seatRow,
        seatNumber,
      },
    });

    if (existingTicket) {
      return res.status(400).json({ error: "This seat is already booked" });
    }

    const showtime = await Showtime.findOne({
      where: { id: showtimeId },
      include: [
        {
          model: Film,
          as: "film",
          include: [
            {
              model: Studio,
              as: "studio",
            },
          ],
        },
      ],
    });

    if (!showtime) {
      return res.status(404).json({ error: "Showtime not found" });
    }

    const studio = showtime.film.studio;

    const ticketCount = await Ticket.count({
      where: { showtimeId },
    });

    if (ticketCount >= studio.capacity) {
      return res.status(400).json({ error: "No capacity left in the studio" });
    }

    const ticket = await Ticket.create({
      seatRow,
      seatNumber,
      showtimeId,
    });

    res.json(
      apiResponse({
        data: ticket,
        status: 1,
        message: "Ticket created successfully",
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllTickets = handleAsync(async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: Showtime,
          as: "showtime",
          include: [
            {
              model: Film,
              as: "film",
              include: [
                {
                  model: Studio,
                  as: "studio",
                },
              ],
            },
          ],
        },
      ],
    });
    res.json(apiResponse({ data: tickets, status: 1, message:"Successfully retrieved all tickets" }));
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tickets" });
  }
});

const getTicketById = handleAsync(async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id, {
      include: [
        {
          model: Showtime,
          as: "showtime",
          include: [
            {
              model: Film,
              as: "film",
              include: [
                {
                  model: Studio,
                  as: "studio",
                },
              ],
            },
          ],
        },
      ],
    });
    if (ticket) {
      res.json(apiResponse({ data: ticket, status: 1, message: "Successfully retrieved ticket"}));
    } else {
      res.status(404).json({ error: "Ticket not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to retrieve ticket" });
  }
});

const updateTicket = handleAsync(async (req, res) => {
  try {
    const { seatRow, seatNumber, price, showtimeId } = req.body;
    const ticket = await Ticket.findByPk(req.params.id);
    if (ticket) {
      await ticket.update({ seatRow, seatNumber, price, showtimeId });
      res.json(apiResponse({
        data: ticket,
        status: 1,
        message: "Ticket updated successfully",
      }));
    } else {
      res.status(404).json({ error: "Ticket not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update ticket" });
  }
});

const deleteTicket = handleAsync(async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (ticket) {
      await ticket.destroy();
      res.json(apiResponse({ status: 1, message: "Ticket deleted successfully" }));
    } else {
      res.status(404).json({error: "Ticket not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete ticket"});
  }
});

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
