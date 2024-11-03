import { SlashCommandSubcommandBuilder } from "discord.js";
import { SlashCommandSubcommand } from "../../scripts/types/SlashCommand";
import {
	createMagicLink,
	deleteMagicLinkByCode,
	getMagicLinkByCode,
	getMagicLinkListByCodeList,
} from "../../service/MagicLink.service";
import { MagicLinkListEmbed } from "../../templates/components/Embeds/MagicLinkListEmbed";

export const MagicLinkDeleteSubcommand: SlashCommandSubcommand = {
	slashCommandBuilder: new SlashCommandSubcommandBuilder()
		.setName("delete")
		.setDescription("Delete a magic links")
		.addStringOption((option) =>
			option
				.setName("code")
				.setDescription("Select the code of the magic link to delete")
				.setAutocomplete(true)
				.setRequired(true)
		),

	async onCommandExecuted(interaction) {
		const code = interaction.options.getString("code");

		if (!interaction.guild || !code) {
			interaction.reply({
				content: "Invalid command usage",
				ephemeral: true,
			});
			return;
		}

		await deleteMagicLinkByCode(code);

		const currentInvitationLinkList =
			await interaction.guild.invites.fetch();
		const currentCodeList = currentInvitationLinkList.map(
			(invite) => invite.code
		);

		const magicLinkList = await getMagicLinkListByCodeList(currentCodeList);

		interaction.reply({
			embeds: [
				MagicLinkListEmbed({
					title: "Magic Link Deleted",
					description:
						`The Magic Link (\`${code}\`) has been deleted successfully.`,
					magicLinkList: magicLinkList,
				}),
			],
		});
	},

	async onAutoCompleteInputed(interaction) {
		if (!interaction.guild) {
			interaction.respond([]);
			return;
		}

		const search = interaction.options.getFocused().toLowerCase();

		const currentInvitationLinkList =
			await interaction.guild.invites.fetch();
		const currentCodeList = currentInvitationLinkList
			.map((invite) => invite.code)
			.filter((code) => code.toLowerCase().includes(search) || !search);

		const magicLinkList = await getMagicLinkListByCodeList(currentCodeList);
		const choices = magicLinkList.map((magicLink) => ({
			name: magicLink.code,
			value: magicLink.code,
		}));

		interaction.respond(choices);
	},
};
