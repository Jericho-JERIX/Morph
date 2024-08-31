import { uploadGuildMemberRoles } from "../actions/UploadGuildMembersRoles";
import { SlashCommand } from "../scripts/types/SlashCommand";

export const UploadGuildMembersRoles: SlashCommand = {
    name: "upload-guild-members-roles",
    description: "Upload guild members roles",
    options: [],

    async onCommandExecuted(interaction) {

        await interaction.deferReply()
        const guild = interaction.guild

        if (!guild) return

        const response = await uploadGuildMemberRoles(guild)
        const uploadedCount = response ? response.length : 0

        await interaction.editReply({
            content: `${uploadedCount} member roles uploaded`,
        })

    },
}