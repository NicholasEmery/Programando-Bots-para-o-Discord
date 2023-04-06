const { REST, Routes } = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const fs = require("node:fs");
const path = require("node:path");
const commandPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".js"));

const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commandFiles.push(command.data.toJSON());
};

// instancia REST
const rest = new REST({version: "10"}).setToken(TOKEN);

// deploy
(async () => {
    try {
        console.log(`Resetando ${commands.length} commands...`)

        // PUT
        const data = await rest.put(
                Routes.applicationGuildCommand(CLIENT_ID, GUILD_ID),
                {body: commands}
            )
            console.log("Comandos Registrados com Sucesso!");
    }
    catch (error) {
        console.error(error);
    }
});