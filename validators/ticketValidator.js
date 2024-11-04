// validators/ticketValidator.js
const Validator = require('validatorjs');

const ticketValidator = (data) => {
  const rules = {
    seatRow: 'required|regex:/^[A-Z]+$/',
    seatNumber: 'required|integer|min:1',
    showtimeId: 'required|integer',
  };

  const messages = {
    "required.seatRow": "Seat row is required.",
    "regex.seatRow": "Seat row must be a letter from A-Z.",
    "required.seatNumber": "Seat number is required.",
    "integer.seatNumber": "Seat number must be an integer.",
    "required.showtimeId": "Showtime ID is required.",
    "integer.showtimeId": "Showtime ID must be an integer.",
  };

  const validation = new Validator(data, rules, messages);
  return validation;
};

module.exports = ticketValidator;
