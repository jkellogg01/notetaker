const express = require("express");
const path = require("path");

const api = require("./routes/api");
const db = require("./db/db.json");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", api);

app.get("/notes", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (_, res) => {
  res.status(200).sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
