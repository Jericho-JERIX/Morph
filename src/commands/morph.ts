import { GuildSettings } from "@prisma/client";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { MorphServerSettingsMessage } from "../templates/messages/MorphServerSettingsMessage";
import { allowCollectServerData, createGuildSettings, disallowCollectServerData, getGuildSettings, updateRolesRecovery, updateUserBindingGroup } from "../service/GuildSettings.service";
import { uploadGuildMemberRoles } from "../actions/UploadGuildMembersRoles";
import { deleteGuildMemberRoles } from "../service/MemberRole.service";
import { GuildMember } from "discord.js";

export const Morph: SlashCommand = {
    name: "morph",
    description: "Open Morph settings for this server",
    options: [],

    async onCommandExecuted(interaction) {

        if (!interaction.guildId) return

        let guildSettings = await getGuildSettings(interaction.guildId)
        if (!guildSettings) {
            guildSettings = await createGuildSettings(interaction.guildId)
        }

        // const guildSettings: GuildSettings = {
        //     id: 1,
        //     guildId: interaction.guildId,
        //     allowedCollectData: false,
        //     lastDataCollectedDate: new Date(),
        //     enabledRolesRecovery: true,
        //     enabledUserBindingGroup: false,
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        // }

        await interaction.reply(MorphServerSettingsMessage(guildSettings))
    },

    async onButtonPressed(interaction) {

        const guild = interaction.guild
        const guildId = interaction.guildId
        const member = interaction.member

        if (!guildId || !guild || !member) return

        if (!(member as GuildMember).permissions.has("ManageRoles")) return

        switch (interaction.customId) {
            case "allow-collect-data":
            case "re-upload-server-data":
                await allowCollectServerData(guildId)
                uploadGuildMemberRoles(guild)
                break

            case "disallow-collect-data":
                await deleteGuildMemberRoles(guildId)
                await disallowCollectServerData(guildId)
                break

            case "enable-roles-recovery":
                await updateRolesRecovery(guildId, true)
                break

            case "disable-roles-recovery":
                await updateRolesRecovery(guildId, false)
                break

            case "enable-user-binding-group":
                await updateUserBindingGroup(guildId, true)
                break

            case "disable-user-binding-group":
                await updateUserBindingGroup(guildId, false)
                break
                
        }

        const guildSettings = await getGuildSettings(guildId)
        if (!guildSettings) return

        await interaction.update(MorphServerSettingsMessage(guildSettings))
    },
}