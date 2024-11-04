const handleAsync = require("../middleware/handle-async");
const apiResponse = require("../utils/api-responses");
const db = require("../models");
const moment = require("moment");
const filmValidator = require("../validators/filmValidator");

const dateNow = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
};

const Studio = db.studio;
const Film = db.film;
const Showtime = db.showtime;
const Ticket = db.ticket;

const createFilm = handleAsync(async (req, res) => {
  try {
    const validation = filmValidator(req.body);
    if (validation.fails()) {
      return res.status(400).json({
        status: 0,
        message: "Validation error",
        errors: validation.errors.all(),
      });
    }

    const existingFilm = await Film.findOne({
      where: { title: req.body.title },
    });
    if (existingFilm) {
      return res.status(409).json({
        status: 0,
        message: "A film with this title already exists.",
      });
    }

    const filmData = {
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      duration: req.body.duration,
      studioId: req.body.studioId,
      createdAt: dateNow(),
      updatedAt: dateNow(),
    };

    const film = await Film.create(filmData);
    res.json(
      apiResponse({
        data: film,
        status: 1,
        message: "Insert new film successful",
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllFilms = handleAsync(async (req, res) => {
  try {
    const films = await Film.findAll({
      include: [
        {
          model: Studio,
          as: "studio",
        },
        {
          model: Showtime,
          as: "showtimes",
          include: [
            {
              model: Ticket,
              as: "tickets",
            },
          ],
        },
      ],
    });
    res.json(
      apiResponse({
        data: films,
        status: 1,
        message: "Successfully retrieved all film titles",
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve films" });
  }
});

const getFilmById = handleAsync(async (req, res) => {
  try {
    const film = await Film.findByPk(req.params.id, {
      include: [
        {
          model: Studio,
          as: "studio",
        },
        {
          model: Showtime,
          as: "showtimes",
          include: [
            {
              model: Ticket,
              as: "tickets",
            },
          ],
        },
      ],
    });

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    res.json(
      apiResponse({
        data: film,
        status: 1,
        message: "Successfully retrieved film",
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve film" });
  }
});

const updateFilm = handleAsync(async (req, res) => {
  try {
    const validation = filmValidator(req.body);
    if (validation.fails()) {
      return res.status(400).json({
        status: 0,
        message: "Validation error",
        errors: validation.errors.all(),
      });
    }

    const { title, description, genre, duration } = req.body;
    const id = req.params.id;
    const film = await Film.findByPk(id);
    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    const updatedFilmData = {
      title: title,
      description: description,
      genre: genre,
      duration: duration,
      updatedAt: dateNow(),
    };
    const updatedFilm = await Film.update(updatedFilmData, { where: { id } });

    res.json(
      apiResponse({
        data: updatedFilm,
        status: 1,
        message: "Film updated successfully",
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to update film" });
  }
});

const deleteFilm = handleAsync(async (req, res) => {
  try {
    const film = await Film.findByPk(req.params.id);
    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }
    await film.destroy();
    res.json(
      apiResponse({
        status: 1,
        message: "Film deleted successfully",
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to delete film" });
  }
});

module.exports = {
  createFilm,
  getAllFilms,
  getFilmById,
  updateFilm,
  deleteFilm,
};
