import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { getUsersBindingGroup, removeUserFromUserBindingGroup } from "../service/UserBinding.service";
import { ManageUserBindingGroupMemberMessage } from "../templates/messages/ManageUserBindingGroupMemberMessage";

export const Unbind: SlashCommand = {
	name: "unbind",
	description: "Shows the user binding group of the user.",
	options: [
        {
            name: "user-id",
            description: "Target user ID you wished to unbind.",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

	async onCommandExecuted(interaction) {

        const userId = interaction.options.getString("user-id");

        if (!userId) return

        await removeUserFromUserBindingGroup(userId);

        const message = await ManageUserBindingGroupMemberMessage({ userId: interaction.user.id });
        await interaction.reply(message)
	},
    
};
