import { SlashCommand } from "../scripts/types/SlashCommand";
import { getMagicLinkListByCodeList } from "../service/MagicLink.service";
import { GuildMagicLinkListEmbed } from "../templates/components/Embeds/GuildMagicLinkListEmbed";

export const MagicLink: SlashCommand = {
	name: "magic-link",
	description: "View a magic links",
	options: [],

	async onCommandExecuted(interaction) {
		if (!interaction.guild) {
			interaction.reply({
				content: "Invalid command usage",
				ephemeral: true,
			});
			return;
		}

		const currentInvitationLinkList =
			await interaction.guild.invites.fetch();
		const currentCodeList = currentInvitationLinkList.map(
			(invite) => invite.code
		);

		const magicLinkList = await getMagicLinkListByCodeList(currentCodeList);

		await interaction.reply({
			content: "Magic link created!",
			embeds: [GuildMagicLinkListEmbed({ magicLinkList })],
		});
	},
};
