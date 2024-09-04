import { GuildMember, PartialGuildMember } from "discord.js";
import { createOrUpdateMemberRoles } from "../service/MemberRole.service";
import { getUserBindingParent, getUsersBindingGroup } from "../service/UserBinding.service";
import { getGuildSettings } from "../service/GuildSettings.service";

export async function recordMemberRoles(memberBefore: GuildMember | PartialGuildMember, memberAfter: GuildMember) {
    const memberBeforeRoles = memberBefore.roles.cache.map((role) => role.id)
    
    const guildId = memberAfter.guild.id
    const memberId = memberAfter.id
    const memberRoles = memberAfter.roles.cache.map((role) => role.id)

    const guildSettings = await getGuildSettings(guildId)
    if (!guildSettings || !guildSettings.allowedCollectData) return

    if (memberBeforeRoles.length != memberRoles.length) {
        await createOrUpdateMemberRoles(guildId, memberId, memberRoles)
    }
}