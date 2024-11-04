const Validator = require('validatorjs');

const filmValidator = (data) => {
  const rules = {
    title: 'required|string|min:3',
    description: 'required|string|min:10',
    genre: 'required|string',
    studioId: 'required|integer|min:1',
    duration: 'required|integer|min:1',
  };

  const messages = {
    "required.title": "Film title is required.",
    "string.title": "Film title must be a string.",
    "min.title": "Film title must be at least 3 characters long.",
    "required.description": "Film description is required.",
    "string.description": "Film description must be a string.",
    "min.description": "Film description must be at least 10 characters long.",
    "required.genre": "Genre is required.",
    "string.genre": "Genre must be a string.",
    "required.studioId": "StudioId is required",
    "integer.studioId": "StudioId must be an integer",
    "min.studioId": "StudioId must be at least 1.",
    "required.duration": "Duration is required.",
    "integer.duration": "Duration must be an integer.",
    "min.duration": "Duration must be at least 1.",
  };

  const validation = new Validator(data, rules, messages);
  return validation;
};

module.exports = filmValidator;
