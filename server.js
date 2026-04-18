const express = require("express");
const fs = require("fs");

const app = express();

app.get("/api/features", (req, res) => {
  try {
    if (!fs.existsSync("final.json")) {
      return res.json({
        status: "processing",
        message: "Data is being generated, try again in 1-2 minutes"
      });
    }

    const data = JSON.parse(fs.readFileSync("final.json"));
    res.json(data);

  } catch (error) {
    res.json({
      status: "error",
      message: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(3000, () => console.log("Server running"));
