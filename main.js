const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.openai_key, // your OPENAI key
});
const openai = new OpenAIApi(configuration);

const app = express();

// generate
app.get('/', async (req, res) => {
  const { prompt } = req.query;
  if (!prompt) return res.json({ error: "prompt missing." });
  const response = await openai.createImage({
    prompt: `${decodeURIComponent(prompt)}`,
    n: 1,
    size: "1024x1024",
    response_format: "url" // or b64_json for base64 json format
  });
  res.json({ url: `${response.data.data[0].url}` }); // or .b64_json if you've mentioned b64_json as response format
});

app.listen(3000, () => {
  console.log('server started');
});
