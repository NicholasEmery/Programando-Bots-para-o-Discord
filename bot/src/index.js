require('dotenv').config();
const {Client, IntentsBitField, User} = require("discord.js");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});


client.on('interactionCreate', (interaction2) => {
    if (interaction2.commandName === "hey") {
        interaction2.reply("Tu é Gay?🏳️‍🌈");
    }
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
        interaction.reply(`Ping is ${client.ws.ping}`);
    }
});

client.on('ready', (c) => {
    console.log(`O ${c.user.tag} está online.`);
});

client.login(process.env.TOKEN);