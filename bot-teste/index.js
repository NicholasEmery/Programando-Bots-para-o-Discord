// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
// const { token } = require("./config.json");

// dotenv
const dotenv = require("dotenv");
dotenv.config();
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


const fs = require("node:fs");
const path = require("node:path");
const commandPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));
//console.log(commandFiles);

client.commands = new Collection();

for (const file of commandFiles) {
  const filePath = path.join(commandPath, file);
  const commands = require(filePath);
  if ("data" in commands && "execute" in commands) {
    client.commands.set(commands.data.name, commands);
  } else {
    console.log(`Esse comando em $(filePath) está com "data" ou "execute" ausentes`);
  }
}



// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Pronto! Login realizado como ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);


client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
});