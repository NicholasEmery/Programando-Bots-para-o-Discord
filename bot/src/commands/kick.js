import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js"

export default {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("Selecione um membro para ser chutado.")
		.addUserOption(option =>
			option
				.setName("username")
				.setDescription("membro a ser chutado")
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName("motivo")
				.setDescription("O motivo por ser chutado"))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.setDMPermission(false),
        async execute(interaction) {
		const username = interaction.options.getUser("username");
		const motivo = interaction.options.getString("motivo") ?? 'Nenhum motivo foi fornecido';

		await interaction.reply(`Usuário ${username.username} foi chutado pelo o motivo: ${motivo}`);
		await interaction.guild.members.kick(username, { reason: motivo });
		username.send(`Você foi chutado do servidor ${interaction.guild.name} pelo o seguinte motivo: "${motivo}"`)
	},
};