import { Guild } from "discord.js";
import { CreateMemberRole } from "../types/MemberRole.type";
import { bulkCreateMemberRoles, bulkCreateOrUpdateMemberRoles } from "../service/MemberRole.service";

export async function uploadGuildMemberRoles(guild: Guild) {

    const payload: CreateMemberRole[] = []
    const members = await guild.members.fetch()

    for (const member of members.values()) {
        const memberRoles = member.roles.cache.map((role) => role.id)
        payload.push({
            guildId: guild.id,
            userId: member.id,
            roleIds: memberRoles
        })
    }

    return bulkCreateOrUpdateMemberRoles(payload)

}