import { SlashCommand } from "../scripts/types/SlashCommand";
import { getUsersBindingGroup } from "../service/UserBinding.service";

export const UserBindingGroup: SlashCommand = {
	name: "user-binding-group",
	description: "Shows the user binding group of the user.",
	options: [],

	async onCommandExecuted(interaction) {
		const bindingGroup = await getUsersBindingGroup(interaction.user.id);
        const message = bindingGroup.map((account) => `<@${account.userId}>`)
        await interaction.reply({
            content: message.join(" "),
            ephemeral: true
        })
	},
};
