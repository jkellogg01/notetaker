const notes = require("express").Router();

const { readFile, writeFile } = require("fs/promises");

notes.get("/", (req, res) => {});

notes.post("/", (req, res) => {});

function fsAppend(filepath, content) {
  readFile(filepath, "utf-8").then((res) => {
    res.push(content);
    return writeFile(filepath, res);
  });
}

module.exports = notes;
