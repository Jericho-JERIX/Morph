import { MagicLink } from "@prisma/client";
import { EmbedBuilder } from "discord.js";
import { PrimaryColor } from "../../../constants/Color.constant";

export function MagicLinkListEmbed({
	title,
	description,
	magicLinkList = [],
}: {
	title: string;
	description: string;
	magicLinkList: MagicLink[];
}) {
	const invitationLinkColumn = magicLinkList.map(
		(magicLink) => magicLink.invitationLink
	);
	const codeColumn = magicLinkList.map(
		(magicLink) => `\`${magicLink.code}\``
	);
	const roleColumn = magicLinkList.map(
		(magicLink) => `<@&${magicLink.roleId}>`
	);

	return new EmbedBuilder()
		.setTitle(title)
		.setDescription(description)
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
