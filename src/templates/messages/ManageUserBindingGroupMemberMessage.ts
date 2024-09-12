import { UserBindingGroup } from "@prisma/client";
import { GuildMember } from "discord.js";
import { UserBindingCardEmbed } from "../components/Embeds/UserBindingCardEmbed";
import { UserBindingManageButtonRow } from "../components/ButtonRows/UserBindingManageButtonRow";

export function ManageUserBindingGroupMemberMessage({
    guildMember,
    userBindingGroup,
}: {
    guildMember: GuildMember;
    userBindingGroup: UserBindingGroup;
}) {
    return {
        embeds: [
            UserBindingCardEmbed({ guildMember, userBindingGroup })
        ],
        components: [
            UserBindingManageButtonRow()
        ]
    }
}