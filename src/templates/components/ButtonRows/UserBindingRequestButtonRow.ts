import { UserBindingGroupRequest } from "@prisma/client";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const AcceptButton = (userBindingGroupRequest: UserBindingGroupRequest) => new ButtonBuilder()
    .setCustomId(`accept-user-binding/${userBindingGroupRequest.id}`)
    .setLabel("Accept")
    .setStyle(ButtonStyle.Success)

const RejectButton = (userBindingGroupRequest: UserBindingGroupRequest) => new ButtonBuilder()
    .setCustomId(`reject-user-binding/${userBindingGroupRequest.id}`)
    .setLabel("Reject")
    .setStyle(ButtonStyle.Danger)

export function UserBindingManageButtonRow({
    userBindingGroupRequest
}: {
    userBindingGroupRequest: UserBindingGroupRequest
}): ActionRowBuilder<any> {
    return new ActionRowBuilder().addComponents(
        [AcceptButton(userBindingGroupRequest), RejectButton(userBindingGroupRequest)]
    )
}