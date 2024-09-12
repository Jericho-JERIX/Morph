import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { bindUserToTargetUser } from "../service/UserBinding.service";
import { createUserBindingGroupRequest } from "../service/UserBindingGroupRequest.service";
import { UserBindingRequestMessage } from "../templates/messages/UserBindingRequestMessage";

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

        // await bindUserToTargetUser(userId, targetUserId)
        const userBindingGroupRequest = await createUserBindingGroupRequest(userId, targetUserId)

        const targetUser = await interaction.client.users.fetch(targetUserId)

        const requestMessage = await targetUser.send(UserBindingRequestMessage({
            userBindingGroupRequest, guildMember: interaction.member as GuildMember
        }))
        
        await interaction.reply({
            content: `Send request from <@${userId}> to <@${targetUserId}>`,
            ephemeral: true
        })
    },
    
}