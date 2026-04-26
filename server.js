const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();

// 🔥 Run scraper in background
function runTasks() {
  console.log("Running scraper...");

  exec("node scraper.js", () => {
    console.log("Scraping done");

    exec("node ai.js", () => {
      console.log("AI done");
    });
  });
}

// run once on start
runTasks();

// run every 6 hours
setInterval(runTasks, 6 * 60 * 60 * 1000);

// API
app.get("/api/features", (req, res) => {
  try {
    if (!fs.existsSync("final.json")) {
      return res.json({
        status: "processing",
      });
    }

    const data = JSON.parse(fs.readFileSync("final.json"));
    res.json(data);

  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
