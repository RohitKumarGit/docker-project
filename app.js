const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const predict = async function (text) {
  try {
    return await openai.createCompletion("text-davinci-002", {
      prompt: "Correct this to standard English:\n\n" + text,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
  } catch (error) {
    console.log(error);
  }
};
app.use(express.static(path.join(__dirname, "public")));
app.get("/predict", async (req, res) => {
  console.log(req.query);
  try {
    const pred = await predict(req.query.text);
    res.send({
      pred: pred.data.choices,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: true });
  }
});
app.listen(3001, (err) => {
  if (!err) {
    console.log("listening");
  }
});
const test = async () => {
  console.log(await predict("who you go to where "));
};
