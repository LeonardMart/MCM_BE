const Validator = require("validatorjs");

const showtimeValidator = (data) => {
  const rules = {
    filmId: "required|integer|min:1",
    time: "required|date",
  };

  const messages = {
    "required.filmId": "Film ID is required.",
    "integer.filmId": "Film ID must be a valid integer.",
    "required.time": "Time is required.",
    "date.time": "Time must be a valid date.",
  };

  const validation = new Validator(data, rules, messages);
  return validation;
};

module.exports = showtimeValidator;
