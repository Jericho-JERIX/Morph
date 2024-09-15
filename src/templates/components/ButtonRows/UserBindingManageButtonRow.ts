import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const MobileViewButton = new ButtonBuilder()
    .setCustomId("mobile-view-button")
    .setLabel("Mobile View")
    .setStyle(ButtonStyle.Danger)

export function UserBindingManageButtonRow(): ActionRowBuilder<any> {
    return new ActionRowBuilder().addComponents(
        [MobileViewButton]
    )
}