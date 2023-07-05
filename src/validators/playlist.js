const { check } = require("express-validator");
const validationResults = require("../utils/handleValidators");

const validatorCreatePlaylist = [
  check("title")
    .exists()
    .withMessage("This field is required")
    .notEmpty()
    .withMessage("This field cannot be blank")
    .isLength({ max: 50 })
    .withMessage("The maximum length is 50 characters."),
  check("message")
    .exists()
    .withMessage("This field is required")
    .notEmpty()
    .withMessage("This field cannot be blank")
    .isLength({ max: 200 })
    .withMessage("The maximum length is 200 characters."),
  check("from")
    .exists()
    .withMessage("This field is required")
    .notEmpty()
    .withMessage("This field cannot be blank")
    .isLength({ max: 50 })
    .withMessage("The maximum length is 50 characters."),
  check("to")
    .exists()
    .withMessage("This field is required")
    .notEmpty()
    .withMessage("This field cannot be blank")
    .isLength({ max: 50 })
    .withMessage("The maximum length is 50 characters."),
  (req, res, next) => validationResults(req, res, next),
];

const validatorGetPlaylistById = [
  check("id")
    .exists()
    .withMessage("This field is required")
    .isUUID("4")
    .withMessage("Incorrect format parameter id"),
  (req, res, next) => validationResults(req, res, next),
];

const validatorDeletePlaylistById = [
  check("id")
    .exists()
    .withMessage("This field is required")
    .isUUID("4")
    .withMessage("Incorrect format parameter id"),
  (req, res, next) => validationResults(req, res, next),
];

module.exports = {
  validatorCreatePlaylist,
  validatorGetPlaylistById,
  validatorDeletePlaylistById,
};