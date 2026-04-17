const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://ideas.gohighlevel.com/changelog", {
    waitUntil: "networkidle",
  });

  // Scroll to load old data
  for (let i = 0; i < 20; i++) {
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    await page.waitForTimeout(2000);
  }

  const data = await page.evaluate(() => {
    const items = [];

    document.querySelectorAll("div").forEach((el) => {
      const text = el.innerText;
      const img = el.querySelector("img")?.src || null;

      if (text && text.length > 50) {
        items.push({
          text: text.slice(0, 300),
          image: img,
        });
      }
    });

    return items.slice(0, 50);
  });

  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
})();