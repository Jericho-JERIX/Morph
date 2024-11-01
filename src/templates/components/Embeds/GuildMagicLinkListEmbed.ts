import { EmbedBuilder } from "discord.js";
import { PrimaryColor } from "../../../constants/Color.constant";
import { MagicLink } from "@prisma/client";

export function GuildMagicLinkListEmbed({
	magicLinkList = [],
}: {
	magicLinkList: MagicLink[];
}) {

    const invitationLinkColumn = magicLinkList.map(magicLink => magicLink.invitationLink)
    const codeColumn = magicLinkList.map(magicLink => `\`${magicLink.code}\``)
    const roleColumn = magicLinkList.map(magicLink => `<@&${magicLink.roleId}>`)

	return new EmbedBuilder()
		.setTitle("Magic Link List")
		.setColor(PrimaryColor)
		.addFields(
			{
				name: "Invitation Link",
				value: invitationLinkColumn.join("\n"),
				inline: true,
			},
			{
				name: "Code",
				value: codeColumn.join("\n"),
				inline: true,
			},
			{
				name: "Role",
				value: roleColumn.join("\n"),
				inline: true,
			}
		);
}
