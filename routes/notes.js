const notes = require("express").Router();
const { v4: uuid } = require("uuid");

const { readFile, writeFile } = require("fs/promises");

const path = "./db/db.json";

notes.get("/", async (req, res) => {
  const data = await readFile(path, "utf-8").catch((err) => {
    res.status(404).end();
    throw new Error(err);
  });
  res.status(200).json(JSON.parse(data));
});

notes.post("/", async (req, res) => {
  const data = await readFile(path, "utf-8").catch((err) => {
    res.status(404).send(`Failed to pull data from ${path} to append to!`);
    throw new Error(err);
  });
  const appendableData = JSON.parse(data);

  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuid(),
  };

  appendableData.push(newNote);
  writeFile(path, JSON.stringify(appendableData))
    .catch(() => {
      res.status(500).send(`Failed to write data to ${path}`);
    })
    .then(() => {
      res.status(200).json(appendableData);
    });
});

notes.delete("/:id", async (req, res) => {
  const data = await readFile(path, "utf-8").catch((err) => {
    res.status(404).send(`Failed to pull data from ${path} to append to!`);
    throw new Error(err);
  });

  const deleteID = req.params.id;
  const appendableData = JSON.parse(data).filter((value) => {
    console.log(value.id !== deleteID);
    return value.id !== deleteID;
  });

  writeFile(path, JSON.stringify(appendableData))
    .catch(() => {
      res.status(500).send(`Failed to write data to ${path}`);
    })
    .then(() => {
      res.status(200).json(appendableData);
    });
});

module.exports = notes;
