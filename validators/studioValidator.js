const Validator = require('validatorjs');

const studioValidator = (data) => {
  const rules = {
    name: 'required|string|min:3',
    capacity: 'required|integer|min:1',
  };

  const messages = {
    "required.name": "Studio name is required.",
    "string.name": "Studio name must be a string.",
    "min.name": "Studio name must be at least 3 characters long.",
    "required.capacity": "Capacity is required.",
    "integer.capacity": "Capacity must be an integer.",
    "min.capacity": "Capacity must be at least 1.",
  };

  const validation = new Validator(data, rules, messages);
  return validation;
};

module.exports = studioValidator;
