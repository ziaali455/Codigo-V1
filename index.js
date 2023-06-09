require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');
const { App } = require('@slack/bolt');
const signingSecret = process.env['SLACK_SIGNING_SECRET']
const botToken = process.env['SLACK_BOT_TOKEN']
const gptKey = process.env['OPEN_API_KEY']
const app = new App({
    signingSecret: signingSecret,
    token: botToken,
});


const config = new Configuration({
  apiKey: process.env['API_KEY'],
});

const openai = new OpenAIApi(config);

const runPrompt = async (testCode, prompt) => {
  const combinedPrompt = prompt.concat(" ", testCode);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: combinedPrompt,
    max_tokens: 2048,
    temperature: 0.1,
  });
  
  return response.data.choices[0].text;
};

//runPrompt(testCode); 

//gpt method
//https://github.com/Brady-Agranoff/chatgpt-example/blob/main/index.js
//Slack Method
(async () => {
    await app.start(process.env.PORT || 12000);
 
   app.command('/summarize', async ({ command, ack, respond }) => {
    // Acknowledge command request
    await ack();
    result = await runPrompt(command.text, "Summarize the following code.");
    await respond(`${result}`);
  });
  
    app.command('/summarizespanish', async ({ command, ack, respond }) => {

      // Acknowledge command request
      await ack();
      result = await runPrompt(command.text,"Summarize the following code in Spanish");
      await respond(`${result}`);
    });
  app.command('/summarizefrench', async ({ command, ack, respond }) => {

      // Acknowledge command request
      await ack();
      result = await runPrompt(command.text,"Summarize the following code in French");
      await respond(`${result}`);
    });
  
  app.command('/summarizeport', async ({ command, ack, respond }) => {

      // Acknowledge command request
      await ack();
      result = await runPrompt(command.text,"Summarize the following code in Portuguese");
      await respond(`${result}`);
    });
    console.log(`⚡️ Bolt app is running!`);
})();