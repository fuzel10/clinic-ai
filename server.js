const express = require("express");
const fs = require("fs");

const app = express();

app.get("/api/features", (req, res) => {
  const data = JSON.parse(fs.readFileSync("final.json"));
  res.json(data);
});

app.listen(3000, () => console.log("Server running"));