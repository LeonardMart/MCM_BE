const handleAsync = require("../middleware/handle-async");
const apiResponse = require("../utils/api-responses");
const db = require("../models");
const moment = require("moment");
const studioValidator = require("../validators/studioValidator");

const dateNow = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
};

const Studio = db.studio;
const Film = db.film;
const Showtime = db.showtime;
const Ticket = db.ticket;

const insertNewStudio = handleAsync(async (req, res) => {
  try {
    const validation = studioValidator(req.body);
    if (validation.fails()) {
      return res.status(400).json({ errors: validation.errors.all() });
    }

    const { name, capacity } = req.body;

    const existingStudio = await Studio.findOne({ where: { name } });
    if (existingStudio) {
      return res.status(400).json({ error: "This studio already exists" });
    }

    const studio = await Studio.create({
      name,
      capacity,
      createdAt: dateNow(),
      updatedAt: dateNow(),
    });

    res.json(
      apiResponse({
        data: studio,
        status: 1,
        message: "Insert new studio successful",
      })
    );
  } catch (error) {
    console.error("Error inserting new studio:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getStudioById = handleAsync(async (req, res) => {
  try {
    const studio = await Studio.findByPk(req.params.id, {
      include: [
        {
          model: Film,
          as: "films",
          include: [
            {
              model: Showtime,
              as: "showtimes",
              include: [{ model: Ticket, as: "tickets" }],
            },
          ],
        },
      ],
    });

    if (!studio) {
      return res.status(404).json({ error: "Studio not found" });
    }

    res.json(
      apiResponse({
        data: studio,
        status: 1,
        message: "Retrieve Studio by Id Success",
      })
    );
  } catch (error) {
    console.error("Error retrieving studio by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllStudios = handleAsync(async (req, res) => {
  try {
    const studios = await Studio.findAll({
      include: [
        {
          model: Film,
          as: "films",
          include: [
            {
              model: Showtime,
              as: "showtimes",
              include: [{ model: Ticket, as: "tickets" }],
            },
          ],
        },
      ],
    });

    res.json(
      apiResponse({
        data: studios,
        status: 1,
        message: "Retrieve All Studios Success",
      })
    );
  } catch (error) {
    console.error("Error retrieving all studios:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const updateStudio = handleAsync(async (req, res) => {
  try {
    const validation = studioValidator(req.body);
    if (validation.fails()) {
      return res.status(400).json({ errors: validation.errors.all() });
    }

    const { name, capacity } = req.body;
    const id = req.params.id;

    const studio = await Studio.findByPk(id);
    if (!studio) {
      return res.status(404).json({ error: "Studio not found" });
    }

    const existingStudio = await Studio.findOne({
      where: {
        name,
        id: { [db.Sequelize.Op.ne]: id },
      },
    });

    if (existingStudio) {
      return res
        .status(400)
        .json({ error: "This studio name is already in use" });
    }

    const updatedStudioData = {
      name: name,
      capacity: capacity,
      updatedAt: dateNow(),
    };

    console.log("anjay");
    const updatedStudio = Studio.update(updatedStudioData, { where: { id } });
    res.json(
      apiResponse({
        data: updatedStudio,
        status: 1,
        message: "Update studio successful",
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to update Studio" });
  }
});

const deleteStudio = handleAsync(async (req, res) => {
  try {
    const studio = await Studio.findByPk(req.params.id);

    if (!studio) {
      return res.status(404).json({ error: "Studio not found" });
    }

    await studio.destroy();

    res.json(
      apiResponse({
        status: 1,
        message: "Studio deleted successfully",
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to delete studio" });
  }
});

module.exports = {
  insertNewStudio,
  getStudioById,
  getAllStudios,
  updateStudio,
  deleteStudio,
};
