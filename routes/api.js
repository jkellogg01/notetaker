const express = require("express");

const api = express();

const notes = require("./notes");

api.use("/notes", notes);

module.exports = api;
