import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { bindUserToTargetUser } from "../actions/BindUserToTargetUser";

export const Bind: SlashCommand = {
    name: "bind",
    description: "Bind user to another user",
    options: [
        {
            name: "user",
            description: "The user to bind to",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],

    async onCommandExecuted(interaction) {
        const user = interaction.options.getUser("user")
        
        if (!user || !interaction.member) return
        
        const userId = interaction.member.user.id
        const targetUserId = user.id

        await bindUserToTargetUser(userId, targetUserId)
        
        await interaction.reply({
            content: `Successfully binded <@${userId}> to <@${targetUserId}>`,
            ephemeral: true
        })
    },
}