import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const AllowCollectionDataButton = new ButtonBuilder()
    .setCustomId("allow-collect-data")
    .setLabel("Allow Morph to Collect Server Data")
    .setStyle(ButtonStyle.Success)

const DisallowCollectionDataButton = new ButtonBuilder()
    .setCustomId("disallow-collect-data")
    .setLabel("Disallow Morph to Collect Server Data")
    .setStyle(ButtonStyle.Danger)

const ReUploadServerDataButton = new ButtonBuilder()
    .setCustomId("re-upload-server-data")
    .setLabel("Re-Upload Server Data")
    .setStyle(ButtonStyle.Secondary)

export function AllowCollectionDataButtonRow({
    enabled=false
}:{
    enabled?: boolean
}): ActionRowBuilder<any> {
    return new ActionRowBuilder().addComponents(
        !enabled ?
            [AllowCollectionDataButton] :
            [DisallowCollectionDataButton, ReUploadServerDataButton]
    )
}