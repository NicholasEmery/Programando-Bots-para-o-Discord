import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js"

export default {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Selecione um membro para ser banido.")
		.addUserOption(option =>
			option
				.setName("username")
				.setDescription("membro a ser banido")
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName("motivo")
				.setDescription("O motivo por ser banido"))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
        async execute(interaction) {
		const username = interaction.options.getUser("username");
		const motivo = interaction.options.getString("motivo") ?? 'Nenhum motivo foi fornecido';

		await interaction.reply(`Usuário ${username.username} foi banido pelo o motivo: ${motivo}`);
		await interaction.guild.members.ban(username, { reason: motivo });
	},
};