const { execSync } = require("child_process");

execSync("npx playwright install --with-deps", { stdio: "inherit" });
