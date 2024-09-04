import { GuildMember } from "discord.js";
import { getMemberRoles } from "../service/MemberRole.service";
import { getGuildSettings } from "../service/GuildSettings.service";

export async function syncRolesToMember(member: GuildMember) {
    
    const memberId = member.id
    const guildId = member.guild.id

    const guildSettings = await getGuildSettings(guildId)
    if (!guildSettings || !guildSettings.enabledRolesRecovery) return

    const memberRoles = await getMemberRoles(guildId, memberId)

    if (memberRoles) {
        const roles = memberRoles.roleIds.split(",")
        await member.roles.set(roles)
    }
    
}