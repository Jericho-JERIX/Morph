import { GuildMember } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { getUsersBindingGroup } from "../service/UserBinding.service";
import { ManageUserBindingGroupMemberMessage } from "../templates/messages/ManageUserBindingGroupMemberMessage";
import { getUserBindingGroupRequests } from "../service/UserBindingGroupRequest.service";

export const UserBindingGroup: SlashCommand = {
	name: "user-binding-group",
	description: "Shows the user binding group of the user.",
	options: [],

	async onCommandExecuted(interaction) {

		const userId = interaction.user.id;
        const message = await ManageUserBindingGroupMemberMessage({ userId });

        await interaction.reply(message)
	},
};
