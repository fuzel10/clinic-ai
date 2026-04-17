const { exec } = require("child_process");

function runTasks() {
  console.log("Running scraper...");

  exec("node scraper.js", () => {
    console.log("Scraping done");

    exec("node ai.js", () => {
      console.log("AI done");
    });
  });
}

runTasks();

// every 6 hours
setInterval(runTasks, 6 * 60 * 60 * 1000);