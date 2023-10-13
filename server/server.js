const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");
app.use(cors());
app.use(express.json());
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const axios = require('axios');
const cheerio = require('cheerio');
const natural = require('natural');

const summarize = async (prompt, content) => {
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(config);
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "How are you today?"
        });
        console.log(completion.data.choices[0].text);
        return completion.data.choices[0].text;
    } catch (error) {
        console.log(error.message);
    }
}

const fetchData = async (prompt, type) => {
    const apiBase = 'http://searx.varoonkodithala.com';
    try {
        const response = await axios.get(`${apiBase}/search`, {
            params: {
                q: prompt,
                engines: type,
            }
        })
        const searchResults = response.data;
        const $ = cheerio.load(searchResults);
        const urls = $('article > a');
        const urlsArr = [];
        for (let i=0; i < 1; i++) {
            urlsArr.push(urls[i].attribs.href);
        }
        const contentArr = {};
        for (let i=0; i < urlsArr.length; i++) {
            try {
                const rawContent = await axios.get(urlsArr[i]);
                const parsedContent = cheerio.load(rawContent.data);
                if (parsedContent('title').text() && parsedContent('p').text()) {
                    const titleText = parsedContent('title').text();
                    let pText = parsedContent('p').text().replace(/\t/g, ' ').replace(/\n/g, ' ');
                    contentArr[titleText] = summarize(prompt, pText);
                }
            } catch (error) {
                continue;
            }
        }
        return contentArr;
    } catch (error) {
        return error.message;
    }
}

app.post('/api/home', async (req, res) => {
    console.log("Received POST request");
    res.setHeader('Content-Type', 'application/json');
    const result = await fetchData(req.body.prompt, req.body.type);
    console.log(result);
    res.send({ "content": result });
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});