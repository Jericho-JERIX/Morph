import { GuildMember } from "discord.js";
import { UserBindingManageButtonRow } from "../components/ButtonRows/UserBindingRequestButtonRow";
import { UserBindingGroupRequest } from "@prisma/client";
import { UserBindingRequestEmbed } from "../components/Embeds/UserBindingRequestEmbed";

export function UserBindingRequestMessage({
    guildMember,
    userBindingGroupRequest
}: {
    guildMember: GuildMember,
    userBindingGroupRequest: UserBindingGroupRequest
}) {
    return {
        embeds: [
            UserBindingRequestEmbed({ user: guildMember.user }),
        ],
        components: [
            UserBindingManageButtonRow({ userBindingGroupRequest })
        ]
    }
}