require('dotenv').config();

const {REST, Routes} = require('discord.js');

const commands = [
  {
    name: "hey",
    description: "Comando Comedia",
  },
  {
    name: "ping",
    description: "Retorna o Ping do Bot",
  },
];

const rest = new REST({version: "10"}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registrando Comandos");
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        );
        console.log("Comandos Registrados!");
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();