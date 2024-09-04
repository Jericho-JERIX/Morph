import { GuildMember, PartialGuildMember } from "discord.js";
import { createOrUpdateMemberRoles } from "../service/MemberRole.service";
import { getUserBindingParent, getUsersBindingGroup } from "../service/UserBinding.service";
import { store } from "../stores/SyncRoleAsParent.store";
import { getGuildSettings } from "../service/GuildSettings.service";

export async function syncRoleAsParent(memberBefore: GuildMember | PartialGuildMember, memberAfter: GuildMember) {
    
    const memberBeforeRoles = memberBefore.roles.cache.map((role) => role.id)

    const guildId = memberAfter.guild.id
    const memberId = memberAfter.id
    const memberRoles = memberAfter.roles.cache.map((role) => role.id)
    const usersBindingGroup = await getUsersBindingGroup(memberId)
    const parent = await getUserBindingParent(memberId)

    const guildSettings = await getGuildSettings(guildId)
    if (!guildSettings || !guildSettings.allowedCollectData || !guildSettings.enabledUserBindingGroup) return

    if (!parent) return
    
    if (store.isRedundantTask(guildId, memberId, parent.userId)) {
        store.removeRedundantTask(guildId, memberId, parent.userId)
        return
    }

    if (memberBeforeRoles.length != memberRoles.length) {

        const otherUserBindingGroup = usersBindingGroup.filter((user) => user.userId !== memberId)

        for (const user of otherUserBindingGroup) {
            store.addRedundantTask(guildId, user.userId, parent.userId)
        }

        for (const user of otherUserBindingGroup) {
            
            const member = await memberAfter.guild.members.fetch(user.userId)
            if (!member) continue

            await member.roles.set(memberRoles)

        }
    }
}