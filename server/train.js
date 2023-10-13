const fs = require('fs');
const fetch = require('node-fetch');
const { OpenAIApi, toFile } = require('openai');
require("dotenv").config();

const OpenAi = require('openai');

const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY
});
  

async function upload(){
    // If you have access to Node fs we recommend using fs.createReadStream():
    await openai.files.create({ file: fs.createReadStream('learnific-app/server/hubbermanTrain.jsonl'), purpose: 'fine-tune' });

    console.log(file);
};

upload();

