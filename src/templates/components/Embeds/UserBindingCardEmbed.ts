import { UserBindingGroup } from "@prisma/client";
import { EmbedBuilder, GuildMember } from "discord.js";

export function UserBindingCardEmbed({
    guildMember,
    userBindingGroup,
}: {
    guildMember: GuildMember;
    userBindingGroup: UserBindingGroup;
}) {

    const avatarURLResult = guildMember.user.avatarURL() || guildMember.user.defaultAvatarURL

    return new EmbedBuilder()
        .setAuthor({
            name: guildMember.user.username,
            iconURL: avatarURLResult,
        })
        .setDescription(`<@${userBindingGroup.userId}>`)
}