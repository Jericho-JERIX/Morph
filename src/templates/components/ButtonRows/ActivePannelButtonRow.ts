import { GuildSettings } from "@prisma/client";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const EnableRoleRecoveryButton = new ButtonBuilder()
    .setCustomId("enable-roles-recovery")
    .setLabel("Enable Roles Recovery")
    .setStyle(ButtonStyle.Success)

const DisableRoleRecoveryButton = new ButtonBuilder()
    .setCustomId("disable-roles-recovery")
    .setLabel("Disable Roles Recovery")
    .setStyle(ButtonStyle.Danger)

const EnableUserBindingGroup = new ButtonBuilder()
    .setCustomId("enable-user-binding-group")
    .setLabel("Enable User Binding Group")
    .setStyle(ButtonStyle.Success)

const DisableUserBindingGroup = new ButtonBuilder()
    .setCustomId("disable-user-binding-group")
    .setLabel("Disable User Binding Group")
    .setStyle(ButtonStyle.Danger)

export function ActivePanelButtonRow({
    guildSettings
}: {
    guildSettings: GuildSettings
}) : ActionRowBuilder<any> {
    return new ActionRowBuilder().addComponents([
        guildSettings.enabledRolesRecovery ? DisableRoleRecoveryButton : EnableRoleRecoveryButton,
        guildSettings.enabledUserBindingGroup ? DisableUserBindingGroup : EnableUserBindingGroup
    ])
}