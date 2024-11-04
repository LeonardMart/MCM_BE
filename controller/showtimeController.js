const handleAsync = require("../middleware/handle-async");
const apiResponse = require("../utils/api-responses");
const db = require("../models");
const moment = require("moment");
const showtimeValidator = require("../validators/showtimeValidator");

const Showtime = db.showtime;
const Ticket = db.ticket;
const Film = db.film;
const Studio = db.studio;

const dateNow = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
};

const createShowtime = handleAsync(async (req, res) => {
  try {
    const validation = showtimeValidator(req.body);
    if (validation.fails()) {
      return res.status(400).json({
        status: 0,
        message: "Validation error",
        errors: validation.errors.all(),
      });
    }
    const { filmId, time } = req.body;
    const info = {
      time: time,
      filmId: filmId,
      createdAt: dateNow(),
      updatedAt: dateNow(),
    };
    const assignFilm = await Showtime.create(info);
    if (assignFilm) {
      res.json(
        apiResponse({
          data: assignFilm,
          status: 1,
          message: "insert new showtime successful",
        })
      );
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllShowtimes = handleAsync(async (req, res) => {
  try {
    const showtimes = await Showtime.findAll({
      include: [
        {
          model: Ticket,
          as: "tickets",
        },
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
    res.json(
      apiResponse({
        status: 1,
        message: "Successfully retrieved all showtimes",
        data: showtimes,
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve showtimes" });
  }
});

const getShowtimeById = handleAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const showtime = await Showtime.findByPk(id, {
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
        {
          model: Ticket,
          as: "tickets",
        },
      ],
    });
    if (!showtime) {
      return res.status(404).json(
        apiResponse({
          status: 0,
          message: "Showtime not found",
        })
      );
    }
    res.json(
      apiResponse({
        status: 1,
        message: "Showtime retrieved successfully",
        data: showtime,
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch showtime" });
  }
});

const updateShowtime = handleAsync(async (req, res) => {
  try {
    const validation = showtimeValidator(req.body);
    if (validation.fails()) {
      return res.status(400).json({
        status: 0,
        message: "Validation error",
        errors: validation.errors.all(),
      });
    }

    const { id } = req.params;
    const { filmId, time } = req.body;
    const showtime = await Showtime.findByPk(id);
    if (!showtime) {
      return res.status(404).json({ error: "showtime not found" });
    }
    const updatedShowtimeData = {
      filmId,
      time,
      updatedAt: dateNow(),
    };
    const updatedShowtime = await Showtime.update(updatedShowtimeData, {
      where: { id },
    });

    res.json(
      apiResponse({
        status: 1,
        message: "Showtime updated successfully",
        data: updatedShowtime,
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to update showtime" });
  }
});

const deleteShowtime = handleAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const showtime = await Showtime.findByPk(id);
    if (!showtime) {
      return res.status(404).json({ error: "showtime not found" });
    }

    await showtime.destroy();

    res.json(
      apiResponse({
        status: 1,
        message: "Showtime deleted successfully",
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to delete showtime" });
  }
});

module.exports = {
  createShowtime,
  getAllShowtimes,
  getShowtimeById,
  updateShowtime,
  deleteShowtime,
};
