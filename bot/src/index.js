import dotenv from "dotenv";
import { Client, REST, Routes, GatewayIntentBits, Collection } from "discord.js"; // Import Collection from discord.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Carregar variáveis de ambiente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envDirectory = path.join(__dirname, './env');

fs.readdirSync(envDirectory).forEach(file => {
  dotenv.config({ path: path.join(envDirectory, file) });
});

// Importar configurações
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.BOT_TOKEN;

// Iniciar o bot
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildMembers]});

client.commands = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, './commands')).filter(file => file.endsWith('.js'));

// Função para registrar todos os comandos com o bot
async function registerCommands() {
  for (const file of commandFiles) {
      const command = await import(`./commands/${file}`);
      client.commands.set(command.default.data.name, command.default);
  }
}

const rest = new REST({ version: '10' }).setToken(token);

// Função para registrar os comandos no Discord
async function registerCommandsOnDiscord() {
  const commands = [];
  for (const command of client.commands.values()) {
    commands.push(command.data.toJSON());
  }

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
}

const startBot = async () => {
  try {
    await client.login(token);
    console.log("Bot iniciado com sucesso!");
    client.on("ready", () => {
        client.user.setActivity("Bot online", { type: 'LISTENING' }); 
    });
    await registerCommands(); // Primeiro registre os comandos localmente
    await registerCommandsOnDiscord(); // Depois registre os comandos no Discord
  } catch (error) {
    console.error(`Erro ao iniciar o bot: ${error.message}`);
  }
};
startBot();

export default startBot;
