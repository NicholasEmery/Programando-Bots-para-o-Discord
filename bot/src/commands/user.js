import { SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Prover informações sobre o usuário'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Esse comando foi executado por ${interaction.user.username}, que ingressou em ${interaction.member.joinedAt}.`);
	},
};