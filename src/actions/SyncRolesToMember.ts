import { GuildMember } from "discord.js";
import { getMemberRoles } from "../service/MemberRole.service";

export async function syncRolesToMember(member: GuildMember) {
    
    const memberId = member.id
    const guildId = member.guild.id
    const memberRoles = await getMemberRoles(guildId, memberId)

    if (memberRoles) {
        const roles = memberRoles.roleIds.split(",")
        console.log("Sync roles", roles)
        await member.roles.set(roles)
    }
    
}