import express from "express";

import cors from "cors";

import deepl from "deepl-node";

const app = express();
app.use(cors());
app.use(express.json());

const authKey = process.env.VITE_DEEPL_API_KEY;
const translator = new deepl.Translator(authKey);

app.get("/", (req, res) => {
    res.send("POST to /translate to translate text");
});

app.post("/translate", async (req, res) => {
    const body = req.body;
    try {
        const result = await translator.translateText(body.text, body.source_lang || null, body.target_lang);
        res.send({
            result: result.text
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Express is running on http://localhost:3000");
});