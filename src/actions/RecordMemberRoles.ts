import { GuildMember, PartialGuildMember } from "discord.js";
import { createOrUpdateMemberRoles } from "../service/MemberRole.service";

export async function recordMemberRoles(memberBefore: GuildMember | PartialGuildMember, memberAfter: GuildMember) {
    const memberBeforeRoles = memberBefore.roles.cache.map((role) => role.id)
    
    const guildId = memberAfter.guild.id
    const memberId = memberAfter.id
    const memberRoles = memberAfter.roles.cache.map((role) => role.id)

    if (memberBeforeRoles.length != memberRoles.length) {
        await createOrUpdateMemberRoles(guildId, memberId, memberRoles)
    }
}