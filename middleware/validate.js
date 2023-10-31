const express = require("express");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { User, complexityOptions } = require("../models/users");

// validate request body is valid
function validateUser(user) {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    password: passwordComplexity(complexityOptions).required(),
    email: Joi.string().min(5).max(255).required().email(),
  });
  return schema.validate(user);
}

module.exports = { validateUser };
