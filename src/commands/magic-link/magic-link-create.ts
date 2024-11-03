import { SlashCommandSubcommandBuilder } from "discord.js";
import { SlashCommandSubcommand } from "../../scripts/types/SlashCommand";
import {
	createMagicLink,
	getMagicLinkByCode,
} from "../../service/MagicLink.service";
import { MagicLinkListEmbed } from "../../templates/components/Embeds/MagicLinkListEmbed";

export const MagicLinkCreateSubcommand: SlashCommandSubcommand = {
	slashCommandBuilder: new SlashCommandSubcommandBuilder()
		.setName("create")
		.setDescription("Create a magic links")
		.addStringOption((option) =>
			option
				.setName("invitation-link")
				.setDescription(
					"Paste this Discord server's invitation link here"
				)
				.setRequired(true)
		)
		.addRoleOption((option) =>
			option
				.setName("role")
				.setDescription(
					"The role to give to the user when they join with this link"
				)
				.setRequired(true)
		),

	async onCommandExecuted(interaction) {
		const invitationLink = interaction.options.getString("invitation-link");
		const role = interaction.options.getRole("role");

		if (!interaction.guildId || !invitationLink || !role) {
			interaction.reply({
				content: "Invalid command usage",
				ephemeral: true,
			});
			return;
		}

		let link;
		let code;

		if (invitationLink.includes("discord.gg")) {
			link = invitationLink;
			code = invitationLink.split("/").pop();
		} else {
			link = `https://discord.gg/${invitationLink}`;
			code = invitationLink;
		}

		if (!code) {
			interaction.reply({
				content: "Invalid invitation link",
				ephemeral: true,
			});
			return;
		}

		try {
			const magicLink = await createMagicLink({
				guildId: interaction.guildId,
				userId: interaction.user.id,
				code: code,
				invitationLink: link,
				roleId: role.id,
			});

			interaction.reply({
				embeds: [
					MagicLinkListEmbed({
						title: "Magic Link Created",
						description: `The magic link has been created successfully.`,
						magicLinkList: [magicLink],
					}),
				],
			});
		} catch (error) {
			const magicLink = await getMagicLinkByCode(code);

			if (!magicLink) {
				interaction.reply({
					content: "An error occurred while creating the magic link",
					ephemeral: true,
				});
				return;
			}

			interaction.reply({
				embeds: [
					MagicLinkListEmbed({
						title: "This invitation link is already in use",
						description: `This invitation link (\`${magicLink.code}\`) is already in use as the Magic Link.`,
						magicLinkList: [magicLink],
					}),
				],
				ephemeral: true,
			});
		}
	},
};
