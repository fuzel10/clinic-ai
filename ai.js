const fs = require("fs");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  const raw = JSON.parse(fs.readFileSync("data.json"));

  const results = [];

  for (let item of raw) {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Convert this into clinic use case:\n${item.text}`,
        },
      ],
    });

    results.push({
      original: item.text,
      clinic: res.choices[0].message.content,
      image: item.image,
    });
  }

  fs.writeFileSync("final.json", JSON.stringify(results, null, 2));
})();