import dotenv from "dotenv";
import { Client, REST, Routes, Events, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from 'url';
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

client.on("ready", async () => {
  console.log(`Logado na conta ${client.user.tag}!`);
});

client.login(token)

// Carregar comandos do Bot
const commands = [];
const commandsDirectory = path.join(__dirname, "./commands");

const commandFiles = fs.readdirSync(commandsDirectory).filter(file => file.endsWith('.js'));

await Promise.all(commandFiles.map(async file => {
  const filePath = path.join(commandsDirectory, file);
  const moduleURL = pathToFileURL(filePath);
  const { default: command } = await import(moduleURL);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  } else {
    console.log(`[ATENÇÃO] O comando em ${filePath} está faltando uma propriedade "data" ou "execute" necessária.`);
  }
}));

const rest = new REST().setToken(token);

// Registrando comandos
(async () => {
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
})();

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`Nenhum comando correspondente a ${interaction.commandName} foi encontrado.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
		}
	}
});