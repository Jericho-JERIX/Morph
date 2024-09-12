import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const RemoveUserBindingButton = new ButtonBuilder()
    .setCustomId("remove-user-binding")
    .setLabel("Remove")
    .setStyle(ButtonStyle.Danger)

export function UserBindingManageButtonRow(): ActionRowBuilder<any> {
    return new ActionRowBuilder().addComponents(
        [RemoveUserBindingButton]
    )
}