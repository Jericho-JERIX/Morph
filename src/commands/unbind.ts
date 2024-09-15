import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { getUsersBindingGroup } from "../service/UserBinding.service";

export const Unbind: SlashCommand = {
	name: "unbind",
	description: "Shows the user binding group of the user.",
	options: [
        {
            name: "user",
            description: "The user to unbind",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        }
    ],

	async onCommandExecuted(interaction) {
        await interaction.reply({
            content: "Done",
            ephemeral: true
        })
	},
    
    async onAutoCompleteInputed(interaction) {
        const bindingGroup = await getUsersBindingGroup(interaction.user.id);
        const query = interaction.options.getFocused();
        
        const choices = bindingGroup.map((account) => {
            const discordAccount = interaction.client.users.cache.get(account.userId)
            console.log(discordAccount)
            return {
                name: discordAccount ? discordAccount.username : `@${account.userId}`,
                value: account.userId
            }
        }).filter((account) => query === '' || account.name.toLowerCase().includes(query.toLowerCase()))
        await interaction.respond(choices)
    }
};
