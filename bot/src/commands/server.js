import { SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Prover informações sobre o servidor'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`Este servidor é ${interaction.guild.name} e tem membros ${interaction.guild.memberCount}.`);
	},
};