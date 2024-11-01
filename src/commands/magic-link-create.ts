import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { bindUserToTargetUser } from "../service/UserBinding.service";
import { createUserBindingGroupRequest } from "../service/UserBindingGroupRequest.service";
import { UserBindingRequestMessage } from "../templates/messages/UserBindingRequestMessage";
import { createMagicLink } from "../service/MagicLink.service";

export const MagicLinkCreate: SlashCommand = {
    name: "magic-link-create",
    description: "Create a magic link",
    options: [
        {
            name: "invitation-link",
            description: "Paste this Discord server's invitation link here",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "role",
            description: "The role to give to the user when they join with this link",
            type: ApplicationCommandOptionType.Role,
            required: true,
        },
    ],

    async onCommandExecuted(interaction) {
        const invitationLink = interaction.options.getString("invitation-link")
        const role = interaction.options.getRole("role")

        if (!interaction.guildId || !invitationLink || !role) {
            interaction.reply({
                content: "Invalid command usage",
                ephemeral: true
            })
            return;
        }

        await createMagicLink({
            guildId: interaction.guildId,
            userId: interaction.user.id,
            code: invitationLink.slice(19),
            invitationLink: invitationLink,
            roleId: role.id
        })

        await interaction.reply({
            content: "Magic link created!",
        })
    },
    
}